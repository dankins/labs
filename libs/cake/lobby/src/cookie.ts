import { cookies } from "next/headers";

export const CART_COOKIE_NAME = "invitation_cart";
export type CartCookie = {
  code: string;
  selectedBrands: string[];
  totalValue: number;
  stripeCustomerId?: string;
  email?: string;
};

export function cartExists(): boolean {
  const cookieStore = cookies();
  return cookieStore.has(CART_COOKIE_NAME);
}

export function getCart(): CartCookie {
  const cookieStore = cookies();
  return JSON.parse(cookieStore.get(CART_COOKIE_NAME)?.value!);
}

export function startCookie(code: string) {
  setCart({
    code,
    selectedBrands: [],
    totalValue: 0,
  });
}

export function setEmail(email: string) {
  const cart = getCart();
  cart.email = email;
  setCart(cart);
}

function setCart(cart: CartCookie) {
  const cookieStore = cookies();
  cookieStore.set(CART_COOKIE_NAME, JSON.stringify(cart));
}

export function getCartIfAvailable(): CartCookie | undefined {
  return cartExists() ? getCart() : undefined;
}
