import ContainerLayout from "../../components/Assets/ContainerLayout";
import CartSummery from "../../components/DetailPage/CartSummery";
import PriceInfo from "../../components/DetailPage/PriceInfo";
import Specs from "../../components/DetailPage/Specs";
import IconLoading from "../../components/Icons/IconLoading";
import useGetProduct from "../../hooks/useGetProduct";
import ImageGallery from "./ImageGallery";

type Props = {};

export default function KoolehBook({}: Props) {
  const { product, isPending } = useGetProduct({ id: 2 });
  return (
    <ContainerLayout>
      {isPending ? (
        <div className="w-full h-[560px] flex justify-center items-center flex-col">
          <span>
            <IconLoading width={48} height={48} className="text-primary-100" />
          </span>
          <p className="text-xl font-light text-primary-100 mt-3">
            در حال دریافت{" "}
          </p>
        </div>
      ) : product ? (
        <div className="mt-14 flex flex-col lg:flex-row">
          <div className="flex-1 md:pl-8">
            <div className="flex flex-col  py-14 lg:flex-row">
              <div>
                <ImageGallery />
              </div>
              <div className="p-3 flex flex-col gap-2 flex-1">
                <h1 className="font-semibold text-gray-800 text-xl">
                  کتاب کوله مهدیار
                </h1>

                <p className="text-neutral-500">
                  هر چیزی که نیاز داری، اینجا هست
                </p>

                <p className="flex text-gray-800 font-medium justify-between lg:max-w-[300px]">
                  نویسنده:{" "}
                  <span className="text-gray-600 font-light text-sm">
                    سید کاظم روح‌بخش
                  </span>
                </p>
                <p className="flex text-gray-800 font-medium justify-between lg:max-w-[300px]">
                  ناشر:{" "}
                  <span className="text-gray-600 font-light text-sm">
                    واژه پرداز اندیشه
                  </span>
                </p>

                <PriceInfo product={product} text="تاریخ انتشار 11 خرداد" />

                <div className="block lg:hidden">
                  <CartSummery product={product} />
                </div>

                <Specs
                  bookItems={[
                    {
                      label: "رده سنی",
                      value: "عمومی",
                    },
                    {
                      label: "صفحات",
                      value: "400",
                    },
                    {
                      label: "قالب",
                      value: "داستان",
                    },
                    {
                      label: "وزن",
                      value: "۲۱۰ گرم",
                    },
                    {
                      label: "تعداد کلیپ",
                      value: "1700",
                    },
                    {
                      label: "مدت زمان کلیپ ها",
                      value: "209 ساعت",
                    },
                  ]}
                />
              </div>
            </div>
            {/*    <Description />

            <div className="my-20" />

            <BookSections />

            <div className="my-20" />
            <Support />

            <div className="my-20" />
            <Questions />

            <div className="my-20" /> */}
          </div>

          <div className="w-[300px] relative hidden lg:block">
            <div className="fixed w-[300px]">
              <CartSummery product={product} />
            </div>
          </div>
        </div>
      ) : null}
    </ContainerLayout>
  );
}
