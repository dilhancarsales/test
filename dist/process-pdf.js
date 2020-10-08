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
const gmToBuffer = (data) => {
    return new Promise((resolve, reject) => {
        data.stream((err, stdout, stderr) => {
            if (err) {
                return reject(err);
            }
            const chunks = [];
            stdout.on('data', (chunk) => { chunks.push(chunk); });
            stdout.once('end', () => { resolve(Buffer.concat(chunks)); });
            stderr.once('data', (data1) => { reject(String(data1)); });
        });
    });
};
router.get("/pdf", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = req.query.fileName;
    const tenantId = req.query.tenantId;
    if (!fileName || !tenantId) {
        res.status(400).send("fileName and tenantId is required");
        return;
    }
    const tenantBucketName = "pz." + (tenantId === null || tenantId === void 0 ? void 0 : tenantId.toString().replace(/_/g, "").replace(/-/g, ""));
    try {
        // Download
        const original = yield s3_helper_1.default.getBuffer("proofjet.upload", fileName === null || fileName === void 0 ? void 0 : fileName.toString());
        const files = [];
        // Transform
        gm1(original.Body).identify("%p ", (error, data) => {
            const pages = data
                .replace(/^[\w\W]*?1/, "1")
                .split(" ")
                .map((pageNumber) => parseInt(pageNumber, 10));
            pages.map((pageNumber) => __awaiter(void 0, void 0, void 0, function* () {
                const outputFileName = `${savePath}/${fileName}.${pageNumber}.jpg`;
                console.log(outputFileName);
                // Create JPG from page 0 of the PDF
                const outa = gm1(original.Body, `${fileName}[${pageNumber - 1}]`) // The name of your pdf
                    .setFormat("jpg")
                    .density(280, 280)
                    .quality(80);
                const stream = yield gmToBuffer(outa);
                const s3FileName = `${fileName}.${pageNumber}.jpg`;
                files.push(s3FileName);
                yield s3_helper_1.default.putObject(tenantBucketName, s3FileName, "image/jpg", stream);
                console.log("Finished saving JPG");
            }));
        });
        res.send({ files });
    }
    catch (e) {
        res.status(500).send(e.toString());
    }
}));
exports.default = router;
//# sourceMappingURL=process-pdf.js.map