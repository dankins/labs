import { refreshInstagramTokens } from "./refreshInstagramTokens";

export async function EveryHourCron() {
  console.log("executing Every Hour Cron Job");
  await refreshInstagramTokens();

  return { success: true };
}
