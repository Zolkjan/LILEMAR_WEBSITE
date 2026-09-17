"use client";

import AdminHeader from "@/components/AdminHeader";
import TechnologiesManager from "@/components/TechnologiesManager/TechnologiesManager";
import { useTranslations } from "next-intl";

const AdminTechnologiesPage = () => {
  const t = useTranslations("technologiesSettings");

  return (
    <div className="w-full max-w-none space-y-8 bg-background min-h-screen">
      <AdminHeader title={t("title")} showBackButton backHref="/admin" />
      <TechnologiesManager />
    </div>
  );
};

export default AdminTechnologiesPage;
