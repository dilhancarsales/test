import gm from "gm";
import path from "path";
import fs from "fs-extra";
export class Graphics {
    constructor() {
        this.quality = 0;
        this.format = "png";
        this.width = 768;
        this.height = 512;
        this.density = 72;
        this.savePath = "./";
        this.saveFilename = "untitled";
        this.compression = "jpeg";
        this.gm = gm.subClass({ imageMagick: false });
    }
    generateValidFilename(page) {
        if (typeof page === "number") {
            return `${this.savePath}/${this.saveFilename}.${page + 1}.${this.format}`;
        }
        return `${this.savePath}/${this.saveFilename}.${this.format}`;
    }
    gmBaseCommand(stream, filename) {
        return this.gm(stream, filename)
            .density(this.density, this.density)
            // .resize(this.width, this.height, "!")
            .quality(this.quality)
            .compress(this.compression);
    }
    writeImage(stream, page) {
        const output = this.generateValidFilename(page);
        const pageSetup = `${stream.path}[${page}]`;
        return new Promise((resolve, reject) => {
            this.gmBaseCommand(stream, pageSetup)
                .write(output, (error) => {
                if (error) {
                    return reject(error);
                }
                return resolve({
                    name: path.basename(output),
                    size: `${this.width}x${this.height}`,
                    fileSize: fs.statSync(output).size / 1000.0,
                    path: output,
                    page: page + 1
                });
            });
        });
    }
    identify(filepath, argument) {
        const image = this.gm(filepath);
        return new Promise((resolve, reject) => {
            if (argument) {
                image.identify(argument, (error, data) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(data.replace(/^[\w\W]*?1/, "1"));
                });
            }
            else {
                image.identify((error, data) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(data);
                });
            }
        });
    }
    setQuality(quality) {
        this.quality = quality;
        return this;
    }
    setFormat(format) {
        this.format = format;
        return this;
    }
    setSize(width, height) {
        this.width = width;
        this.height = !!height ? height : width;
        return this;
    }
    setDensity(density) {
        this.density = density;
        return this;
    }
    setSavePath(savePath) {
        this.savePath = savePath;
        return this;
    }
    setSaveFilename(filename) {
        this.saveFilename = filename;
        return this;
    }
    setCompression(compression) {
        this.compression = compression;
        return this;
    }
    setGMClass(gmClass) {
        if (typeof gmClass === "boolean") {
            this.gm = gm.subClass({ imageMagick: gmClass });
            return this;
        }
        if (gmClass.toLocaleLowerCase() === "imagemagick") {
            this.gm = gm.subClass({ imageMagick: true });
            return this;
        }
        this.gm = gm.subClass({ appPath: gmClass });
        return this;
    }
    getOptions() {
        return {
            quality: this.quality,
            format: this.format,
            width: this.width,
            height: this.height,
            density: this.density,
            savePath: this.savePath,
            saveFilename: this.saveFilename,
            compression: this.compression
        };
    }
}
