import AdminHeader from "@/components/AdminHeader";
import NewVisualizationForm from "@/components/NewVisualizationForm";
import { useTranslations } from "next-intl";

const AdminNewVisualizationPage = () => {
  const t = useTranslations("details");
  return (
    <div className="w-full">
      <AdminHeader
        title={t("newVisualization")}
        showBackButton
        backHref="/admin/visualizations"
      />
      <NewVisualizationForm />
    </div>
  );
};

export default AdminNewVisualizationPage;
