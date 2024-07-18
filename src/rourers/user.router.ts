import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();

router.get("/", userController.getList);
router.post(
  "/",
  // TODO add validation middleware for body
  userController.create,
);

// router.get(
//   "/:userId/invoices/:invoiceId",
//   commonMiddleware.isIdValid("userId"),
//   commonMiddleware.isIdValid("invoiceId"),
//   userController.getById,
// );
router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.getById,
);
router.put(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  // TODO add validation middleware for body
  userController.updateById,
);
router.delete(
  "/:carId",
  commonMiddleware.isIdValid("carId"),
  userController.deleteById,
);

export const userRouter = router;
