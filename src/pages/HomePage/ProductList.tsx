import React from "react";
import useGetProducts from "../../hooks/useGetProducts";
import { Link } from "react-router-dom";
import { toLocalString } from "../../utils/numbers";

type Props = {};

export default function ProductList({}: Props) {
  const { products, isPending } = useGetProducts();
  return (
    <div className="mt-5">
      <div className="relative pr-9">
        <span className="absolute w-5 h-5 rounded-md right-0 border-3 border-primary-800"></span>
        <span className="absolute w-5 h-5 rounded-md -right-2 -top-2 border-3 border-primary-800/30"></span>

        <h2 className="text-2xl w-auto inline-block font-semibold text-primary-800 pb-1 mb-4">
          جدیدترین کتاب ها
        </h2>
      </div>
      <div className="flex flex-wrap">
        {isPending && <CartSkeleton />}
        {products?.data.map((item) => {
          return (
            <Link
              className="block w-full lg:w-[20%] p-2"
              to={`/b/book-${item.id}`}
            >
              <div key={item.id} className="card p-1 bg-base-100 shadow-sm">
                <figure>
                  <img
                    className="h-[330px] w-full"
                    src={
                      item.media.length > 0
                        ? item.media[0].url
                        : "/No-Image.png"
                    }
                    alt={item.name}
                  />
                </figure>
                <div className="card-body px-1 py-2">
                  <h2 className="card-title">{item.name}</h2>
                  <p>{item.description}</p>
                  <div className="flex justify-between gap-1.5 items-start">
                    {item.discount ? (
                      <p className="text-rose-600 flex-0 inline-block line-through">
                        {toLocalString(+item.price)}
                      </p>
                    ) : null}
                    <p className="text-green-700">
                      <span className="text-lg font-semibold">
                        {toLocalString(item.discount ?? item.price)}
                      </span>
                      <span className="font-light pr-1 text-neutral-400">
                        تومان
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function CartSkeleton({ count = 1 }: { count?: number }) {
  return (
    <React.Fragment>
      {[...Array(count).keys()].map((i) => (
        <div key={i} className="flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ))}
    </React.Fragment>
  );
}
