import AdminHeader from "@/components/AdminHeader";
import NewVisualizationForm from "@/components/NewVisualizationForm";

const AdminNewVisualizationPage = () => {
  return (
    <div className="w-full">
      <AdminHeader
        title="Nowa wizualizacja"
        showBackButton
        backHref="/admin/visualizations"
      />
      <NewVisualizationForm />
    </div>
  );
};

export default AdminNewVisualizationPage;
