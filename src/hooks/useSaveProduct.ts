import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";
import { toast } from "react-toastify";
export type SaveProductDto = {
  name: string;
  description: string;
  price: number;
  postage: number;
  mediaIds: number[];
  stock: number;
  description2: string;
  author: string;
  publisher: string;
  ageGroup: string;
  pages: number;
  template: string;
  coverType: string;
  weight: number;
  isbn: number;
  thumbnail: string | null;
  urlVideo: string | null;
};

export default function useSaveProduct(isEdit: boolean, productId?: number) {
  const { mutate, isPending, isSuccess, data, error, reset } = useMutation({
    mutationFn: async (values: SaveProductDto) => {
      if (isEdit && productId) {
        const res = await axiosInstance.patch(`/product/${productId}`, values);
        return res.data;
      } else {
        const res = await axiosInstance.post(`/product`, values);
        return res.data;
      }
    },
    onSuccess: () => {
      toast.success(
        isEdit ? "محصول با موفقیت ویرایش شد" : "محصول با موفقیت ایجاد شد"
      );
    },
    onError: () => {
      toast.error("خطا در ذخیره محصول");
    },
  });

  return {
    mutate,
    isPending,
    isSuccess,
    data,
    error,
    reset,
  };
}
