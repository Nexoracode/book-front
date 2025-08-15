import { ReactNode, SVGProps } from "react";
import { ListIcon } from "../Icons/ListIcon";

type Props = {
  title: string;
  Icon?: (props: SVGProps<SVGSVGElement>) => ReactNode;
};

export default function ContentHeader({ title, Icon = ListIcon }: Props) {
  return (
    <div className="relative border-t border-neutral-200   pr-9 mb-9">
      <Icon
        width={24}
        height={24}
        className="text-neutral-300 absolute right-0 top-[50%] -translate-y-[50%] "
      />
      <h3 className="text-lg font-semibold pt-3 text-neutral-700">{title}</h3>
    </div>
  );
}
