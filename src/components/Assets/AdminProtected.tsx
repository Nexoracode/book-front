import { PropsWithChildren, useEffect } from "react";
import { useCart } from "../../store/CartProvider";
import { Navigate } from "react-router-dom";
import useAuthenticate from "../../hooks/useAuthenticate";
import IconLoading from "../Icons/IconLoading";

export default function AdminProtected({ children }: PropsWithChildren) {
  const { isSuccess, isPending, data } = useAuthenticate();
  const { setUser } = useCart();
  useEffect(() => {
    if (isSuccess) setUser(data);
  }, [isSuccess]);
  return isPending ? (
    <div className="h-[500px] flex flex-col items-center justify-center">
      <IconLoading width={24} height={24} />
      <p>در حال ورود به سیستم</p>
    </div>
  ) : data ? (
    children
  ) : (
    <Navigate to={"/"} />
  );
}
