import { NextFunction, Request, Response } from "express";

import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api-error";
import { tokenRepository } from "../repositories/token.repository";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const header = req.headers.authorization;
      if (!header) {
        throw new ApiError("Token is not provided", 401);
      }
      const accessToken = header.split("Bearer ")[1];
      const payload = tokenService.checkToken(
        accessToken,
        TokenTypeEnum.ACCESS,
      );

      const pair = await tokenRepository.findByParams({ accessToken });
      if (!pair) {
        throw new ApiError("Token is not valid", 401);
      }
      req.res.locals.jwtPayload = payload;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const header = req.headers.authorization;
      if (!header) {
        throw new ApiError("Token is not provided", 401);
      }
      const refreshToken = header.split("Bearer ")[1];
      const payload = tokenService.checkToken(
        refreshToken,
        TokenTypeEnum.REFRESH,
      );

      const pair = await tokenRepository.findByParams({ refreshToken });
      if (!pair) {
        throw new ApiError("Token is not valid", 401);
      }
      req.res.locals.jwtPayload = payload;
      req.res.locals.oldTokensId = pair._id;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
