import { useCart } from "../../store/CartProvider";
import { Product } from "../../types";
import Button from "../Assets/Button";
import { BaselineMinus } from "../Icons/BaselineMinus";
import { PlusOutline } from "../Icons/PlusOutline";

export default function AddToCartBtn({ product }: { product: Product }) {
  const { cart, handleAddToCart } = useCart();

  const { quantity } = cart.find((i) => i.product.id === product.id) ?? {
    quantity: 0,
  };
  const addToCart = (qty: number) => {
    handleAddToCart({ product, quantity: qty });
  };
  return (
    <div>
      {quantity === 0 ? (
        <Button
          disabled={product.stock <= 0}
          fullWidth
          onClick={() => product.stock > 0 && addToCart(quantity + 1)}
          color={product.stock <= 0 ? "error" : "green"}
          className="min-w-[200px]"
        >
          {product.stock <= 0 ? "اتمام موجودی" : "افزودن به سبد خرید"}
        </Button>
      ) : (
        <div className="w-full min-w-[150px] bg-green-500 rounded-md p-2 flex justify-between">
          <button
            disabled={quantity >= product.stock}
            className="cursor-pointer"
            onClick={() => quantity <= product.stock && addToCart(quantity + 1)}
          >
            <PlusOutline className="text-white" width={24} height={24} />
          </button>
          <span>{quantity}</span>
          <button
            className="cursor-pointer"
            disabled={quantity === 0}
            onClick={() => quantity > 0 && addToCart(quantity - 1)}
          >
            <BaselineMinus className="text-rose-500" width={24} height={24} />
          </button>
        </div>
      )}
    </div>
  );
}
