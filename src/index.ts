
import  { pdf2picCore }  from "utils/pdf2picCore";

// tslint:disable-next-line: no-console
console.log('banana');


const options = {
  density: 100,
  saveFilename: "untitled",
  savePath: "./images",
  format: "png",
  width: 600,
  height: 600
};
const storeAsImage = pdf2picCore("path", "/src/files/test.pdf", options);
const pageToConvertAsImage = 1;

storeAsImage.bulk(-1);

