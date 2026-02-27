import { useMemo } from "react";
import { calcInvicePrice, toLocalString } from "../../utils/numbers";
import Paper from "../../components/Assets/Paper";
import { useCart } from "../../store/CartProvider";

type Props = {};

export default function OrderSummerySection({}: Props) {
  const { cart, discount } = useCart();

  console.log({ discount });

  const cartPrice = calcInvicePrice(cart);
  const discountAmount = useMemo(() => {
    if (!discount) return 0;

    return discount.type === "fixed"
      ? cartPrice - discount.value
      : (cartPrice * discount.value) / 100;
  }, [discount, cartPrice]);
  return (
    <Paper className="p-4 mt-7">
      <div className="flex justify-between">
        <p className="mb-4 text-hgray-400 font-semibold">جمع فاکتور</p>
        <p className="text-lg font-semibold text-hgray-600">
          {toLocalString(cartPrice)}
          <span className="text-sm text-hgray-350 pr-2">تومان</span>
        </p>
      </div>
      <div className="flex justify-between pt-3">
        <p className="mb-4 text-hgray-400 font-semibold">هزینه حمل</p>
        <p className="text-lg font-semibold text-hgray-600">
          {toLocalString(cart.reduce((c, i) => i.product.postage + c, 0))}
          <span className="text-sm text-hgray-350 pr-2">تومان</span>
        </p>
      </div>
      {discountAmount > 0 ? (
        <div className="flex justify-between pt-3">
          <p className="mb-4 text-hgray-400 font-semibold">تخفیف</p>
          <p className="text-lg font-semibold text-hgray-600">
            {toLocalString(discountAmount)}
            <span className="text-sm text-hgray-350 pr-2">تومان</span>
          </p>
        </div>
      ) : null}
    </Paper>
  );
}
