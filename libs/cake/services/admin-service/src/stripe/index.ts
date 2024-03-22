import { handleEvent } from "./webhooks/handleEvent";
export const stripe = {
  webhooks: {
    handleEvent,
  },
};
