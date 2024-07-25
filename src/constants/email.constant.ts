import { EmailTypeEnum } from "../enums/email-type.enum";

export const emailConstant = {
  [EmailTypeEnum.WELCOME]: {
    subject: "Welcome",
    template: "welcome",
  },

  [EmailTypeEnum.FORGOT_PASSWORD]: {
    subject: "Forgot password",
    template: "forgot-password",
  },

  [EmailTypeEnum.LOGOUT]: {
    subject: "Logout",
    template: "logout",
  },
};
