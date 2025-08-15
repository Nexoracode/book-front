import { useCart } from "../../store/CartProvider";
import { Product } from "../../types";
import { toLocalString } from "../../utils/numbers";
import Button from "../Assets/Button";
import Paper from "../Assets/Paper";

export default function CartSummery({ product }: { product: Product }) {
  const { cart } = useCart();
  const cartItem = cart?.find((item) => item.product.id === product.id) ?? {
    quantity: 0,
  };
  return (
    <Paper>
      {cartItem?.quantity === 0 ? (
        <div className="flex items-center justify-center">
          <img src="/empty-cart.png" className="opacity-65" />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="flex justify-between py-1">
            <span className="text-neutral-500">تعداد درخواستی:</span>
            <span className="text-lg font-semibold text-zinc-800">
              {cartItem?.quantity ?? 0}
            </span>
          </p>
          <p className="flex justify-between py-1">
            <span className="inline-block flex-1 text-neutral-500">
              قیمت واحد:
            </span>
            <span className="text-lg font-semibold text-zinc-800">
              {toLocalString(product?.discount ?? product?.price ?? 0)}
            </span>
            <span className="font-light  text-neutral-400 text-sm mr-2">
              تومان
            </span>
          </p>

          <div className="h-[1px] bg-neutral-300"></div>

          <p className="flex justify-between py-2">
            <span className="inline-block flex-1 text-neutral-500">
              مبلغ نهایی:
            </span>
            <span className="text-lg font-semibold text-zinc-800">
              {toLocalString(
                (product?.discount ?? product?.price ?? 0) *
                  (cartItem?.quantity ?? 0)
              )}
              <span className="font-light text-green-950 text-sm mr-2">
                تومان
              </span>
            </span>
          </p>

          <div className="w-full">
            <Button
              className="block text-center hover:bg-green-300"
              fullWidth
              color="green"
              outlined
              href="/checkout"
            >
              تکمیل فرایند خرید
            </Button>
          </div>
        </div>
      )}
    </Paper>
  );
}
