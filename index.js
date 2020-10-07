
//var gm = require('gm');


/*
gm('files/test.jpg')
.resize(353, 257)
.autoOrient()
//.adjoin()

.write('out/test.jpg', function (err) {
  if (!err) console.log(' hooray! ');

  console.log(err);
});*/


var pdf2pic = require('pdf2pic');


const options = {
  density: 100,
  saveFilename: "untitled",
  savePath: "out",
  format: "png",
  width: 600,
  height: 600
};
const storeAsImage = pdf2pic.fromPath("files/dilhan.pdf", options);
const pageToConvertAsImage = 1;

storeAsImage().then((resolve) => {
  console.log("Page 1 is now converted as image");

  return resolve;
});
