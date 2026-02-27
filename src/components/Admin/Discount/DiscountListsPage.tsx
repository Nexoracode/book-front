import Paper from "../../Assets/Paper";
import { Link } from "react-router-dom";
import { IconAddSolid } from "../../Icons/IconAddSolid";
import Table from "../../Assets/Table";
import useDiscountList from "../../../hooks/discount/useDiscountList";
import { EditOutlineIcon } from "../../Icons/EditOutlineIcon";
import { toLocalDate } from "../../../utils/utiles";
import IconInactive from "../../Icons/IconInactive";
import { discountType } from "../../../utils/translate";
import { toLocalString } from "../../../utils/numbers";
import useToggleDiscount from "../../../hooks/discount/useToggleDiscount";
import { Discount } from "../../../types";
import IconCheck from "../../Icons/IconCheck";
import IconLoading from "../../Icons/IconLoading";
import { TrashIcon } from "../../Icons/TrashIcon";
import useDeleteDiscount from "../../../hooks/discount/useDeleteDiscount";
import DeleteDiscountDialog from "./DeleteDiscountDialog";
import { useState } from "react";

type Props = {};

const headers = [
  {
    label: "ردیف",
    key: "rowId",
  },
  {
    label: "کد تخفیف",
    key: "code",
  },

  {
    label: "نوع",
    key: "type",
  },
  {
    label: "مقدار",
    key: "value",
  },
  {
    label: "محدودیت استفاده",
    key: "maxUses",
  },
  {
    label: "تعداد استفاده",
    key: "usedCount",
  },
  {
    label: "وضعیت",
    key: "isActive",
  },
  {
    label: "زمان انتقضا",
    key: "expiresAt",
  },
  {
    label: "زمان ایجاد",
    key: "createdAt",
  },
  {
    label: "زمان ویرایش",
    key: "updatedAt",
  },
  {
    label: "عملیات",
    key: "actions",
  },
];

export default function DiscountListsPage({}: Props) {
  const [deleteItem, setDeleteItem] = useState<Discount | null>(null);
  const { discounts = [] } = useDiscountList();
  const { toggleDiscount, variables, isPending } = useToggleDiscount();
  const { deleteDiscount, isPending: deletePending } = useDeleteDiscount();

  const handleToggleDiscount = (discount: Discount) => {
    toggleDiscount({
      discountId: discount.id,
      newActiveStatus: !discount.isActive,
    });
  };

  const handleDelete = () => {
    if (deleteItem) {
      deleteDiscount(
        { id: deleteItem.id },
        { onSuccess: () => setDeleteItem(null) },
      );
    }
  };
  return (
    <div className="w-full max-w-7xl mx-auto">
      <Paper>
        <div className="flex justify-end border-b border-gray-400 p-2">
          <Link
            to={"/admin-dashboard/discounts/new"}
            className="btn btn-primary"
          >
            <IconAddSolid width={18} height={18} />
            افزودن کد تخفیف
          </Link>
        </div>
        <Table
          headers={headers}
          data={
            discounts.map((item, index) => ({
              rowId: index + 1,
              id: item.id,
              code: <span className="font-semibold">{item.code}</span>,
              type: <span>{discountType[item.type]}</span>,
              value:
                item.type === "fixed"
                  ? toLocalString(Number(item.value)) + "تومان"
                  : item.value + "%",
              maxUses: item.maxUses,
              usedCount: item.usedCount,
              isActive: item.isActive ? (
                <span className="bg-green-600 w-16 text-white text-center rounded-lg inline-block p-1">
                  فعال
                </span>
              ) : (
                <span className="bg-rose-600 w-16 text-center text-white rounded-lg inline-block p-1">
                  غیر فعال
                </span>
              ),
              expiresAt: item.expiresAt ? (
                <span className="inline-block ltr">
                  {toLocalDate(item.expiresAt)}
                </span>
              ) : (
                <span className="bg-amber-700 inline-block rounded-lg text-white w-14 text-center p-1">
                  ندارد
                </span>
              ),
              createdAt: (
                <span className="inline-block ltr">
                  {toLocalDate(item.createdAt)}
                </span>
              ),
              updatedAt: (
                <span className="inline-block ltr">
                  {toLocalDate(item.updatedAt)}
                </span>
              ),

              actions: (
                <div className="flex gap-1">
                  <div className="tooltip" data-tip="ویرایش">
                    <Link to={`/admin-dashboard/discounts/${item.id}`}>
                      <button className="btn btn-ghost btn-sm text-info">
                        {" "}
                        <EditOutlineIcon width={22} height={22} />{" "}
                      </button>
                    </Link>
                  </div>
                  {item.isActive ? (
                    <div className="tooltip" data-tip="غیر فعال سازی">
                      <button
                        disabled={
                          variables?.discountId === item.id && isPending
                        }
                        onClick={() => handleToggleDiscount(item)}
                        className="btn btn-ghost btn-sm text-warning"
                      >
                        {variables?.discountId === item.id && isPending ? (
                          <IconLoading width={24} height={24} />
                        ) : (
                          <IconInactive width={22} height={22} />
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="tooltip" data-tip="فعال سازی">
                      <button
                        disabled={
                          variables?.discountId === item.id && isPending
                        }
                        onClick={() => handleToggleDiscount(item)}
                        className="btn btn-ghost btn-sm text-success"
                      >
                        {variables?.discountId === item.id && isPending ? (
                          <IconLoading width={24} height={24} />
                        ) : (
                          <IconCheck width={22} height={22} />
                        )}
                      </button>
                    </div>
                  )}
                  <div className="tooltip" data-tip="حذف">
                    <button
                      onClick={() => setDeleteItem(item)}
                      className="btn btn-ghost  btn-sm text-error"
                    >
                      {" "}
                      <TrashIcon width={22} height={22} />{" "}
                    </button>
                  </div>
                </div>
              ),
            })) ?? []
          }
        />
      </Paper>

      <DeleteDiscountDialog
        open={!!deleteItem}
        onCancell={() => setDeleteItem(null)}
        onApprove={handleDelete}
        loading={deletePending}
      />
    </div>
  );
}
