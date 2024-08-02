import { configs } from "../configs/configs";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { ApiError } from "../errors/api-error";
import {
  IForgotResetPassword,
  IForgotSendEmail,
} from "../interfaces/action-token.interface";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import { ILogin, IUser } from "../interfaces/user.interface";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { oldPasswordRepository } from "../repositories/old-password.repository";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async signUp(
    dto: IUser,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    await this.isEmailExist(dto.email);

    const password = await passwordService.hashPassword(dto.password);
    const user = await userRepository.create({ ...dto, password });

    const tokens = await tokenService.generatePair({
      userId: user._id,
      role: user.role,
    });
    const actionToken = await tokenService.generateActionToken(
      { userId: user._id, role: user.role },
      ActionTokenTypeEnum.VERIFY_EMAIL,
    );

    await tokenRepository.create({ ...tokens, _userId: user._id });
    await actionTokenRepository.create({
      actionToken,
      type: ActionTokenTypeEnum.VERIFY_EMAIL,
      _userId: user._id,
    });
    await emailService.sendEmail(EmailTypeEnum.WELCOME, dto.email, {
      name: dto.name,
      actionToken,
      frontUrl: configs.FRONTEND_URL,
    });
    return { user, tokens };
  }

  public async signIn(
    dto: ILogin,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    const user = await userRepository.getByParams({ email: dto.email });
    if (!user) {
      throw new ApiError("Invalid credentials", 401);
    }

    const isPasswordCorrect = await passwordService.comparePassword(
      dto.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new ApiError("Invalid credentials", 401);
    }

    const tokens = await tokenService.generatePair({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id });
    return { user, tokens };
  }

  public async refresh(
    payload: ITokenPayload,
    oldTokenId: string,
  ): Promise<ITokenPair> {
    const tokens = await tokenService.generatePair({
      userId: payload.userId,
      role: payload.role,
    });
    await tokenRepository.create({ ...tokens, _userId: payload.userId });
    await tokenRepository.deleteById(oldTokenId);
    return tokens;
  }

  public async logout(payload: ITokenPayload, tokenId: string): Promise<void> {
    await tokenRepository.deleteById(tokenId);
    const user = await userRepository.getById(payload.userId);
    await emailService.sendEmail(EmailTypeEnum.LOGOUT, user.email, {
      name: user.name,
      frontUrl: configs.FRONTEND_URL,
    });
  }

  public async logoutAll(payload: ITokenPayload): Promise<void> {
    await tokenRepository.deleteByParams({ _userId: payload.userId });
    const user = await userRepository.getById(payload.userId);
    await emailService.sendEmail(EmailTypeEnum.LOGOUT, user.email, {
      name: user.name,
      frontUrl: configs.FRONTEND_URL,
    });
  }

  public async forgotPassword(dto: IForgotSendEmail): Promise<void> {
    const user = await userRepository.getByParams({ email: dto.email });
    if (!user) return;

    const actionToken = await tokenService.generateActionToken(
      { userId: user._id, role: user.role },
      ActionTokenTypeEnum.FORGOT_PASSWORD,
    );
    await actionTokenRepository.create({
      actionToken,
      type: ActionTokenTypeEnum.FORGOT_PASSWORD,
      _userId: user._id,
    });
    await emailService.sendEmail(EmailTypeEnum.FORGOT_PASSWORD, dto.email, {
      name: user.name,
      actionToken,
      frontUrl: configs.FRONTEND_URL,
    });
  }

  public async forgotPasswordSet(
    dto: IForgotResetPassword,
    jwtPayload: ITokenPayload,
  ): Promise<void> {
    const password = await passwordService.hashPassword(dto.password);
    await userRepository.updateById(jwtPayload.userId, { password });

    await actionTokenRepository.deleteByParams({
      _userId: jwtPayload.userId,
      type: ActionTokenTypeEnum.FORGOT_PASSWORD,
    });
    await tokenRepository.deleteByParams({
      _userId: jwtPayload.userId,
    });
  }

  public async verify(jwtPayload: ITokenPayload): Promise<void> {
    await userRepository.updateById(jwtPayload.userId, { isVerified: true });

    await actionTokenRepository.deleteByParams({
      _userId: jwtPayload.userId,
      type: ActionTokenTypeEnum.VERIFY_EMAIL,
    });
  }

  public async changePassword(
    jwtPayload: ITokenPayload,
    dto: { oldPassword: string; newPassword: string },
  ): Promise<void> {
    const [user, oldPasswords] = await Promise.all([
      userRepository.getById(jwtPayload.userId),
      oldPasswordRepository.getByUserId(jwtPayload.userId),
    ]);
    const isPasswordCorrect = await passwordService.comparePassword(
      dto.oldPassword,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new ApiError("Invalid password", 401);
    }

    const passwords = [...oldPasswords, { password: user.password }];
    await Promise.all(
      passwords.map(async (oldPassword) => {
        const isOldPassword = await passwordService.comparePassword(
          dto.newPassword,
          oldPassword.password,
        );
        if (isOldPassword) {
          throw new ApiError("New password should not be the same as old", 409);
        }
      }),
    );

    const password = await passwordService.hashPassword(dto.newPassword);
    await userRepository.updateById(jwtPayload.userId, { password });
    await oldPasswordRepository.create({
      password: user.password,
      _userId: user._id,
    });
    await tokenRepository.deleteByParams({ _userId: jwtPayload.userId });
  }

  private async isEmailExist(email: string): Promise<void> {
    const user = await userRepository.getByParams({ email });
    if (user) {
      throw new ApiError("Email already exists", 409);
    }
  }
}

export const authService = new AuthService();
