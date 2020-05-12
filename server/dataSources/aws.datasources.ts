import { S3DataSource } from '@ovotech/apollo-datasource-s3';
import { S3 } from 'aws-sdk';

class aws extends S3DataSource {
  constructor(s3: S3) {
    super();
  }
  /**
   * GET OFFER
   */
  async get() {
    return await this.getObjectJson({ Bucket: 'bucket', Key: 'data.json' });
  }

  async uploadFile(fileName, fileContent) {
    const date = new Date();

    //prepare content file to send
    let params = {
      Bucket: process.env.BUCKET_PROJECT,
      Key: `${process.env.BUCKET_DIRNAME}/${fileName}`, // File name you want to save as in S3
    };

    try {
      const Body = await this.getObject(params);
      //Try to append content
      let body = Body.toString('utf-8');
      body += `[${date.toDateString()} ${date.toTimeString()}]\n${fileContent}\n`;

      this.s3.upload({ ...params, Body: body }, function(err, data) {
        if (err) {
          throw err;
        }
        console.info(
          `File append and uploaded successfully to ${data.Location}`
        );
      });
    } catch (error) {
      //If err (file not exists), try to create and upload it on bucket
      const message = `Error getting object ${params.Key} from bucket ${params.Bucket}.
        Try to create the file on bucket ${params.Bucket}.`;
      console.info(message);

      const body = `[${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]\n${fileContent}\n`;

      this.s3.upload({ ...params, Body: body }, function(err, data) {
        if (err) {
          throw err;
        }
        console.info(`File uploaded successfully to ${data.Location}`);
      });
    }
  }
}

export default aws;
