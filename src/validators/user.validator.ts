import joi from "joi";

import { regexConstant } from "../constants/regex.constant";

export class UserValidator {
  private static name = joi.string().min(3).trim();
  private static age = joi.number().min(15).max(50);
  private static email = joi.string().lowercase().regex(regexConstant.EMAIL);
  private static password = joi.string().regex(regexConstant.PASSWORD).trim();
  private static phone = joi.string().regex(regexConstant.PHONE);

  public static createUser = joi.object({
    name: UserValidator.name.required(),
    age: UserValidator.age.required(),
    email: UserValidator.email.required(),
    password: UserValidator.password.required(),
    phone: UserValidator.phone.required(),
  });

  public static updateUser = joi.object({
    name: UserValidator.name,
    age: UserValidator.age,
    email: UserValidator.email,
    phone: UserValidator.phone,
  });
}
