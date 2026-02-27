import { useState } from "react";
import Paper from "../../components/Assets/Paper";
import TextInput from "../../components/Form/TextField/TextInput";
import useApplyDiscountCode from "../../hooks/discount/useApplyDiscountCode";
import { useFormContext } from "react-hook-form";
import { useCart } from "../../store/CartProvider";
import IconCheck from "../../components/Icons/IconCheck";

type Props = {};

export default function DiscountSection({}: Props) {
  const [code, setCode] = useState<string>("");
  const { setDiscount } = useCart();
  const { mutateAsync, isPending, isSuccess } = useApplyDiscountCode();
  const { watch, setValue } = useFormContext();

  const phone = watch("phone");

  const handleApply = () => {
    mutateAsync(
      { code, phone },
      {
        onSuccess: (data) => {
          setDiscount(data);
          setValue("discountCode", code);
        },
      },
    );
  };
  return (
    <Paper className="p-4 mt-7">
      <h3 className="mb-4 text-hgray-400 font-semibold">ورود کد تخفیف</h3>
      <div className="flex items-center gap-2">
        <TextInput
          disabled={!phone}
          placeholder="A123"
          className="w-full max-w-lg"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          disabled={isPending || !code || !phone}
          onClick={handleApply}
          type="button"
          className="btn btn-outline rounded-xl border-gray-300 border-2"
        >
          اعمال کد
        </button>
      </div>
      {isSuccess ? (
        <div role="alert" className="alert mt-2 p-2 alert-success">
          <IconCheck />
          کد تخفیف با موفقیت برای شما اعمال شد.
        </div>
      ) : null}
    </Paper>
  );
}
