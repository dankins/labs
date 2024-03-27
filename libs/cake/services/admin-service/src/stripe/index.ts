import { handleEvent } from "./webhooks/handleEvent";
import { createCustomer } from "./payments/createCustomer";
export const stripe = {
  webhooks: {
    handleEvent,
  },
  payments: {
    createCustomer,
  },
};
