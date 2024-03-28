import { cookies } from "next/headers";
import { v4 as uuid } from "uuid";

const CART_COOKIE_NAME = "invitation_cart";
export type CartCookie = {
  id: string;
  code: string;
  email?: string;
};

export function cartExists(): boolean {
  const cookieStore = cookies();
  if (cookieStore.has(CART_COOKIE_NAME)) {
    const cartCookie = cookieStore.get(CART_COOKIE_NAME)!.value;
    return cartCookie.length > 0;
  }
  return false;
}

function getCart(): CartCookie {
  const cookieStore = cookies();
  return JSON.parse(cookieStore.get(CART_COOKIE_NAME)?.value!);
}

export function startCookie(code: string) {
  setCart({
    id: uuid(),
    code,
  });
}

export function setEmail(email: string) {
  const cart = getCart();
  cart.email = email;
  setCart(cart);
}

export function getCartIfAvailable(): CartCookie | undefined {
  return cartExists() ? getCart() : undefined;
}

export function setAccountData() {}

function setCart(cart: CartCookie) {
  const cookieStore = cookies();
  cookieStore.set(CART_COOKIE_NAME, JSON.stringify(cart));
}
