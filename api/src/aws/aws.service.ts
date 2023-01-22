import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class AwsService {
  private s3: S3;
  private bucket: string;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      accessKeyId: this.configService.get('aws.accessKeyId'),
      secretAccessKey: this.configService.get('aws.secretAccessKey'),
    });
    this.bucket = this.configService.get('aws.bucket');
  }

  async deleteFile(url: string): Promise<void> {
    const key: string = this.keyFromUrl(url);
    this.s3DeleteObject(key);
  }

  async deleteFiles(urls: Array<string>): Promise<void> {
    const keys: Array<{ Key: string }> = urls.map((e: string) => ({
      Key: this.keyFromUrl(e),
    }));
    this.s3DeleteObjects([...keys]);
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const timestamp = Date.now();
    const name = this.generateFileKey(file, timestamp);
    const data = await this.s3Upload(file.buffer, name, file.mimetype);
    return data.Location;
  }

  private generateFileKey(
    file: Express.Multer.File,
    timestamp: number,
  ): string {
    const filename = file.originalname.replace(/[^A-Z0-9]/gi, '');
    return `${timestamp}-${filename}`;
  }

  private async s3Upload(
    buffer: Buffer,
    name: string,
    mimetype: string,
  ): Promise<S3.ManagedUpload.SendData> {
    const params = {
      Bucket: this.bucket,
      Key: String(name),
      Body: buffer,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'eu-north-1',
      },
    };
    try {
      return await this.s3.upload(params).promise();
    } catch (e) {
      return null;
    }
  }

  private s3DeleteObject(key: string): void {
    this.s3
      .deleteObject({
        Bucket: this.bucket,
        Key: key,
      })
      .promise();
  }
  private s3DeleteObjects(keys: Array<{ Key: string }>): void {
    this.s3
      .deleteObjects(
        {
          Bucket: this.bucket,
          Delete: {
            Objects: keys,
          },
        },
        (err, data) => console.log(err, data),
      )
      .promise();
  }
  private keyFromUrl(url: string): string {
    return url.split('/').pop();
  }
}
