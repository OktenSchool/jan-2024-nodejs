import { removeOldTokensCron } from "./remove-old-tokens.cron";
import { testCron } from "./test.cron";

export const jobRunner = () => {
  testCron.start();
  removeOldTokensCron.start();
};
