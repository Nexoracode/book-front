import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";
import { Paginate, Product } from "../types";

export default function useGetProducts() {
  const { data: products, isPending } = useQuery<Paginate<Product>>({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get("/product");
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  });

  return {
    isPending,
    products,
  };
}
