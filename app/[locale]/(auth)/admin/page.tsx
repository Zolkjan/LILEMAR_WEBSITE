import { useTranslations } from "next-intl";

const AdminPage = () => {
  const t = useTranslations("admin");
  return <div>{t("heading")}</div>;
};

export default AdminPage;
