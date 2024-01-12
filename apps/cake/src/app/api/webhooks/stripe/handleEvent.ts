import { Stripe } from "stripe";
import { handleInvoicePaid } from "./handleInvoicePaid";

export async function handleEvent(event: Stripe.Event) {
  // Successfully constructed event
  switch (event.type) {
    case "payment_intent.created":
      return handlePaymentIntentCreate(event);
    case "payment_intent.succeeded":
      return handlePaymentIntentSucceeded(event);
    case "charge.succeeded":
      return handleChargeSucceeded(event);
    case "invoice.paid":
      return await handleInvoicePaid(event);
    default:
      console.log(
        "Unhandled event:",
        event.type,
        event.id,
        JSON.stringify(event)
      );
      return;
  }
}

function handlePaymentIntentCreate(event: Stripe.Event) {
  return;
}

function handlePaymentIntentSucceeded(event: Stripe.Event) {
  console.log("stripe > payment_intent.succeeded", event);
}
function handleChargeSucceeded(event: Stripe.Event) {
  console.log("stripe > charge.succeeded", event);
}

/*
Unhandled event: customer.created evt_1OPnLdFp1nXP3WhKpZri9Z2S {"id":"evt_1OPnLdFp1nXP3WhKpZri9Z2S","object":"event","api_version":"2022-11-15","created":1703169341,"data":{"object":{"id":"cus_PEFriiibwU41yk","object":"customer","address":{"city":"Milton","country":"US","line1":"52 Cushing Road","line2":"","postal_code":"02186","state":"MA"},"balance":0,"created":1703169341,"currency":null,"default_source":null,"delinquent":false,"description":null,"discount":null,"email":"kinsleyd+blah@gmail.com","invoice_prefix":"2A5EDDA3","invoice_settings":{"custom_fields":null,"default_payment_method":null,"footer":null,"rendering_options":null},"livemode":false,"metadata":{},"name":"dan kinsley","next_invoice_sequence":1,"phone":null,"preferred_locales":[],"shipping":null,"tax_exempt":"none","test_clock":null}},"livemode":false,"pending_webhooks":2,"request":{"id":"req_5OtVqBFc1a6o17","idempotency_key":"stripe-node-retry-41bfda27-af74-4844-8e4c-db27d6933877"},"type":"customer.created"}
Unhandled event: customer.updated evt_1OPnLeFp1nXP3WhKyD92gCps {"id":"evt_1OPnLeFp1nXP3WhKyD92gCps","object":"event","api_version":"2022-11-15","created":1703169342,"data":{"object":{"id":"cus_PEFriiibwU41yk","object":"customer","address":{"city":"Milton","country":"US","line1":"52 Cushing Road","line2":"","postal_code":"02186","state":"MA"},"balance":0,"created":1703169341,"currency":"usd","default_source":null,"delinquent":false,"description":null,"discount":null,"email":"kinsleyd+blah@gmail.com","invoice_prefix":"2A5EDDA3","invoice_settings":{"custom_fields":null,"default_payment_method":null,"footer":null,"rendering_options":null},"livemode":false,"metadata":{},"name":"dan kinsley","next_invoice_sequence":2,"phone":null,"preferred_locales":[],"shipping":null,"tax_exempt":"none","test_clock":null},"previous_attributes":{"currency":null}},"livemode":false,"pending_webhooks":2,"request":{"id":"req_6IKjzkfjLoR5FP","idempotency_key":"stripe-node-retry-8b3be702-28f4-4229-bc13-03f458924c37"},"type":"customer.updated"}
Unhandled event: customer.subscription.created evt_1OPnLeFp1nXP3WhKnloBt9Dz {"id":"evt_1OPnLeFp1nXP3WhKnloBt9Dz","object":"event","api_version":"2022-11-15","created":1703169342,"data":{"object":{"id":"sub_1OPnLdFp1nXP3WhKf0clVO95","object":"subscription","application":null,"application_fee_percent":null,"automatic_tax":{"enabled":false},"billing_cycle_anchor":1703169341,"billing_thresholds":null,"cancel_at":null,"cancel_at_period_end":false,"canceled_at":null,"cancellation_details":{"comment":null,"feedback":null,"reason":null},"collection_method":"charge_automatically","created":1703169341,"currency":"usd","current_period_end":1734791741,"current_period_start":1703169341,"customer":"cus_PEFriiibwU41yk","days_until_due":null,"default_payment_method":null,"default_source":null,"default_tax_rates":[],"description":null,"discount":null,"ended_at":null,"items":{"object":"list","data":[{"id":"si_PEFr5E4qHgMBFD","object":"subscription_item","billing_thresholds":null,"created":1703169342,"metadata":{},"plan":{"id":"price_1OMByvFp1nXP3WhKTbP8y1CW","object":"plan","active":true,"aggregate_usage":null,"amount":10000,"amount_decimal":"10000","billing_scheme":"per_unit","created":1702310721,"currency":"usd","interval":"year","interval_count":1,"livemode":false,"metadata":{},"nickname":null,"product":"prod_PAX3LIdmcg7DlL","tiers_mode":null,"transform_usage":null,"trial_period_days":null,"usage_type":"licensed"},"price":{"id":"price_1OMByvFp1nXP3WhKTbP8y1CW","object":"price","active":true,"billing_scheme":"per_unit","created":1702310721,"currency":"usd","custom_unit_amount":null,"livemode":false,"lookup_key":null,"metadata":{},"nickname":null,"product":"prod_PAX3LIdmcg7DlL","recurring":{"aggregate_usage":null,"interval":"year","interval_count":1,"trial_period_days":null,"usage_type":"licensed"},"tax_behavior":"exclusive","tiers_mode":null,"transform_quantity":null,"type":"recurring","unit_amount":10000,"unit_amount_decimal":"10000"},"quantity":1,"subscription":"sub_1OPnLdFp1nXP3WhKf0clVO95","tax_rates":[]}],"has_more":false,"total_count":1,"url":"/v1/subscription_items?subscription=sub_1OPnLdFp1nXP3WhKf0clVO95"},"latest_invoice":"in_1OPnLdFp1nXP3WhKwtfD7Eob","livemode":false,"metadata":{"invitationId":"847f26d7-5ec9-4ab2-8c71-f9bd050626be","userId":"user_2ZmFBcDxOePMz6IToip8QKDfFa9"},"next_pending_invoice_item_invoice":null,"on_behalf_of":null,"pause_collection":null,"payment_settings":{"payment_method_options":null,"payment_method_types":null,"save_default_payment_method":"on_subscription"},"pending_invoice_item_interval":null,"pending_setup_intent":null,"pending_update":null,"plan":{"id":"price_1OMByvFp1nXP3WhKTbP8y1CW","object":"plan","active":true,"aggregate_usage":null,"amount":10000,"amount_decimal":"10000","billing_scheme":"per_unit","created":1702310721,"currency":"usd","interval":"year","interval_count":1,"livemode":false,"metadata":{},"nickname":null,"product":"prod_PAX3LIdmcg7DlL","tiers_mode":null,"transform_usage":null,"trial_period_days":null,"usage_type":"licensed"},"quantity":1,"schedule":null,"start_date":1703169341,"status":"incomplete","test_clock":null,"transfer_data":null,"trial_end":null,"trial_settings":{"end_behavior":{"missing_payment_method":"create_invoice"}},"trial_start":null}},"livemode":false,"pending_webhooks":2,"request":{"id":"req_6IKjzkfjLoR5FP","idempotency_key":"stripe-node-retry-8b3be702-28f4-4229-bc13-03f458924c37"},"type":"customer.subscription.created"}
initializing database
Unhandled event: invoice.created evt_1OPnLfFp1nXP3WhKrYR8XxhT {"id":"evt_1OPnLfFp1nXP3WhKrYR8XxhT","object":"event","api_version":"2022-11-15","created":1703169342,"data":{"object":{"id":"in_1OPnLdFp1nXP3WhKwtfD7Eob","object":"invoice","account_country":"US","account_name":"ALPHA MINER PARTNERS LLC","account_tax_ids":null,"amount_due":10000,"amount_paid":0,"amount_remaining":10000,"amount_shipping":0,"application":null,"application_fee_amount":null,"attempt_count":0,"attempted":false,"auto_advance":false,"automatic_tax":{"enabled":false,"status":null},"billing_reason":"subscription_create","charge":null,"collection_method":"charge_automatically","created":1703169341,"currency":"usd","custom_fields":null,"customer":"cus_PEFriiibwU41yk","customer_address":{"city":"Milton","country":"US","line1":"52 Cushing Road","line2":"","postal_code":"02186","state":"MA"},"customer_email":"kinsleyd+blah@gmail.com","customer_name":"dan kinsley","customer_phone":null,"customer_shipping":null,"customer_tax_exempt":"none","customer_tax_ids":[],"default_payment_method":null,"default_source":null,"default_tax_rates":[],"description":null,"discount":null,"discounts":[],"due_date":null,"effective_at":1703169341,"ending_balance":0,"footer":null,"from_invoice":null,"hosted_invoice_url":"https://invoice.stripe.com/i/acct_1L1DYmFp1nXP3WhK/test_YWNjdF8xTDFEWW1GcDFuWFAzV2hLLF9QRUZyZk9GODExVTZkTVhzZFB6SVJWdEswT2dBRlhNLDkzNzEwMTQz0200F9e5xFOa?s=ap","invoice_pdf":"https://pay.stripe.com/invoice/acct_1L1DYmFp1nXP3WhK/test_YWNjdF8xTDFEWW1GcDFuWFAzV2hLLF9QRUZyZk9GODExVTZkTVhzZFB6SVJWdEswT2dBRlhNLDkzNzEwMTQz0200F9e5xFOa/pdf?s=ap","last_finalization_error":null,"latest_revision":null,"lines":{"object":"list","data":[{"id":"il_1OPnLdFp1nXP3WhKnD5CpDtG","object":"line_item","amount":10000,"amount_excluding_tax":10000,"currency":"usd","description":"1 × Cake Membership (at $100.00 / year)","discount_amounts":[],"discountable":true,"discounts":[],"livemode":false,"metadata":{"invitationId":"847f26d7-5ec9-4ab2-8c71-f9bd050626be","userId":"user_2ZmFBcDxOePMz6IToip8QKDfFa9"},"period":{"end":1734791741,"start":1703169341},"plan":{"id":"price_1OMByvFp1nXP3WhKTbP8y1CW","object":"plan","active":true,"aggregate_usage":null,"amount":10000,"amount_decimal":"10000","billing_scheme":"per_unit","created":1702310721,"currency":"usd","interval":"year","interval_count":1,"livemode":false,"metadata":{},"nickname":null,"product":"prod_PAX3LIdmcg7DlL","tiers_mode":null,"transform_usage":null,"trial_period_days":null,"usage_type":"licensed"},"price":{"id":"price_1OMByvFp1nXP3WhKTbP8y1CW","object":"price","active":true,"billing_scheme":"per_unit","created":1702310721,"currency":"usd","custom_unit_amount":null,"livemode":false,"lookup_key":null,"metadata":{},"nickname":null,"product":"prod_PAX3LIdmcg7DlL","recurring":{"aggregate_usage":null,"interval":"year","interval_count":1,"trial_period_days":null,"usage_type":"licensed"},"tax_behavior":"exclusive","tiers_mode":null,"transform_quantity":null,"type":"recurring","unit_amount":10000,"unit_amount_decimal":"10000"},"proration":false,"proration_details":{"credited_items":null},"quantity":1,"subscription":"sub_1OPnLdFp1nXP3WhKf0clVO95","subscription_item":"si_PEFr5E4qHgMBFD","tax_amounts":[],"tax_rates":[],"type":"subscription","unit_amount_excluding_tax":"10000"}],"has_more":false,"total_count":1,"url":"/v1/invoices/in_1OPnLdFp1nXP3WhKwtfD7Eob/lines"},"livemode":false,"metadata":{},"next_payment_attempt":null,"number":"2A5EDDA3-0001","on_behalf_of":null,"paid":false,"paid_out_of_band":false,"payment_intent":"pi_3OPnLeFp1nXP3WhK1n9KeEgA","payment_settings":{"default_mandate":null,"payment_method_options":null,"payment_method_types":null},"period_end":1703169341,"period_start":1703169341,"post_payment_credit_notes_amount":0,"pre_payment_credit_notes_amount":0,"quote":null,"receipt_number":null,"rendering":null,"rendering_options":null,"shipping_cost":null,"shipping_details":null,"starting_balance":0,"statement_descriptor":null,"status":"open","status_transitions":{"finalized_at":1703169341,"marked_uncollectible_at":null,"paid_at":null,"voided_at":null},"subscription":"sub_1OPnLdFp1nXP3WhKf0clVO95","subscription_details":{"metadata":{"invitationId":"847f26d7-5ec9-4ab2-8c71-f9bd050626be","userId":"user_2ZmFBcDxOePMz6IToip8QKDfFa9"}},"subtotal":10000,"subtotal_excluding_tax":10000,"tax":null,"test_clock":null,"total":10000,"total_discount_amounts":[],"total_excluding_tax":10000,"total_tax_amounts":[],"transfer_data":null,"webhooks_delivered_at":null}},"livemode":false,"pending_webhooks":2,"request":{"id":"req_6IKjzkfjLoR5FP","idempotency_key":"stripe-node-retry-8b3be702-28f4-4229-bc13-03f458924c37"},"type":"invoice.created"}
Unhandled event: invoice.finalized evt_1OPnLfFp1nXP3WhKUsgIUR8V {"id":"evt_1OPnLfFp1nXP3WhKUsgIUR8V","object":"event","api_version":"2022-11-15","created":1703169342,"data":{"object":{"id":"in_1OPnLdFp1nXP3WhKwtfD7Eob","object":"invoice","account_country":"US","account_name":"ALPHA MINER PARTNERS LLC","account_tax_ids":null,"amount_due":10000,"amount_paid":0,"amount_remaining":10000,"amount_shipping":0,"application":null,"application_fee_amount":null,"attempt_count":0,"attempted":false,"auto_advance":false,"automatic_tax":{"enabled":false,"status":null},"billing_reason":"subscription_create","charge":null,"collection_method":"charge_automatically","created":1703169341,"currency":"usd","custom_fields":null,"customer":"cus_PEFriiibwU41yk","customer_address":{"city":"Milton","country":"US","line1":"52 Cushing Road","line2":"","postal_code":"02186","state":"MA"},"customer_email":"kinsleyd+blah@gmail.com","customer_name":"dan kinsley","customer_phone":null,"customer_shipping":null,"customer_tax_exempt":"none","customer_tax_ids":[],"default_payment_method":null,"default_source":null,"default_tax_rates":[],"description":null,"discount":null,"discounts":[],"due_date":null,"effective_at":1703169341,"ending_balance":0,"footer":null,"from_invoice":null,"hosted_invoice_url":"https://invoice.stripe.com/i/acct_1L1DYmFp1nXP3WhK/test_YWNjdF8xTDFEWW1GcDFuWFAzV2hLLF9QRUZyZk9GODExVTZkTVhzZFB6SVJWdEswT2dBRlhNLDkzNzEwMTQz0200F9e5xFOa?s=ap","invoice_pdf":"https://pay.stripe.com/invoice/acct_1L1DYmFp1nXP3WhK/test_YWNjdF8xTDFEWW1GcDFuWFAzV2hLLF9QRUZyZk9GODExVTZkTVhzZFB6SVJWdEswT2dBRlhNLDkzNzEwMTQz0200F9e5xFOa/pdf?s=ap","last_finalization_error":null,"latest_revision":null,"lines":{"object":"list","data":[{"id":"il_1OPnLdFp1nXP3WhKnD5CpDtG","object":"line_item","amount":10000,"amount_excluding_tax":10000,"currency":"usd","description":"1 × Cake Membership (at $100.00 / year)","discount_amounts":[],"discountable":true,"discounts":[],"livemode":false,"metadata":{"invitationId":"847f26d7-5ec9-4ab2-8c71-f9bd050626be","userId":"user_2ZmFBcDxOePMz6IToip8QKDfFa9"},"period":{"end":1734791741,"start":1703169341},"plan":{"id":"price_1OMByvFp1nXP3WhKTbP8y1CW","object":"plan","active":true,"aggregate_usage":null,"amount":10000,"amount_decimal":"10000","billing_scheme":"per_unit","created":1702310721,"currency":"usd","interval":"year","interval_count":1,"livemode":false,"metadata":{},"nickname":null,"product":"prod_PAX3LIdmcg7DlL","tiers_mode":null,"transform_usage":null,"trial_period_days":null,"usage_type":"licensed"},"price":{"id":"price_1OMByvFp1nXP3WhKTbP8y1CW","object":"price","active":true,"billing_scheme":"per_unit","created":1702310721,"currency":"usd","custom_unit_amount":null,"livemode":false,"lookup_key":null,"metadata":{},"nickname":null,"product":"prod_PAX3LIdmcg7DlL","recurring":{"aggregate_usage":null,"interval":"year","interval_count":1,"trial_period_days":null,"usage_type":"licensed"},"tax_behavior":"exclusive","tiers_mode":null,"transform_quantity":null,"type":"recurring","unit_amount":10000,"unit_amount_decimal":"10000"},"proration":false,"proration_details":{"credited_items":null},"quantity":1,"subscription":"sub_1OPnLdFp1nXP3WhKf0clVO95","subscription_item":"si_PEFr5E4qHgMBFD","tax_amounts":[],"tax_rates":[],"type":"subscription","unit_amount_excluding_tax":"10000"}],"has_more":false,"total_count":1,"url":"/v1/invoices/in_1OPnLdFp1nXP3WhKwtfD7Eob/lines"},"livemode":false,"metadata":{},"next_payment_attempt":null,"number":"2A5EDDA3-0001","on_behalf_of":null,"paid":false,"paid_out_of_band":false,"payment_intent":"pi_3OPnLeFp1nXP3WhK1n9KeEgA","payment_settings":{"default_mandate":null,"payment_method_options":null,"payment_method_types":null},"period_end":1703169341,"period_start":1703169341,"post_payment_credit_notes_amount":0,"pre_payment_credit_notes_amount":0,"quote":null,"receipt_number":null,"rendering":null,"rendering_options":null,"shipping_cost":null,"shipping_details":null,"starting_balance":0,"statement_descriptor":null,"status":"open","status_transitions":{"finalized_at":1703169341,"marked_uncollectible_at":null,"paid_at":null,"voided_at":null},"subscription":"sub_1OPnLdFp1nXP3WhKf0clVO95","subscription_details":{"metadata":{"invitationId":"847f26d7-5ec9-4ab2-8c71-f9bd050626be","userId":"user_2ZmFBcDxOePMz6IToip8QKDfFa9"}},"subtotal":10000,"subtotal_excluding_tax":10000,"tax":null,"test_clock":null,"total":10000,"total_discount_amounts":[],"total_excluding_tax":10000,"total_tax_amounts":[],"transfer_data":null,"webhooks_delivered_at":null}},"livemode":false,"pending_webhooks":2,"request":{"id":"req_6IKjzkfjLoR5FP","idempotency_key":"stripe-node-retry-8b3be702-28f4-4229-bc13-03f458924c37"},"type":"invoice.finalized"}
Unhandled event: payment_method.attached evt_1OPnM1Fp1nXP3WhKJdk00JhT {"id":"evt_1OPnM1Fp1nXP3WhKJdk00JhT","object":"event","api_version":"2022-11-15","created":1703169364,"data":{"object":{"id":"pm_1OPnLzFp1nXP3WhKVaSSgHdj","object":"payment_method","billing_details":{"address":{"city":null,"country":"US","line1":null,"line2":null,"postal_code":"02186","state":null},"email":null,"name":null,"phone":null},"card":{"brand":"visa","checks":{"address_line1_check":null,"address_postal_code_check":"pass","cvc_check":"pass"},"country":"US","exp_month":12,"exp_year":2029,"fingerprint":"YL3El74CazxkbACc","funding":"credit","generated_from":null,"last4":"4242","networks":{"available":["visa"],"preferred":null},"three_d_secure_usage":{"supported":true},"wallet":null},"created":1703169363,"customer":"cus_PEFriiibwU41yk","livemode":false,"metadata":{},"type":"card"}},"livemode":false,"pending_webhooks":2,"request":{"id":"req_Jq2KzcJcTWokrg","idempotency_key":"4ff4f07d-b1a5-45eb-9821-3ed0bf9c44c3"},"type":"payment_method.attached"}
Unhandled event: customer.subscription.updated evt_1OPnM1Fp1nXP3WhKycyLqEFk {"id":"evt_1OPnM1Fp1nXP3WhKycyLqEFk","object":"event","api_version":"2022-11-15","created":1703169364,"data":{"object":{"id":"sub_1OPnLdFp1nXP3WhKf0clVO95","object":"subscription","application":null,"application_fee_percent":null,"automatic_tax":{"enabled":false},"billing_cycle_anchor":1703169341,"billing_thresholds":null,"cancel_at":null,"cancel_at_period_end":false,"canceled_at":null,"cancellation_details":{"comment":null,"feedback":null,"reason":null},"collection_method":"charge_automatically","created":1703169341,"currency":"usd","current_period_end":1734791741,"current_period_start":1703169341,"customer":"cus_PEFriiibwU41yk","days_until_due":null,"default_payment_method":"pm_1OPnLzFp1nXP3WhKVaSSgHdj","default_source":null,"default_tax_rates":[],"description":null,"discount":null,"ended_at":null,"items":{"object":"list","data":[{"id":"si_PEFr5E4qHgMBFD","object":"subscription_item","billing_thresholds":null,"created":1703169342,"metadata":{},"plan":{"id":"price_1OMByvFp1nXP3WhKTbP8y1CW","object":"plan","active":true,"aggregate_usage":null,"amount":10000,"amount_decimal":"10000","billing_scheme":"per_unit","created":1702310721,"currency":"usd","interval":"year","interval_count":1,"livemode":false,"metadata":{},"nickname":null,"product":"prod_PAX3LIdmcg7DlL","tiers_mode":null,"transform_usage":null,"trial_period_days":null,"usage_type":"licensed"},"price":{"id":"price_1OMByvFp1nXP3WhKTbP8y1CW","object":"price","active":true,"billing_scheme":"per_unit","created":1702310721,"currency":"usd","custom_unit_amount":null,"livemode":false,"lookup_key":null,"metadata":{},"nickname":null,"product":"prod_PAX3LIdmcg7DlL","recurring":{"aggregate_usage":null,"interval":"year","interval_count":1,"trial_period_days":null,"usage_type":"licensed"},"tax_behavior":"exclusive","tiers_mode":null,"transform_quantity":null,"type":"recurring","unit_amount":10000,"unit_amount_decimal":"10000"},"quantity":1,"subscription":"sub_1OPnLdFp1nXP3WhKf0clVO95","tax_rates":[]}],"has_more":false,"total_count":1,"url":"/v1/subscription_items?subscription=sub_1OPnLdFp1nXP3WhKf0clVO95"},"latest_invoice":"in_1OPnLdFp1nXP3WhKwtfD7Eob","livemode":false,"metadata":{"invitationId":"847f26d7-5ec9-4ab2-8c71-f9bd050626be","userId":"user_2ZmFBcDxOePMz6IToip8QKDfFa9"},"next_pending_invoice_item_invoice":null,"on_behalf_of":null,"pause_collection":null,"payment_settings":{"payment_method_options":null,"payment_method_types":null,"save_default_payment_method":"on_subscription"},"pending_invoice_item_interval":null,"pending_setup_intent":null,"pending_update":null,"plan":{"id":"price_1OMByvFp1nXP3WhKTbP8y1CW","object":"plan","active":true,"aggregate_usage":null,"amount":10000,"amount_decimal":"10000","billing_scheme":"per_unit","created":1702310721,"currency":"usd","interval":"year","interval_count":1,"livemode":false,"metadata":{},"nickname":null,"product":"prod_PAX3LIdmcg7DlL","tiers_mode":null,"transform_usage":null,"trial_period_days":null,"usage_type":"licensed"},"quantity":1,"schedule":null,"start_date":1703169341,"status":"active","test_clock":null,"transfer_data":null,"trial_end":null,"trial_settings":{"end_behavior":{"missing_payment_method":"create_invoice"}},"trial_start":null},"previous_attributes":{"default_payment_method":null,"status":"incomplete"}},"livemode":false,"pending_webhooks":2,"request":{"id":"req_Jq2KzcJcTWokrg","idempotency_key":"4ff4f07d-b1a5-45eb-9821-3ed0bf9c44c3"},"type":"customer.subscription.updated"}
Unhandled event: invoice.updated evt_1OPnM1Fp1nXP3WhKHk20Kl9t {"id":"evt_1OPnM1Fp1nXP3WhKHk20Kl9t","object":"event","api_version":"2022-11-15","created":1703169364,"data":{"object":{"id":"in_1OPnLdFp1nXP3WhKwtfD7Eob","object":"invoice","account_country":"US","account_name":"ALPHA MINER PARTNERS LLC","account_tax_ids":null,"amount_due":10000,"amount_paid":10000,"amount_remaining":0,"amount_shipping":0,"application":null,"application_fee_amount":null,"attempt_count":1,"attempted":true,"auto_advance":false,"automatic_tax":{"enabled":false,"status":null},"billing_reason":"subscription_create","charge":"ch_3OPnLeFp1nXP3WhK1UUbrnYb","collection_method":"charge_automatically","created":1703169341,"currency":"usd","custom_fields":null,"customer":"cus_PEFriiibwU41yk","customer_address":{"city":"Milton","country":"US","line1":"52 Cushing Road","line2":"","postal_code":"02186","state":"MA"},"customer_email":"kinsleyd+blah@gmail.com","customer_name":"dan kinsley","customer_phone":null,"customer_shipping":null,"customer_tax_exempt":"none","customer_tax_ids":[],"default_payment_method":null,"default_source":null,"default_tax_rates":[],"description":null,"discount":null,"discounts":[],"due_date":null,"effective_at":1703169341,"ending_balance":0,"footer":null,"from_invoice":null,"hosted_invoice_url":"https://invoice.stripe.com/i/acct_1L1DYmFp1nXP3WhK/test_YWNjdF8xTDFEWW1GcDFuWFAzV2hLLF9QRUZyZk9GODExVTZkTVhzZFB6SVJWdEswT2dBRlhNLDkzNzEwMTY10200H9n9bkrk?s=ap","invoice_pdf":"https://pay.stripe.com/invoice/acct_1L1DYmFp1nXP3WhK/test_YWNjdF8xTDFEWW1GcDFuWFAzV2hLLF9QRUZyZk9GODExVTZkTVhzZFB6SVJWdEswT2dBRlhNLDkzNzEwMTY10200H9n9bkrk/pdf?s=ap","last_finalization_error":null,"latest_revision":null,"lines":{"object":"list","data":[{"id":"il_1OPnLdFp1nXP3WhKnD5CpDtG","object":"line_item","amount":10000,"amount_excluding_tax":10000,"currency":"usd","description":"1 × Cake Membership (at $100.00 / year)","discount_amounts":[],"discountable":true,"discounts":[],"livemode":false,"metadata":{"invitationId":"847f26d7-5ec9-4ab2-8c71-f9bd050626be","userId":"user_2ZmFBcDxOePMz6IToip8QKDfFa9"},"period":{"end":1734791741,"start":1703169341},"plan":{"id":"price_1OMByvFp1nXP3WhKTbP8y1CW","object":"plan","active":true,"aggregate_usage":null,"amount":10000,"amount_decimal":"10000","billing_scheme":"per_unit","created":1702310721,"currency":"usd","interval":"year","interval_count":1,"livemode":false,"metadata":{},"nickname":null,"product":"prod_PAX3LIdmcg7DlL","tiers_mode":null,"transform_usage":null,"trial_period_days":null,"usage_type":"licensed"},"price":{"id":"price_1OMByvFp1nXP3WhKTbP8y1CW","object":"price","active":true,"billing_scheme":"per_unit","created":1702310721,"currency":"usd","custom_unit_amount":null,"livemode":false,"lookup_key":null,"metadata":{},"nickname":null,"product":"prod_PAX3LIdmcg7DlL","recurring":{"aggregate_usage":null,"interval":"year","interval_count":1,"trial_period_days":null,"usage_type":"licensed"},"tax_behavior":"exclusive","tiers_mode":null,"transform_quantity":null,"type":"recurring","unit_amount":10000,"unit_amount_decimal":"10000"},"proration":false,"proration_details":{"credited_items":null},"quantity":1,"subscription":"sub_1OPnLdFp1nXP3WhKf0clVO95","subscription_item":"si_PEFr5E4qHgMBFD","tax_amounts":[],"tax_rates":[],"type":"subscription","unit_amount_excluding_tax":"10000"}],"has_more":false,"total_count":1,"url":"/v1/invoices/in_1OPnLdFp1nXP3WhKwtfD7Eob/lines"},"livemode":false,"metadata":{},"next_payment_attempt":null,"number":"2A5EDDA3-0001","on_behalf_of":null,"paid":true,"paid_out_of_band":false,"payment_intent":"pi_3OPnLeFp1nXP3WhK1n9KeEgA","payment_settings":{"default_mandate":null,"payment_method_options":null,"payment_method_types":null},"period_end":1703169341,"period_start":1703169341,"post_payment_credit_notes_amount":0,"pre_payment_credit_notes_amount":0,"quote":null,"receipt_number":null,"rendering":null,"rendering_options":null,"shipping_cost":null,"shipping_details":null,"starting_balance":0,"statement_descriptor":null,"status":"paid","status_transitions":{"finalized_at":1703169341,"marked_uncollectible_at":null,"paid_at":1703169364,"voided_at":null},"subscription":"sub_1OPnLdFp1nXP3WhKf0clVO95","subscription_details":{"metadata":{"invitationId":"847f26d7-5ec9-4ab2-8c71-f9bd050626be","userId":"user_2ZmFBcDxOePMz6IToip8QKDfFa9"}},"subtotal":10000,"subtotal_excluding_tax":10000,"tax":null,"test_clock":null,"total":10000,"total_discount_amounts":[],"total_excluding_tax":10000,"total_tax_amounts":[],"transfer_data":null,"webhooks_delivered_at":1703169343},"previous_attributes":{"amount_paid":0,"amount_remaining":10000,"attempt_count":0,"attempted":false,"charge":null,"paid":false,"status":"open","status_transitions":{"paid_at":null}}},"livemode":false,"pending_webhooks":2,"request":{"id":"req_Jq2KzcJcTWokrg","idempotency_key":"4ff4f07d-b1a5-45eb-9821-3ed0bf9c44c3"},"type":"invoice.updated"}
Unhandled event: invoice.paid evt_1OPnM1Fp1nXP3WhKVyvzQyxb {"id":"evt_1OPnM1Fp1nXP3WhKVyvzQyxb","object":"event","api_version":"2022-11-15","created":1703169364,"data":{"object":{"id":"in_1OPnLdFp1nXP3WhKwtfD7Eob","object":"invoice","account_country":"US","account_name":"ALPHA MINER PARTNERS LLC","account_tax_ids":null,"amount_due":10000,"amount_paid":10000,"amount_remaining":0,"amount_shipping":0,"application":null,"application_fee_amount":null,"attempt_count":1,"attempted":true,"auto_advance":false,"automatic_tax":{"enabled":false,"status":null},"billing_reason":"subscription_create","charge":"ch_3OPnLeFp1nXP3WhK1UUbrnYb","collection_method":"charge_automatically","created":1703169341,"currency":"usd","custom_fields":null,"customer":"cus_PEFriiibwU41yk","customer_address":{"city":"Milton","country":"US","line1":"52 Cushing Road","line2":"","postal_code":"02186","state":"MA"},"customer_email":"kinsleyd+blah@gmail.com","customer_name":"dan kinsley","customer_phone":null,"customer_shipping":null,"customer_tax_exempt":"none","customer_tax_ids":[],"default_payment_method":null,"default_source":null,"default_tax_rates":[],"description":null,"discount":null,"discounts":[],"due_date":null,"effective_at":1703169341,"ending_balance":0,"footer":null,"from_invoice":null,"hosted_invoice_url":"https://invoice.stripe.com/i/acct_1L1DYmFp1nXP3WhK/test_YWNjdF8xTDFEWW1GcDFuWFAzV2hLLF9QRUZyZk9GODExVTZkTVhzZFB6SVJWdEswT2dBRlhNLDkzNzEwMTY10200H9n9bkrk?s=ap","invoice_pdf":"https://pay.stripe.com/invoice/acct_1L1DYmFp1nXP3WhK/test_YWNjdF8xTDFEWW1GcDFuWFAzV2hLLF9QRUZyZk9GODExVTZkTVhzZFB6SVJWdEswT2dBRlhNLDkzNzEwMTY10200H9n9bkrk/pdf?s=ap","last_finalization_error":null,"latest_revision":null,"lines":{"object":"list","data":[{"id":"il_1OPnLdFp1nXP3WhKnD5CpDtG","object":"line_item","amount":10000,"amount_excluding_tax":10000,"currency":"usd","description":"1 × Cake Membership (at $100.00 / year)","discount_amounts":[],"discountable":true,"discounts":[],"livemode":false,"metadata":{"invitationId":"847f26d7-5ec9-4ab2-8c71-f9bd050626be","userId":"user_2ZmFBcDxOePMz6IToip8QKDfFa9"},"period":{"end":1734791741,"start":1703169341},"plan":{"id":"price_1OMByvFp1nXP3WhKTbP8y1CW","object":"plan","active":true,"aggregate_usage":null,"amount":10000,"amount_decimal":"10000","billing_scheme":"per_unit","created":1702310721,"currency":"usd","interval":"year","interval_count":1,"livemode":false,"metadata":{},"nickname":null,"product":"prod_PAX3LIdmcg7DlL","tiers_mode":null,"transform_usage":null,"trial_period_days":null,"usage_type":"licensed"},"price":{"id":"price_1OMByvFp1nXP3WhKTbP8y1CW","object":"price","active":true,"billing_scheme":"per_unit","created":1702310721,"currency":"usd","custom_unit_amount":null,"livemode":false,"lookup_key":null,"metadata":{},"nickname":null,"product":"prod_PAX3LIdmcg7DlL","recurring":{"aggregate_usage":null,"interval":"year","interval_count":1,"trial_period_days":null,"usage_type":"licensed"},"tax_behavior":"exclusive","tiers_mode":null,"transform_quantity":null,"type":"recurring","unit_amount":10000,"unit_amount_decimal":"10000"},"proration":false,"proration_details":{"credited_items":null},"quantity":1,"subscription":"sub_1OPnLdFp1nXP3WhKf0clVO95","subscription_item":"si_PEFr5E4qHgMBFD","tax_amounts":[],"tax_rates":[],"type":"subscription","unit_amount_excluding_tax":"10000"}],"has_more":false,"total_count":1,"url":"/v1/invoices/in_1OPnLdFp1nXP3WhKwtfD7Eob/lines"},"livemode":false,"metadata":{},"next_payment_attempt":null,"number":"2A5EDDA3-0001","on_behalf_of":null,"paid":true,"paid_out_of_band":false,"payment_intent":"pi_3OPnLeFp1nXP3WhK1n9KeEgA","payment_settings":{"default_mandate":null,"payment_method_options":null,"payment_method_types":null},"period_end":1703169341,"period_start":1703169341,"post_payment_credit_notes_amount":0,"pre_payment_credit_notes_amount":0,"quote":null,"receipt_number":null,"rendering":null,"rendering_options":null,"shipping_cost":null,"shipping_details":null,"starting_balance":0,"statement_descriptor":null,"status":"paid","status_transitions":{"finalized_at":1703169341,"marked_uncollectible_at":null,"paid_at":1703169364,"voided_at":null},"subscription":"sub_1OPnLdFp1nXP3WhKf0clVO95","subscription_details":{"metadata":{"invitationId":"847f26d7-5ec9-4ab2-8c71-f9bd050626be","userId":"user_2ZmFBcDxOePMz6IToip8QKDfFa9"}},"subtotal":10000,"subtotal_excluding_tax":10000,"tax":null,"test_clock":null,"total":10000,"total_discount_amounts":[],"total_excluding_tax":10000,"total_tax_amounts":[],"transfer_data":null,"webhooks_delivered_at":1703169343}},"livemode":false,"pending_webhooks":2,"request":{"id":"req_Jq2KzcJcTWokrg","idempotency_key":"4ff4f07d-b1a5-45eb-9821-3ed0bf9c44c3"},"type":"invoice.paid"}
Unhandled event: invoice.payment_succeeded evt_1OPnM1Fp1nXP3WhKGsZKtL9n {"id":"evt_1OPnM1Fp1nXP3WhKGsZKtL9n","object":"event","api_version":"2022-11-15","created":1703169364,"data":{"object":{"id":"in_1OPnLdFp1nXP3WhKwtfD7Eob","object":"invoice","account_country":"US","account_name":"ALPHA MINER PARTNERS LLC","account_tax_ids":null,"amount_due":10000,"amount_paid":10000,"amount_remaining":0,"amount_shipping":0,"application":null,"application_fee_amount":null,"attempt_count":1,"attempted":true,"auto_advance":false,"automatic_tax":{"enabled":false,"status":null},"billing_reason":"subscription_create","charge":"ch_3OPnLeFp1nXP3WhK1UUbrnYb","collection_method":"charge_automatically","created":1703169341,"currency":"usd","custom_fields":null,"customer":"cus_PEFriiibwU41yk","customer_address":{"city":"Milton","country":"US","line1":"52 Cushing Road","line2":"","postal_code":"02186","state":"MA"},"customer_email":"kinsleyd+blah@gmail.com","customer_name":"dan kinsley","customer_phone":null,"customer_shipping":null,"customer_tax_exempt":"none","customer_tax_ids":[],"default_payment_method":null,"default_source":null,"default_tax_rates":[],"description":null,"discount":null,"discounts":[],"due_date":null,"effective_at":1703169341,"ending_balance":0,"footer":null,"from_invoice":null,"hosted_invoice_url":"https://invoice.stripe.com/i/acct_1L1DYmFp1nXP3WhK/test_YWNjdF8xTDFEWW1GcDFuWFAzV2hLLF9QRUZyZk9GODExVTZkTVhzZFB6SVJWdEswT2dBRlhNLDkzNzEwMTY10200H9n9bkrk?s=ap","invoice_pdf":"https://pay.stripe.com/invoice/acct_1L1DYmFp1nXP3WhK/test_YWNjdF8xTDFEWW1GcDFuWFAzV2hLLF9QRUZyZk9GODExVTZkTVhzZFB6SVJWdEswT2dBRlhNLDkzNzEwMTY10200H9n9bkrk/pdf?s=ap","last_finalization_error":null,"latest_revision":null,"lines":{"object":"list","data":[{"id":"il_1OPnLdFp1nXP3WhKnD5CpDtG","object":"line_item","amount":10000,"amount_excluding_tax":10000,"currency":"usd","description":"1 × Cake Membership (at $100.00 / year)","discount_amounts":[],"discountable":true,"discounts":[],"livemode":false,"metadata":{"invitationId":"847f26d7-5ec9-4ab2-8c71-f9bd050626be","userId":"user_2ZmFBcDxOePMz6IToip8QKDfFa9"},"period":{"end":1734791741,"start":1703169341},"plan":{"id":"price_1OMByvFp1nXP3WhKTbP8y1CW","object":"plan","active":true,"aggregate_usage":null,"amount":10000,"amount_decimal":"10000","billing_scheme":"per_unit","created":1702310721,"currency":"usd","interval":"year","interval_count":1,"livemode":false,"metadata":{},"nickname":null,"product":"prod_PAX3LIdmcg7DlL","tiers_mode":null,"transform_usage":null,"trial_period_days":null,"usage_type":"licensed"},"price":{"id":"price_1OMByvFp1nXP3WhKTbP8y1CW","object":"price","active":true,"billing_scheme":"per_unit","created":1702310721,"currency":"usd","custom_unit_amount":null,"livemode":false,"lookup_key":null,"metadata":{},"nickname":null,"product":"prod_PAX3LIdmcg7DlL","recurring":{"aggregate_usage":null,"interval":"year","interval_count":1,"trial_period_days":null,"usage_type":"licensed"},"tax_behavior":"exclusive","tiers_mode":null,"transform_quantity":null,"type":"recurring","unit_amount":10000,"unit_amount_decimal":"10000"},"proration":false,"proration_details":{"credited_items":null},"quantity":1,"subscription":"sub_1OPnLdFp1nXP3WhKf0clVO95","subscription_item":"si_PEFr5E4qHgMBFD","tax_amounts":[],"tax_rates":[],"type":"subscription","unit_amount_excluding_tax":"10000"}],"has_more":false,"total_count":1,"url":"/v1/invoices/in_1OPnLdFp1nXP3WhKwtfD7Eob/lines"},"livemode":false,"metadata":{},"next_payment_attempt":null,"number":"2A5EDDA3-0001","on_behalf_of":null,"paid":true,"paid_out_of_band":false,"payment_intent":"pi_3OPnLeFp1nXP3WhK1n9KeEgA","payment_settings":{"default_mandate":null,"payment_method_options":null,"payment_method_types":null},"period_end":1703169341,"period_start":1703169341,"post_payment_credit_notes_amount":0,"pre_payment_credit_notes_amount":0,"quote":null,"receipt_number":null,"rendering":null,"rendering_options":null,"shipping_cost":null,"shipping_details":null,"starting_balance":0,"statement_descriptor":null,"status":"paid","status_transitions":{"finalized_at":1703169341,"marked_uncollectible_at":null,"paid_at":1703169364,"voided_at":null},"subscription":"sub_1OPnLdFp1nXP3WhKf0clVO95","subscription_details":{"metadata":{"invitationId":"847f26d7-5ec9-4ab2-8c71-f9bd050626be","userId":"user_2ZmFBcDxOePMz6IToip8QKDfFa9"}},"subtotal":10000,"subtotal_excluding_tax":10000,"tax":null,"test_clock":null,"total":10000,"total_discount_amounts":[],"total_excluding_tax":10000,"total_tax_amounts":[],"transfer_data":null,"webhooks_delivered_at":1703169343}},"livemode":false,"pending_webhooks":2,"request":{"id":"req_Jq2KzcJcTWokrg","idempotency_key":"4ff4f07d-b1a5-45eb-9821-3ed0bf9c44c3"},"type":"invoice.payment_succeeded"}

*/
