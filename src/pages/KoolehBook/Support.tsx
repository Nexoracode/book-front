import { PersonSupport28FilledIcon } from "../../components/Assets/PersonSupport28FilledIcon";
import { ProductVariantIcon } from "../../components/Assets/ProductVariantIcon";
import { BrainIcon } from "../../components/Assets/BrainIcon";
import { UsersThreeFillIcon } from "../../components/Assets/UsersThreeFillIcon";
import { ImageGallerySolidIcon } from "../../components/Assets/ImageGallerySolidIcon";
import { RoundTrendingUpIcon } from "../../components/Assets/RoundTrendingUpIcon";
import ContentHeader from "../../components/Assets/ContentHeader";
import { ServicesIcon } from "../../components/Icons/ServicesIcon";

type Props = {};

const items = [
  {
    label: "پشتیبانی",
    Icon: PersonSupport28FilledIcon,
    color: "text-blue-700",
  },
  {
    label: "پخش محصولات",
    Icon: ProductVariantIcon,
    color: "text-orange-500",
  },
  {
    label: "مهارت های عمومی و خصوصی",
    Icon: BrainIcon,
    color: "text-fuchsia-600",
  },
  {
    label: "شبکه سازی مخاطبین",
    Icon: UsersThreeFillIcon,
    color: "text-green-800",
  },
  {
    label: "ارائه کارهای مخاطب در کانال های ما",
    Icon: ImageGallerySolidIcon,
    color: "text-primary-400",
  },
  {
    label: "رشد فعالین و ارزیابی",
    Icon: RoundTrendingUpIcon,
    color: "text-cyan-700",
  },
];
export default function Support({}: Props) {
  return (
    <div>
      <ContentHeader Icon={ServicesIcon} title="خدمات" />
      <div className="flex flex-wrap">
        {items.map(({ Icon, label, color }, index) => (
          <div
            className="w-[33.3333%] flex flex-col items-center p-2"
            key={index}
          >
            <span className="bg-white rounded-full p-2 shadow-2xl">
              <Icon width={36} height={36} className={`${color}`} />
            </span>
            <span className="mt-4 text-sm inline-block text-center font-semibold text-neutral-800">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
