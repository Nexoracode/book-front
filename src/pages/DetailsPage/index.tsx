import { useParams } from "react-router-dom";
import ContainerLayout from "../../components/Assets/ContainerLayout";
import CartSummery from "../../components/DetailPage/CartSummery";
import Description from "../../components/DetailPage/Description";
import ImageGallery from "../../components/DetailPage/ImageGallery";
import PriceInfo from "../../components/DetailPage/PriceInfo";
import Specs from "../../components/DetailPage/Specs";
import Video from "../../components/DetailPage/Video";
import useGetProduct from "../../hooks/useGetProduct";
import IconLoading from "../../components/Icons/IconLoading";

export default function DetailsPage() {
  const { slug } = useParams();
  const id = slug?.split("-")[1];
  if (!id) return null;
  const { product, isPending } = useGetProduct({ id });
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
            {product.urlVideo ? (
              <Video poster={product.thumbnail} url={product.urlVideo} />
            ) : null}
            <div className="flex flex-col lg:flex-row">
              <div>
                <ImageGallery images={product.media} />
              </div>
              <div className="p-3 flex flex-col gap-2 flex-1">
                <h1 className="font-semibold text-gray-800 text-xl">
                  {product?.name}
                </h1>

                <p className="text-neutral-500">{product?.description}</p>

                <p className="flex text-gray-800 font-medium justify-between lg:max-w-[300px]">
                  نویسنده:{" "}
                  <span className="text-gray-600 font-light text-sm">
                    {product.author}
                  </span>
                </p>
                <p className="flex text-gray-800 font-medium justify-between lg:max-w-[300px]">
                  ناشر:{" "}
                  <span className="text-gray-600 font-light text-sm">
                    {product.publisher}
                  </span>
                </p>

                <PriceInfo product={product} />

                <div className="block lg:hidden">
                  <CartSummery product={product} />
                </div>

                <Specs
                  bookItems={[
                    { label: "رده سنی", value: "عمومی" },
                    {
                      label: "صفحات",
                      value: String(product.pages),
                    },
                    {
                      label: "قالب",
                      value: product.template,
                    },
                    {
                      label: "وزن",
                      value: `${product.weight} گرم`,
                    },
                    {
                      label: "نوع جلد",
                      value: product.coverType,
                    },
                    {
                      label: "شابک",
                      value: product.isbn,
                    },
                  ]}
                />
              </div>
            </div>
            <Description description={product.description2} />
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
