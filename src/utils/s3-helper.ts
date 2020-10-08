import { AWSError, S3, Credentials } from "aws-sdk";
import { ReadStream } from "fs-extra";

// set environment variables
// AWS_ACCESS_KEY_ID,  AWS_SECRET_ACCESS_KEY, AWS_REGION

const space = new S3({
  endpoint: "nyc3.digitaloceanspaces.com",
  credentials: new Credentials(
    "AYQGFI7H7ZPARGTTQK4R",
    "OCclnO+CPFfp4m7W6VGJfIcRrcMWlZHm+0ZG+t0EAo0"
  ),
});

const s3Helper = {
  getStream: (bucketName: string, fileName: string): Promise<ReadStream> => {
    return new Promise((resolve: any, reject) => {

      const params = {
        Bucket: bucketName,
        Key: fileName,
      };

      const stream = space
        .getObject(params)
        .createReadStream()
        .on("error", (err) => {
          console.log(err);
          reject();
        });

        resolve(stream);
    });
  },
};

export default s3Helper;
