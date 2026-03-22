import AdminHeader from "@/components/AdminHeader";
import NewProjectForm from "@/components/NewProjectForm";

const AdminNewProjectPage = () => {
  return (
    <div className="w-full">
      <AdminHeader
        title="New Project"
        showBackButton
        backHref="/admin/portfolio"
      />
      <NewProjectForm />
    </div>
  );
};

export default AdminNewProjectPage;
