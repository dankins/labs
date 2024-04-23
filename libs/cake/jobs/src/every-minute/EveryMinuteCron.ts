import { refreshInstagramTokens } from "../every-hour/refreshInstagramTokens";

export async function EveryMinuteCron() {
  console.log("executing Every Minute Cron Job");
  // await refreshInstagramTokens();
  return { success: true };
}
