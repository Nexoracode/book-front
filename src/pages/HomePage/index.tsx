import ContainerLayout from "../../components/Assets/ContainerLayout";
import EitaaBanner from "./EitaaBanner";
// import ProductList from "./ProductList";

type Props = {};

export default function HomePage({}: Props) {
  return (
    <ContainerLayout>
      <EitaaBanner />
    </ContainerLayout>
  );
}
