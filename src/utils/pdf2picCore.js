import { defaultOptions } from "defaultOptions";
import { Graphics } from "graphics";
import { convertToStream } from "converters/convertToStream";
import { bulkConvert } from "bulk/bulkConvert";
export function pdf2picCore(source, filePath, options = defaultOptions) {
    const gm = new Graphics();
    options = Object.assign(Object.assign({}, defaultOptions), options);
    const convert = (page = 1) => {
        if (page < 1) {
            throw new Error("Page number should be more than or equal 1");
        }
        const stream = convertToStream(source, filePath);
        return gm.writeImage(stream, (page - 1));
    };
    convert.bulk = (pages, toBase64 = false) => {
        return bulkConvert(gm, source, filePath, pages, toBase64);
    };
    convert.setOptions = () => setGMOptions(gm, options);
    convert.setGMClass = (gmClass) => {
        gm.setGMClass(gmClass);
        return;
    };
    convert.setOptions();
    return convert;
}
function setGMOptions(gm, options) {
    gm.setQuality(options.quality)
        .setFormat(options.format)
        // .setSize(options.width, options.height)
        .setDensity(options.density)
        .setSavePath(options.savePath)
        .setSaveFilename(options.saveFilename)
        .setCompression(options.compression);
    return;
}
