import * as jsonwebtoken from "jsonwebtoken";

import { configs } from "../configs/configs";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api-error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";

class TokenService {
  public async generatePair(payload: ITokenPayload): Promise<ITokenPair> {
    const accessToken = jsonwebtoken.sign(payload, configs.JWT_ACCESS_SECRET, {
      expiresIn: configs.JWT_ACCESS_EXPIRES_IN,
    });
    const refreshToken = jsonwebtoken.sign(
      payload,
      configs.JWT_REFRESH_SECRET,
      { expiresIn: configs.JWT_REFRESH_EXPIRES_IN },
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  public checkToken(token: string, type: TokenTypeEnum): ITokenPayload {
    try {
      let secret: string;
      switch (type) {
        case TokenTypeEnum.ACCESS:
          secret = configs.JWT_ACCESS_SECRET;
          break;
        case TokenTypeEnum.REFRESH:
          secret = configs.JWT_REFRESH_SECRET;
          break;
        default:
          throw new ApiError("Token type is not valid", 401);
      }
      return jsonwebtoken.verify(token, secret) as ITokenPayload;
    } catch (error) {
      throw new ApiError("Token is not valid", 401);
    }
  }

  public async generateActionToken(
    payload: ITokenPayload,
    type: ActionTokenTypeEnum,
  ): Promise<string> {
    let secret: string;
    let expiresIn: string;

    switch (type) {
      case ActionTokenTypeEnum.FORGOT_PASSWORD:
        secret = configs.JWT_ACTION_FORGOT_PASSWORD_SECRET;
        expiresIn = configs.JWT_ACTION_FORGOT_PASSWORD_EXPIRES_IN;
        break;
      default:
        throw new ApiError("Action token type is not valid", 401);
    }

    return jsonwebtoken.sign(payload, secret, { expiresIn });
  }

  public checkActionToken(
    token: string,
    type: ActionTokenTypeEnum,
  ): ITokenPayload {
    try {
      let secret: string;
      switch (type) {
        case ActionTokenTypeEnum.FORGOT_PASSWORD:
          secret = configs.JWT_ACTION_FORGOT_PASSWORD_SECRET;
          break;
        default:
          throw new ApiError("Token type is not valid", 401);
      }

      return jsonwebtoken.verify(token, secret) as ITokenPayload;
    } catch (error) {
      throw new ApiError("Token is not valid", 401);
    }
  }
}

export const tokenService = new TokenService();
