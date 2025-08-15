import { Product } from "../../types";
import { toLocalString } from "../../utils/numbers";
import AddToCartBtn from "./AddToCartBtn";

export default function PriceInfo({
  product,
  text,
}: {
  product: Product;
  text?: string;
}) {
  return (
    <div className="flex flex-col lg:flex-row justify-between">
      {product ? (
        product.stock < 1 ? (
          <div>
            <p className="text-red-400 font-semibold">
              موجودی این محصول به اتمام رسید
            </p>
          </div>
        ) : (
          <div>
            <p>قیمت:</p>
            <div className="flex gap-1.5 my-3 flex-col items-start">
              <p className="text-green-700 text-sm">{text}</p>
              {product?.discount ? (
                <p className="text-rose-600 line-through">
                  {toLocalString(product.price)}
                </p>
              ) : null}
              {product.discount ? (
                <span className="bg-red-600 p-1 rounded-md leading-tight inline-block">
                  %
                  {Math.ceil(
                    ((product.price - product.discount) / product.price) * 100
                  )}
                </span>
              ) : null}
              <p className="text-green-700">
                <span className="text-lg font-semibold">
                  {toLocalString(product.discount ?? product.price)}
                </span>
                <span className="font-light pr-2 text-neutral-400">تومان</span>
              </p>
            </div>
          </div>
        )
      ) : null}
      <AddToCartBtn product={product} />
    </div>
  );
}
