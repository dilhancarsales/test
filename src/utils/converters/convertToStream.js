import { createReadStream } from "fs-extra";
export function convertToStream(source, file) {
    return createReadStream(file);
    throw new Error("Cannot recognize specified source");
}
