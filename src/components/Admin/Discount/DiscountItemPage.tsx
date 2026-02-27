import { useParams } from "react-router-dom";
import useUpdateDiscount from "../../../hooks/discount/useUpdateDiscount";
import Paper from "../../Assets/Paper";
import DiscountForm from "./DiscountForm";
import useGetDiscount from "../../../hooks/discount/useGetDiscount";
import LayoutLoading from "../../Assets/LayoutLoading";

type Props = {};

export default function DiscountItemPage({}: Props) {
  const { id = null } = useParams();
  const { discount, isPending } = useGetDiscount({ discountId: Number(id) });

  const { mutateAsync } = useUpdateDiscount();
  const handleSubmit = (values: any) => {
    mutateAsync(values);
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
