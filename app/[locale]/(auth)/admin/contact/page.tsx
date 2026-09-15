import AdminHeader from "@/components/AdminHeader";
import ContactSettingsForm from "@/components/ContactSettingsForm";
import { useTranslations } from "next-intl";

const AdminContactPage = () => {
  const t = useTranslations("navigation");
  return (
    <div className="w-full max-w-none space-y-8 bg-background min-h-screen">
      <AdminHeader
        title={t("buttons.contact")}
        showBackButton
        backHref="/admin"
      />
      <ContactSettingsForm />
    </div>
  );
};

export default AdminContactPage;
