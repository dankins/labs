import { cookies } from "next/headers";
import { v4 as uuid } from "uuid";

const CART_COOKIE_NAME = "invitation_cart";
export type CartCookie = {
  id: string;
  accessCode: string;
  sponsor: string;
  code: string;
  email?: string;
  firstName?: string;
  lastName?: string;
};

export function cartExists(): boolean {
  const cookieStore = cookies();
  if (cookieStore.has(CART_COOKIE_NAME)) {
    const cartCookie = cookieStore.get(CART_COOKIE_NAME)!.value;
    return cartCookie.length > 0;
  }
  return false;
}

export function getCart(): CartCookie {
  try {
    const cookieStore = cookies();
    return JSON.parse(cookieStore.get(CART_COOKIE_NAME)?.value!);
  } catch (err) {
    throw new Error("Invalid cart");
  }
}

export function startCookie(code: string, accessCode: string, sponsor: string) {
  setCart({
    id: uuid(),
    code,
    accessCode,
    sponsor,
  });
}

export function cookieSetName(
  email: string,
  firstName: string,
  lastName: string
) {
  const cart = getCart();
  cart.email = email;
  cart.firstName = firstName;
  cart.lastName = lastName;
  setCart(cart);
}

export function getCartIfAvailable(): CartCookie | undefined {
  return cartExists() ? getCart() : undefined;
}

export function setAccountData() {}

function setCart(cart: CartCookie) {
  const cookieStore = cookies();
  cookieStore.set(CART_COOKIE_NAME, JSON.stringify(cart), { httpOnly: true });
}
export function deleteCookie() {
  const cookieStore = cookies();
  cookieStore.delete(CART_COOKIE_NAME);
}
