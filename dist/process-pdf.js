"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const s3_helper_1 = __importDefault(require("./utils/s3-helper"));
const gm_1 = __importDefault(require("gm"));
const router = express_1.default.Router();
const savePath = "/root/proof-cloud/test/temp-files";
const gm1 = gm_1.default.subClass({ imageMagick: false });
router.get("/pdf", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = req.body.fileName;
    try {
        const s3Stream = yield s3_helper_1.default.getStream("proofjet.upload", "xyz.pdf");
        const files = [];
        console.log(s3Stream.length);
        gm1(s3Stream).identify("%p ", (error, data) => {
            console.log(data);
            const pages = data
                .replace(/^[\w\W]*?1/, "1")
                .split(" ")
                .map((pageNumber) => parseInt(pageNumber, 10));
            pages.map((pageNumber) => {
                const outputFileName = `${savePath}/xyz.pdf.${pageNumber + 1}.jpg`;
                console.log(outputFileName);
                // Create JPG from page 0 of the PDF
                gm1(s3Stream, `xyz.pdf[${pageNumber - 1}]`) // The name of your pdf
                    .setFormat("jpg")
                    .density(280, 280)
                    .quality(80) // Quality from 0 to 100
                    .write(outputFileName, (err) => {
                    // Callback function executed when finished
                    if (!err) {
                        console.log("Finished saving JPG");
                        files.push(outputFileName);
                    }
                    else {
                        console.log("There was an error! " + outputFileName, err);
                    }
                });
            });
        });
        res.send(files.join(","));
    }
    catch (e) {
        res.status(500).send(e.toString());
    }
}));
exports.default = router;
//# sourceMappingURL=process-pdf.js.map