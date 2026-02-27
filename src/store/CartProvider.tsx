import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { CartItem, DiscountType, User } from "../types";

export const CartContext = createContext<{
  handleAddToCart: (item: CartItem) => void;
  handleClearCart: () => void;
  user: User | null;
  setUser: (user: User) => void;
  cart: Array<CartItem>;
  setCart: (cart: Array<CartItem>) => void;
  discount: {
    value: number;
    type: DiscountType;
  } | null;
  setDiscount: (
    discount: {
      value: number;
      type: DiscountType;
    } | null,
  ) => void;
}>({
  handleAddToCart: () => {},
  handleClearCart: () => {},
  cart: [],
  setCart: () => {},
  user: null,
  setUser: () => {},
  discount: null,
  setDiscount: () => {},
});

export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<Array<CartItem>>([]);
  const [discount, setDiscount] = useState<{
    type: DiscountType;
    value: number;
  } | null>(null);

  const handleAddToCart = (item: CartItem) => {
    const newCart = item.quantity === 0 ? [] : [item];
    setCart(newCart);

    //if (item.quantity === 0) localStorage.removeItem("cart");
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };
  useEffect(() => {
    const cartJson = localStorage.getItem("cart");
    let cartData: CartItem[] = [];
    if (cartJson) {
      cartData = JSON.parse(cartJson);
    }

    if (typeof cartData !== "object") {
      cartData = [];
      localStorage.removeItem;
    }

    setCart(cartData);
  }, []);
  return (
    <CartContext.Provider
      value={{
        handleAddToCart,
        handleClearCart,
        user,
        setUser,
        cart,
        setCart,
        discount,
        setDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
