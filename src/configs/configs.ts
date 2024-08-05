import { ObjectCannedACL } from "@aws-sdk/client-s3/dist-types/models/models_0";
import dotenv from "dotenv";

dotenv.config();

export const configs = {
  APP_PORT: Number(process.env.APP_PORT),
  APP_HOST: process.env.APP_HOST,

  FRONTEND_URL: process.env.FRONTEND_URL,

  MONGO_URL: process.env.MONGO_URL,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,

  JWT_ACTION_FORGOT_PASSWORD_SECRET:
    process.env.JWT_ACTION_FORGOT_PASSWORD_SECRET,
  JWT_ACTION_FORGOT_PASSWORD_EXPIRES_IN:
    process.env.JWT_ACTION_FORGOT_PASSWORD_EXPIRES_IN,

  JWT_ACTION_VERIFY_EMAIL_SECRET: process.env.JWT_ACTION_VERIFY_EMAIL_SECRET,
  JWT_ACTION_VERIFY_EMAIL_EXPIRES_IN:
    process.env.JWT_ACTION_VERIFY_EMAIL_EXPIRES_IN,

  SMTP_EMAIL: process.env.SMTP_EMAIL,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,

  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  AWS_REGION: process.env.AWS_REGION,
  AWS_S3_ACL: process.env.AWS_S3_ACL as ObjectCannedACL,
  AWS_ENDPOINT_URL: process.env.AWS_ENDPOINT_URL,
};
