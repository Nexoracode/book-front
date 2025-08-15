import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";
import { toast } from "react-toastify";
import { useCart } from "../store/CartProvider";
import { useNavigate } from "react-router-dom";

export type AdminLoginVariables = {
  phone: string;
  password: string;
};
export default function useAdminLogin() {
  const { setUser } = useCart();
  const navigate = useNavigate();
  const { mutate, data, isPending, isSuccess } = useMutation({
    mutationFn: async (variables: AdminLoginVariables) => {
      try {
        const response = await axiosInstance.post("auth/login", {
          ...variables,
        });
        return response.data.data.employee;
      } catch (error: any) {
        if (error.response.data.message)
          toast.error(error.response.data.message);
        else toast.error("خطا در ارتباط با سرور");
      }
    },

    onSuccess: (data) => {
      if (data) {
        setUser(data);
        setTimeout(() => navigate("/admin-dashboard"), 20);
      }
    },
  });
  return {
    data,
    isPending,
    mutate,
    isSuccess,
  };
}
