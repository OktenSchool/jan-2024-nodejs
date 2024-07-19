import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getList);
router.post(
  "/",
  commonMiddleware.isBodyValid(UserValidator.createUser),
  userController.create,
);

router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.getById,
);
router.put(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(UserValidator.updateUser),
  userController.updateById,
);
router.delete(
  "/:carId",
  commonMiddleware.isIdValid("carId"),
  userController.deleteById,
);

export const userRouter = router;
