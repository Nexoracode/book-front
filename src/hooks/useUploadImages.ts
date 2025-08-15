import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";
import { toast } from "react-toastify";
import { Media } from "../types";

export type AddOrderVariables = {
  files: File[];
};

export type UploadResponse = {
  message: string;
  data: Media[];
};

export default function useUploadImages() {
  const { mutate, isSuccess, isPending, data, error, reset } = useMutation<
    UploadResponse,
    unknown,
    AddOrderVariables
  >({
    mutationFn: async ({ files }) => {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append(`files`, file);
      });

      const response = await axiosInstance.post<UploadResponse>(
        "/product/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    },

    onSuccess: (response) => {
      toast.success(response.message || "آپلود با موفقیت انجام شد");
    },

    onError: () => {
      toast.error("خطا در آپلود تصاویر");
    },
  });

  return {
    isSuccess,
    isPending,
    data,
    error,
    mutate,
    reset,
  };
}
