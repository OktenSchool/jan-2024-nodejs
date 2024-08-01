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

  [EmailTypeEnum.OLD_VISIT]: {
    subject: "Old visit",
    template: "old-visit",
  },

  [EmailTypeEnum.LOGOUT]: {
    subject: "Logout",
    template: "logout",
  },
};
