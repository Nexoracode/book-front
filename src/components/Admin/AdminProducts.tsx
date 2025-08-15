import Paper from "../Assets/Paper";
import Table from "../Assets/Table";
import useGetProducts from "../../hooks/useGetProducts";
import { Link } from "react-router-dom";
import { toLocalString } from "../../utils/numbers";
import { IconAddSolid } from "../Icons/IconAddSolid";
import { EditOutlineIcon } from "../Icons/EditOutlineIcon";

type Props = {};

const headers = [
  {
    label: "شناسه محصول",
    key: "id",
  },
  {
    label: "تصویر",
    key: "image",
  },

  {
    label: "نام محصول",
    key: "name",
  },
  {
    label: "تعداد موجودی",
    key: "stock",
  },
  {
    label: "قیمت",
    key: "price",
  },
  {
    label: "تخفیف",
    key: "discount",
  },
  {
    label: "هزینه پست",
    key: "postage",
  },
  {
    label: "عملیات",
    key: "actions",
  },
];
export default function AdminProducts({}: Props) {
  const { products } = useGetProducts();
  return (
    <div>
      <Paper>
        <Link to={"/admin-dashboard/products/new"} className="btn btn-primary">
          <IconAddSolid width={18} height={18} />
          افزودن محصول
        </Link>
        <Table
          headers={headers}
          data={
            products?.data.map((item) => ({
              id: item.id,
              orderId: (
                <Link
                  className="text-blue-600"
                  to={`/admin/product/${item.id}`}
                >
                  {item.id}
                </Link>
              ),
              name: item.name,
              stock: item.stock,
              price: toLocalString(item.price) + " تومان",
              discount: item.discount
                ? toLocalString(item.discount) + " تومان"
                : "ندارد",
              postage: toLocalString(item.postage) + " تومان",
              image:
                item.media.length > 0 ? (
                  <img width={80} height={80} src={item.media[0].url} />
                ) : (
                  <img
                    width={65}
                    height={65}
                    className="w-[65px] h-[65px] object-fill"
                    src="/not-image.jpg"
                  />
                ),
              actions: (
                <div>
                  <div className="tooltip" data-tip="ویرایش">
                    <Link to={`/admin-dashboard/products/${item.id}`}>
                      <button className="btn">
                        {" "}
                        <EditOutlineIcon width={22} height={22} />{" "}
                      </button>
                    </Link>
                  </div>
                </div>
              ),
            })) ?? []
          }
        />
      </Paper>
    </div>
  );
}
