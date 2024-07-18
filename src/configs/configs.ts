import dotenv from "dotenv";

dotenv.config();

export const configs = {
  APP_PORT: Number(process.env.APP_PORT),
  APP_HOST: process.env.APP_HOST,

  MONGO_URL: process.env.MONGO_URL,
};
