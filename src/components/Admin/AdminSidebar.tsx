import { Link, useLocation } from "react-router-dom";
import { HomeIcon } from "../Icons/HomeIcon";
import { IconShoppingCart } from "../Icons/IconShoppingCart";
import { useAdminLayout } from "./AdminLayoutProvider";
import { BaselineCloseIcon } from "../Icons/BaselineCloseIcon";
import { AdProductIcon } from "../Icons/AdProductIcon";
import DiscountIcon from "../Icons/DiscountIcon";

type Props = {};

export default function AdminSidebar({}: Props) {
  const { setSidebarOpen, sidebarOpen } = useAdminLayout();
  const location = useLocation();

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-60 bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } rounded-l-2xl overflow-y-auto`}
      >
        {/* هدر */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-700 dark:text-white">
            پنل مدیریت
          </h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-500 flex items-center gap-1 hover:text-red-500 text-sm font-semibold"
          >
            <BaselineCloseIcon width={20} height={20} />
            بستن
          </button>
        </div>

        {/* لینک‌ها */}
        <nav className="p-4 space-y-2">
          {menus.map(({ Icon, labal, to }) => {
            const isActive = location.pathname === to;

            return (
              <Link
                to={`/admin-dashboard${to}`}
                key={to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 p-2 rounded-xl transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-800/30 dark:text-blue-200 font-semibold"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all
                    ${
                      isActive
                        ? "bg-blue-200 dark:bg-blue-700/50"
                        : "bg-gray-200 dark:bg-gray-700 group-hover:bg-gray-300 dark:group-hover:bg-gray-600"
                    }`}
                >
                  <Icon width={20} height={20} />
                </div>
                <span className="text-sm">{labal}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}

const menus = [
  {
    to: "/",
    labal: "داشبورد",
    Icon: HomeIcon,
  },
  {
    to: "/admin-add-order",
    labal: "افزودن سفارش",
    Icon: IconShoppingCart,
  },
  {
    to: "/products",
    labal: "محصولات",
    Icon: AdProductIcon,
  },
  {
    to: "/discounts",
    labal: "کدهای تخفیف",
    Icon: DiscountIcon,
  },
];
