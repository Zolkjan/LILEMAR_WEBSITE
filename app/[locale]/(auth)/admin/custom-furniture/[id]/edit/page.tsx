import AdminHeader from "@/components/AdminHeader";
import EditCustomFurnitureForm from "@/components/EditCustomFurnitureForm/EditCustomFurnitureForm";
import { useTranslations } from "next-intl";

const EditCustomFurniturePage = () => {
  const t = useTranslations("details");
  return (
    <div className="w-full">
      <AdminHeader title={t("editFurniture")} showBackButton backHref="/admin/custom-furniture" />
      <EditCustomFurnitureForm />
    </div>
  );
};

export default EditCustomFurniturePage;
