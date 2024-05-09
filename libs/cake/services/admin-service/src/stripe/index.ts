import { handleEvent } from "./webhooks/handleEvent";
import { createCustomer } from "./payments/createCustomer";
import { getOrCreateCustomer } from "./payments/getOrCreateCustomer";
export const stripe = {
  webhooks: {
    handleEvent,
  },
  payments: {
    getOrCreateCustomer,
  },
};
