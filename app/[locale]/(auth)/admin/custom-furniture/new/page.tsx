import AdminHeader from "@/components/AdminHeader";
import NewCustomFurnitureForm from "@/components/NewCustomFurnitureForm/NewCustomFurnitureForm";

const AdminNewCustomFurniturePage = () => {
  return (
    <div className="w-full">
      <AdminHeader
        title="Nowa realizacja mebli na wymiar"
        showBackButton
        backHref="/admin/custom-furniture"
      />
      <NewCustomFurnitureForm />
    </div>
  );
};

export default AdminNewCustomFurniturePage;
