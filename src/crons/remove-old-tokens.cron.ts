import { CronJob } from "cron";

import { configs } from "../configs/configs";
import { timeHelper } from "../helpers/time.helper";
import { tokenRepository } from "../repositories/token.repository";

const handler = async () => {
  try {
    console.log("[removeOldTokensCron] Cron is running");
    const [value, unit] = timeHelper.parseString(
      configs.JWT_REFRESH_EXPIRES_IN,
    );
    await tokenRepository.deleteByParams({
      createdAt: { $lte: timeHelper.subtractByParams(value, unit) },
    });
    console.log("[removeOldTokensCron] Cron finished");
  } catch (error) {
    console.error("[removeOldTokensCron] Cron failed", error);
  }
};

export const removeOldTokensCron = new CronJob("0 * * * 7 *", handler);
