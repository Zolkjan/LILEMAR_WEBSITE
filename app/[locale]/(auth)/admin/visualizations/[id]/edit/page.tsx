import AdminHeader from "@/components/AdminHeader";
import EditVisualizationForm from "@/components/EditVisualizationForm/EditVisualizationForm";
import { useTranslations } from "next-intl";

const EditVisualizationPage = () => {
  const t = useTranslations("details");
  return (
    <div className="w-full">
      <AdminHeader title={t("editVisualization")} showBackButton backHref="/admin/visualizations" />
      <EditVisualizationForm />
    </div>
  );
};

export default EditVisualizationPage;
