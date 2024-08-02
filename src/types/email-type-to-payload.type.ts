import { EmailTypeEnum } from "../enums/email-type.enum";
import { EmailPayloadCombinedType } from "./email-payload-combined.type";
import { PickRequired } from "./pick-required.type";

export type EmailTypeToPayloadType = {
  [EmailTypeEnum.WELCOME]: PickRequired<
    EmailPayloadCombinedType,
    "name" | "actionToken" | "frontUrl"
  >;

  [EmailTypeEnum.FORGOT_PASSWORD]: PickRequired<
    EmailPayloadCombinedType,
    "name" | "actionToken" | "frontUrl"
  >;

  [EmailTypeEnum.OLD_VISIT]: PickRequired<
    EmailPayloadCombinedType,
    "name" | "frontUrl"
  >;

  [EmailTypeEnum.LOGOUT]: PickRequired<
    EmailPayloadCombinedType,
    "name" | "frontUrl"
  >;
};
