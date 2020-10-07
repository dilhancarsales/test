var gm = require('gm');

console.log(' bababa! ');

gm('files/test.jpg')
.resize(353, 257)
.autoOrient()
.write('out/test.jpg', function (err) {
  if (!err) console.log(' hooray! ');

  console.log(err);
});