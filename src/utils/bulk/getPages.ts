import { Graphics } from "graphics";
import { ReadStream } from "fs-extra";

export async function getPages(gm: Graphics, pdfPath: ReadStream): Promise<number[]> {
  const page = (await gm.identify(pdfPath, "%p ") as string)

  return page.split(" ").map((pageNumber) => parseInt(pageNumber, 10));
}
