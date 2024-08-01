import { oldVisitorCron } from "./old-visitor.cron";
import { removeOldPasswordsCron } from "./remove-old-passwords.cron";
import { removeOldTokensCron } from "./remove-old-tokens.cron";
import { testCron } from "./test.cron";

export const jobRunner = () => {
  testCron.start();
  removeOldTokensCron.start();
  removeOldPasswordsCron.start();
  oldVisitorCron.start();
};
