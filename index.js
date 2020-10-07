
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
  density: 300,
  saveFilename: "dilhan",
  savePath: "out",
  format: "jpeg"
};
const convert = pdf2pic.fromPath("files/dilhan.pdf", options);

convert.bulk(-1);


