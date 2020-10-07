var gm = require('gm');

console.log(' bababa! ');

/*
gm('files/test.jpg')
.resize(353, 257)
.autoOrient()
//.adjoin()

.write('out/test.jpg', function (err) {
  if (!err) console.log(' hooray! ');

  console.log(err);
});*/

gm('files/sample_pdf.pdf')
.adjoin()
.write('out/sample_pdf-%0d.jpg', function(err){
  console.log(err);
});