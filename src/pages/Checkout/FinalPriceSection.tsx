import { useMemo } from "react";
import Paper from "../../components/Assets/Paper";
import { useCart } from "../../store/CartProvider";
import { calcInvicePrice, toLocalString } from "../../utils/numbers";

export default function FinalPriceSection() {
  const { cart, discount } = useCart();

  const cartPrice = calcInvicePrice(cart);

  const subTotalAmount =
    calcInvicePrice(cart) + cart.reduce((c, i) => i.product.postage + c, 0);

  const discountAmount = useMemo(() => {
    if (!discount) return 0;

    return discount.type === "fixed"
      ? cartPrice - discount.value
      : (cartPrice * discount.value) / 100;
  }, [discount, cartPrice]);

  const finalAmount = subTotalAmount - discountAmount;

  return (
    <Paper className="p-4 mt-7">
      <div className="flex items-center justify-end">
        <p className="mb-4 text-hgray-400 ml-3 font-semibold">
          مبلغ قابل پرداخت:
        </p>
        <p className="text-xl font-semibold text-hgray-600">
          {toLocalString(finalAmount)}

          <span className="text-sm text-hgray-350 inline-block pr-2">
            تومان
          </span>
        </p>
      </div>
    </Paper>
  );
}
