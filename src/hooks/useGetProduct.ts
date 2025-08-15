import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";
import { Product } from "../types";

export default function useGetProduct({
  id,
  enabled = true,
}: {
  id: number | string;
  enabled?: boolean;
}) {
  const {
    data: product,
    isPending,
    refetch,
  } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get(`/product/${id}`);

        return data;
      } catch (error) {}
    },
    enabled,
  });

  return {
    isPending,
    product,
    refetch,
  };
}
