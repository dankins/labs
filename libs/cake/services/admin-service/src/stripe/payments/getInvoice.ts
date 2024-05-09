import Stripe from "stripe";
const stripe = new Stripe(process.env["STRIPE_SECRET_KEY"]!);

export async function getInvoice(invoiceId: string) {
  const invoice = await stripe.invoices.retrieve(invoiceId);
  return invoice;
}
