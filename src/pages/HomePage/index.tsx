import ContainerLayout from "../../components/Assets/ContainerLayout";
import ProductList from "./ProductList";

type Props = {};

export default function HomePage({}: Props) {
  return (
    <ContainerLayout>
      <ProductList />
    </ContainerLayout>
  );
}
