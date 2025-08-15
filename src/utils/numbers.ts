import { CartItem } from "../types";

export const toLocalString = (num: number) => {
  const format = new Intl.NumberFormat("fa-IR");
  return format.format(num);
};

export const calcInvicePrice = (cart: Array<CartItem>) => {
  return cart.reduce((c, i) => {
    const price = i.product.discount ?? i.product.price;
    return c + i.quantity * price;
  }, 0);
};
