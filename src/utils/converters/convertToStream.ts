
import { createReadStream, ReadStream } from "fs-extra";

export function convertToStream(source: string, file: string): ReadStream {
  return createReadStream(file as string);

  throw new Error("Cannot recognize specified source");
}
