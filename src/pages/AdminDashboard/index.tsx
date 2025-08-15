import ContainerLayout from "../../components/Assets/ContainerLayout";
import SummeryReport from "./SummeryReport";
import ReportTable from "./ReportTable";

export default function AdminDashboard() {
  return (
    <ContainerLayout className="py-9">
      <SummeryReport />

      <div className="my-9" />
      <ReportTable />
    </ContainerLayout>
  );
}
