import express from "express";
import bodyParser from "body-parser";
import processPdf from "./process-pdf";
import processImage from "./process-image";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/process", processPdf);
app.use("/process", processImage);

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
