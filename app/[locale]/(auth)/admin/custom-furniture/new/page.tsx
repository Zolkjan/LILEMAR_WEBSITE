import AdminHeader from "@/components/AdminHeader";
import NewCustomFurnitureForm from "@/components/NewCustomFurnitureForm/NewCustomFurnitureForm";
import { useTranslations } from "next-intl";

const AdminNewCustomFurniturePage = () => {
  const t = useTranslations("details");
  return (
    <div className="w-full">
      <AdminHeader
        title={t("newFurniture")}
        showBackButton
        backHref="/admin/custom-furniture"
      />
      <NewCustomFurnitureForm />
    </div>
  );
};

export default AdminNewCustomFurniturePage;
