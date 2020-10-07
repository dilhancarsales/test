
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
  density: 200,
  saveFilename: "dilhan",
  savePath: "out",
  format: "png",
  width: 3000,
  height: 3000
};
const convert = pdf2pic.fromPath("files/dilhan.pdf", options);

convert.bulk(-1);


