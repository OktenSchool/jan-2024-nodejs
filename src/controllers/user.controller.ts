import { NextFunction, Request, Response } from "express";

import { IUser } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.getList();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as any; // TODO
      const result = await userService.create(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const result = await userService.getById(userId);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  //TODO
  public async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);
      const dto = req.body as IUser;

      const result = await userService.updateById(userId, dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  //TODO
  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);
      await userService.deleteById(userId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
