import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { ApiError } from "../errors/api-error";

class FileMiddleware {
  public isFileValid(
    paramName: string,
    config: { MAX_SIZE: number; MIMETYPES: string[] },
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const file = req.files?.[paramName] as UploadedFile;
        if (!file) {
          throw new ApiError("File not found", 400);
        }
        if (file.size > config.MAX_SIZE) {
          throw new ApiError("File is too large", 400);
        }
        if (!config.MIMETYPES.includes(file.mimetype)) {
          throw new ApiError("Invalid file type", 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const fileMiddleware = new FileMiddleware();
