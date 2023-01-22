import { registerAs } from '@nestjs/config';

export const awsConfig = registerAs('aws', () => ({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY || '',
  bucket: process.env.AWS_S3_BUCKET || '',
}));
