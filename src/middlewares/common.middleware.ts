import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api-error";

class CommonMiddleware {
  public isIdValid(paramName: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params[paramName];
        if (!isObjectIdOrHexString(id)) {
          throw new ApiError("Invalid id", 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();
