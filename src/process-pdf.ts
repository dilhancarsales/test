import express, { Router, Request, Response } from "express";
import s3Helper from "./utils/s3-helper";
import gm from "gm";
import fs from "fs-extra";

const router: Router = express.Router();

const savePath = "temp-files";

gm.subClass({ imageMagick: false });

router.get("/pdf", async (req: Request, res: Response) => {
  const fileName = req.body.fileName;

  try {
    const s3Stream = await s3Helper.getStream("proofjet.upload", "xyz.pdf");

    const files: string[] = [];

    gm(s3Stream).identify("%p ", (error, data) => {
      console.log(error);

      const pages = data
        .replace(/^[\w\W]*?1/, "1")
        .split(" ")
        .map((pageNumber) => parseInt(pageNumber, 10));

      pages.map((pageNumber) => {
        const outputFileName = `${savePath}/${fileName}.${pageNumber + 1}.jpg`;

        // Create JPG from page 0 of the PDF
        gm(s3Stream, `$test.pdf[${pageNumber}]`) // The name of your pdf
          .setFormat("jpg")
          .density(280, 280)
          .quality(80) // Quality from 0 to 100
          .write(outputFileName, (err) => {
            // Callback function executed when finished
            if (!err) {
              console.log("Finished saving JPG");
              files.push(`$test.pdf[${pageNumber}]`);
            } else {
              console.log("There was an error!", err);
            }
          });
      });
    });

    res.send(files.join(","));
  } catch (e) {
    res.status(500).send(e.toString());
  }
});

export default router;
