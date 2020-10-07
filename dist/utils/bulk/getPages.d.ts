/// <reference types="node" />
import { Graphics } from "graphics";
import { ReadStream } from "fs-extra";
export declare function getPages(gm: Graphics, pdfPath: ReadStream): Promise<number[]>;
