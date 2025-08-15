import IconLoading from "../Icons/IconLoading";
import Button, { ButtonProps } from "./Button";

type Props = {
  loading?: boolean;
} & ButtonProps;
export default function LoadingButton({ children, loading, ...props }: Props) {
  return (
    <Button {...props}>
      {loading ? (
        <IconLoading width={22} height={22} className="mx-auto" />
      ) : (
        children
      )}
    </Button>
  );
}
