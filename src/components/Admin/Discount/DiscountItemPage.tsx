import { useNavigate, useParams } from "react-router-dom";
import useUpdateDiscount from "../../../hooks/discount/useUpdateDiscount";
import Paper from "../../Assets/Paper";
import DiscountForm from "./DiscountForm";
import useGetDiscount from "../../../hooks/discount/useGetDiscount";
import LayoutLoading from "../../Assets/LayoutLoading";

type Props = {};

export default function DiscountItemPage({}: Props) {
  const { id = null } = useParams();
  const { discount, isPending } = useGetDiscount({ discountId: Number(id) });
  const navigate = useNavigate();
  const { mutateAsync } = useUpdateDiscount();
  const handleSubmit = (values: any) => {
    const { code, expiresAt, maxUses, type, value_percentage, value_fixed } =
      values;
    if (discount)
      mutateAsync(
        {
          value:
            type === "fixed" ? Number(value_fixed) : Number(value_percentage),
          code,
          expiresAt,
          maxUses,
          type,
          id: discount?.id,
        },
        {
          onSuccess() {
            navigate("/admin-dashboard/discounts");
          },
        },
      );
  };

  console.log({ discount });

  if (isPending) return <LayoutLoading />;
  return (
    <div>
      <Paper className="max-w-6xl mx-auto">
        <h2 className="text-center font-semibold text-xl pt-3 pb-8">
          ویرایش کد تخفیف
        </h2>

        <DiscountForm
          mode="edit"
          values={discount}
          isPending={isPending}
          handleSubmit={handleSubmit}
        />
      </Paper>
    </div>
  );
}
