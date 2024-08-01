import { CronJob } from "cron";

import { timeHelper } from "../helpers/time.helper";
import { oldPasswordRepository } from "../repositories/old-password.repository";

const handler = async () => {
  try {
    console.log("[removeOldPasswordsCron] Cron is running");

    await oldPasswordRepository.deleteByParams({
      createdAt: { $lte: timeHelper.subtractByParams(90, "day") },
    });
    console.log("[removeOldPasswordsCron] Cron finished");
  } catch (error) {
    console.error("[removeOldPasswordsCron] Cron failed", error);
  }
};

export const removeOldPasswordsCron = new CronJob("0,30 * * 8 * *", handler);
