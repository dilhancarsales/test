var gm = require('gm');
var fs = require('fs-extra');

var pdfPath = "test.pdf";
var savePath = "out";
var saveFileName = "test-out.pdf";

gm.subClass = gm.subClass({ imageMagick: false });

gm(pdfPath)
    .identify("%p ", function (error, data) {
        console.log(error);


    var pages = data
        .replace(/^[\w\W]*?1/, "1")
        .split(" ").map((pageNumber) => parseInt(pageNumber, 10));

    var stream = fs.createReadStream(pdfPath);

    pages.map((pageNumber) => {

        var outputFileName = `${savePath}/${saveFileName}.${pageNumber + 1}.jpg`;

        // Create JPG from page 0 of the PDF
        gm(stream, `${pdfPath}[${pageNumber}]`) // The name of your pdf
            .setFormat("jpg")
            .density(300, 300)
            //.resize(200) // Resize to fixed 200px width, maintaining aspect ratio
            .quality(80) // Quality from 0 to 100
            .write(outputFileName, function (error) {
                // Callback function executed when finished
                if (!error) {
                    console.log("Finished saving JPG");
                } else {
                    console.log("There was an error!", error);
                }
            });

    });
});

