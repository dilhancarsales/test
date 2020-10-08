"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const process_pdf_1 = __importDefault(require("./process-pdf"));
const process_image_1 = __importDefault(require("./process-image"));
const app = express_1.default();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use("/process", process_pdf_1.default);
app.use("/process", process_image_1.default);
app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=app.js.map