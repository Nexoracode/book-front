import { useEffect } from "react";
import Paper from "../Assets/Paper";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import TextField from "../Form/TextField";
import PriceField from "../Form/PriceField";
import Button from "../Assets/Button";
import ProductImageUploader from "../Form/ImageUpload/ProductImageUploader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ExpandLeft } from "../Icons/ExpandLeft";
import useGetProduct from "../../hooks/useGetProduct";
import IconLoading from "../Icons/IconLoading";
import useSaveProduct, { SaveProductDto } from "../../hooks/useSaveProduct";
import { toast } from "react-toastify";

type Props = {};

export default function AdminProductPage({}: Props) {
  const { id } = useParams();
  const { product, isPending } = useGetProduct({
    id: Number(id),
    enabled: id !== "new",
  });

  const navigate = useNavigate();

  const {
    mutate,
    isPending: submitPending,
    isSuccess,
  } = useSaveProduct(id !== "new", Number(id));
  const handleSubmit = (values: FieldValues) => {
    const submitData = {
      ...values,
      price: Number(values.price),
      discount: values.discount ? Number(values.discount) : null,
      isbn: Number(values.isbn),
      postage: Number(values.postage),
      mediaIds: values.mediaIds ?? product?.media.map((i) => i.id) ?? [],
      thumbnail:
        values.thumbnail_url && values.thumbnail_url?.length > 0
          ? values.thumbnail_url?.[0]
          : product?.thumbnail,
    };

    mutate({ ...(submitData as unknown as SaveProductDto) });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("ذخیره اطلاعات با موفقیت انجام شد.");
      navigate("/admin-dashboard/products");
    }
  }, [isSuccess]);
  const form = useForm({
    values: { ...product },
    defaultValues: { ...product },
  });
  return (
    <Paper className="max-w-6xl overflow-hidden relative mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-center font-semibold text-xl pt-3 pb-8">
          {id === "new" ? "افزودن" : "ویرایش"} محصول
        </h2>

        <Link className="btn  btn-ghost" to={"/admin-dashboard/products"}>
          بازگشت به محصولات <ExpandLeft width={24} height={24} />
        </Link>
      </div>
      {isPending && id !== "new" ? (
        <div className="absolute bg-black/40 text-white pt-[20vh] flex flex-col items-center  z-[9999] top-0 right-0 w-full h-full">
          <IconLoading width={38} height={38} />
          <p className="text-2xl mt-2">در حال دریافت اطلاعات</p>
        </div>
      ) : null}
      {submitPending ? (
        <div className="absolute bg-black/40 text-white pt-[20vh] flex flex-col items-center  z-[9999] top-0 right-0 w-full h-full">
          <IconLoading width={38} height={38} />
          <p className="text-2xl mt-2"> در حال ذخیره سازی اطلاعات </p>
        </div>
      ) : null}
      <div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex gap-4 flex-wrap">
              <div className="w-full lg:w-[calc(50%-8px)]">
                <TextField row={false} name="name" required label="نام کتاب" />
              </div>
              <div className="w-full lg:w-[calc(50%-8px)]">
                <TextField row={false} name="author" required label="نویسنده" />
              </div>
              <div className="w-full lg:w-[calc(50%-8px)]">
                <PriceField name="price" required label="قیمت" />
              </div>
              <div className="w-full lg:w-[calc(50%-8px)]">
                <PriceField name="discount" label="تخفیف" />
              </div>
              <div className="w-full lg:w-[calc(50%-8px)]">
                <PriceField name="postage" required label="هزینه ارسال" />
              </div>
              <div className="w-full lg:w-[calc(50%-8px)]">
                <TextField
                  row={false}
                  name="stock"
                  required
                  type="number"
                  label="تعداد موجودی"
                />
              </div>
              <div className="w-full lg:w-[calc(50%-8px)]">
                <TextField
                  row={false}
                  name="weight"
                  required
                  type="number"
                  label="وزن کتاب"
                />
              </div>
              <div className="w-full lg:w-[calc(50%-8px)]">
                <TextField
                  row={false}
                  name="isbn"
                  type="number"
                  required
                  label="شابک"
                />
              </div>
              <div className="w-full lg:w-[calc(50%-8px)]">
                <TextField
                  row={false}
                  name="coverType"
                  required
                  label="نوع جلد"
                />
              </div>
              <div className="w-full lg:w-[calc(50%-8px)]">
                <TextField row={false} name="template" required label="قالب" />
              </div>
              <div className="w-full lg:w-[calc(50%-8px)]">
                <TextField
                  row={false}
                  name="pages"
                  required
                  type="number"
                  label="تعداد صفحه"
                />
              </div>
              <div className="w-full lg:w-[calc(50%-8px)]">
                <TextField
                  row={false}
                  name="ageGroup"
                  required
                  label="رده سنی"
                />
              </div>
              <div className="w-full lg:w-[calc(50%-8px)]">
                <TextField row={false} name="publisher" required label="ناشر" />
              </div>
              <div className="w-full lg:w-[calc(50%-8px)]">
                <TextField row={false} name="urlVideo" label="لینک ویدیو" />
              </div>
              <div className="w-full lg:w-[calc(50%-8px)]">
                <ProductImageUploader
                  exportType="url"
                  name="thumbnail_url"
                  label="پوستر ویدیو"
                  singleUrl={product?.thumbnail}
                />
              </div>
              <div className="w-full">
                <TextField
                  row={false}
                  multiple
                  name="description"
                  label="توضیحات کوتاه"
                />
              </div>
              <div className="w-full">
                <TextField
                  row={false}
                  multiple
                  name="description2"
                  label="توضیحات"
                />
              </div>
              <div className="w-full">
                <ProductImageUploader
                  multiple
                  name="mediaIds"
                  label="تصاویر محصول"
                  existingImages={product?.media ?? []}
                />
              </div>
              <div className="w-full">
                <Button type="submit">
                  {id === "new" ? "افزودن" : "ویرایش"} محصول
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </Paper>
  );
}
