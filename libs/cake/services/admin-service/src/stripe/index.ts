import { handleEvent } from "./webhooks/handleEvent";
import { getOrCreateCustomer } from "./payments/getOrCreateCustomer";
import { getPaymentIntent } from "./payments/getPaymentIntent";
import { getInvoice } from "./payments/getInvoice";
import { getCustomer } from "./payments/getCustomer";
import { getSubscriptionByCustomerId } from "./payments/getSubscriptionByCustomerId";
export const stripe = {
  webhooks: {
    handleEvent,
  },
  payments: {
    getOrCreateCustomer,
    getCustomer,
    getPaymentIntent,
    getInvoice,
    getSubscriptionByCustomerId,
  },
};
