import * as jsonwebtoken from "jsonwebtoken";

import { configs } from "../configs/configs";
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

  public checkToken(token: string): ITokenPayload {
    try {
      return jsonwebtoken.verify(
        token,
        configs.JWT_ACCESS_SECRET,
      ) as ITokenPayload;
    } catch (error) {
      throw new ApiError("Token is not valid", 401);
    }
  }
}

export const tokenService = new TokenService();
