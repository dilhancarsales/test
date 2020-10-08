"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
// set environment variables
// AWS_ACCESS_KEY_ID,  AWS_SECRET_ACCESS_KEY, AWS_REGION
const space = new aws_sdk_1.S3({
    endpoint: "nyc3.digitaloceanspaces.com",
    credentials: new aws_sdk_1.Credentials("AYQGFI7H7ZPARGTTQK4R", "OCclnO+CPFfp4m7W6VGJfIcRrcMWlZHm+0ZG+t0EAo0"),
});
const s3Helper = {
    getStream: (bucketName, fileName) => {
        return new Promise((resolve, reject) => {
            const params = {
                Bucket: bucketName,
                Key: fileName,
            };
            const stream = space
                .getObject(params, (err, data) => {
                resolve(data.Body);
            })
                .on("error", (err) => {
                console.log(err);
                reject();
            });
        });
    },
};
exports.default = s3Helper;
//# sourceMappingURL=s3-helper.js.map