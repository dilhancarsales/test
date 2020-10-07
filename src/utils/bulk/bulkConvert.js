var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getPages } from "getPages";
import { convertToStream } from "converters/convertToStream";
export function bulkConvert(gm, source, filePath, pageNumber = 1, toBase64 = false) {
    return __awaiter(this, void 0, void 0, function* () {
        if (pageNumber !== -1 && pageNumber < 1) {
            throw new Error("Page number should be more than or equal 1");
        }
        const stream = convertToStream(source, filePath);
        const tempStream = convertToStream(source, filePath);
        const pageNumbers = Array.isArray(pageNumber) ? pageNumber : [pageNumber];
        pageNumber = pageNumber === -1 ? yield getPages(gm, tempStream) : pageNumbers;
        const pages = pageNumber.map(page => {
            if (pageNumber < 1) {
                throw new Error("Page number should be more than or equal 1");
            }
            return gm.writeImage(stream, (page - 1));
        });
        return Promise.all(pages);
    });
}
