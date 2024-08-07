import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { IUser, IUserListQuery } from "../interfaces/user.interface";
import { UserPresenter } from "../presenters/user.presenter";
import { userService } from "../services/user.service";

class UserController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query as IUserListQuery;
      const result = await userService.getList(query);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const user = await userService.getById(userId);
      const result = UserPresenter.toResponse(user);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.res.locals.jwtPayload.userId as string;
      const user = await userService.getMe(userId);
      const result = UserPresenter.toResponse(user);

      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.res.locals.jwtPayload.userId as string;
      const dto = req.body as IUser;

      const result = await userService.updateMe(userId, dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async deleteMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.res.locals.jwtPayload.userId as string;
      await userService.deleteMe(userId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async uploadAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const avatar = req.files?.avatar as UploadedFile;
      const userId = req.res.locals.jwtPayload.userId as string;
      const user = await userService.uploadAvatar(userId, avatar);
      const result = UserPresenter.toResponse(user);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async deleteAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.res.locals.jwtPayload.userId as string;
      const user = await userService.deleteAvatar(userId);
      const result = UserPresenter.toResponse(user);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
