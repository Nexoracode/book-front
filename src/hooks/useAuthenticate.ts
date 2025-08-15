import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export type AdminLoginVariables = {
  phone: string;
  password: string;
};
export default function useAuthenticate() {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["Authenticate"],
    queryFn: async () => {
      const response = await axiosInstance.post("auth/authenticate");
      return response.data.data.employee;
    },
  });
  return {
    data,
    isPending,
    isSuccess,
  };
}
