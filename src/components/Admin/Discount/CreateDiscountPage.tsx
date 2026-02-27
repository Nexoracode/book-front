import useCreateDiscount from "../../../hooks/discount/useCreateDiscount";
import Paper from "../../Assets/Paper";
import DiscountForm from "./DiscountForm";
import { useNavigate } from "react-router-dom";

export default function CreateDiscountPage() {
  const { isPending, mutateAsync } = useCreateDiscount();
  const navigate = useNavigate();

  const handleSubmit = (values: any) => {
    const { code, expiresAt, maxUses, type, value_percentage, value_fixed } =
      values;
    mutateAsync(
      {
        value:
          type === "fixed" ? Number(value_fixed) : Number(value_percentage),
        code,
        expiresAt,
        maxUses,
        type,
      },
      {
        onSuccess() {
          navigate("/admin-dashboard/discounts");
        },
      },
    );
  };
  return (
    <div>
      <Paper className="max-w-4xl w-full mx-auto">
        <h2 className="text-center font-semibold text-xl pt-3 pb-8">
          کد تخفیف
        </h2>

        <DiscountForm
          mode="add"
          isPending={isPending}
          handleSubmit={handleSubmit}
        />
      </Paper>
    </div>
  );
}
