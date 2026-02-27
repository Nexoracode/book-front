import IconAlertCircleOutline from "../../Icons/IconAlertCircleOutline";
import IconLoading from "../../Icons/IconLoading";

type Props = {
  open: boolean;
  onCancell: () => void;
  onApprove: () => void;
  loading: boolean;
};

export default function DeleteDiscountDialog({
  open,
  loading,
  onApprove,
  onCancell,
}: Props) {
  return (
    <div>
      <input
        checked={open}
        type="checkbox"
        id="my_modal_6"
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <div className="flex gap-4 flex-col items-center">
            {loading ? (
              <>
                <IconLoading width={36} height={36} />
                <div className="animate-pulse">در حال حذف کد تخفیف</div>
              </>
            ) : (
              <>
                <IconAlertCircleOutline
                  className="text-error"
                  width={64}
                  height={64}
                />
                <div className="text-error font-semibold">
                  از حذف این کد تخفیف مطمئن هستید
                </div>
                <div className="text-sm text-neutral">
                  با انجام حذف اطلاعات غیر قابل بازگشت می باشد.
                </div>
                <div className="flex gap-3 w-full">
                  <button
                    onClick={onApprove}
                    className="btn  btn-soft flex-1 btn-error"
                  >
                    حذف شود
                  </button>
                  <button
                    onClick={onCancell}
                    className="btn flex-1 btn-soft btn-neutral"
                  >
                    انصراف
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
