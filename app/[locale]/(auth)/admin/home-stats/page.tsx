"use client";

import AdminHeader from "@/components/AdminHeader";
import HomeStatsForm from "@/components/HomeStatsForm";
import { useTranslations } from "next-intl";

const AdminHomeStatsPage = () => {
  const t = useTranslations("homeStatsSettings");

  return (
    <div className="w-full max-w-none space-y-8 bg-background min-h-screen">
      <AdminHeader title={t("title")} showBackButton backHref="/admin" />
      <HomeStatsForm />
    </div>
  );
};

export default AdminHomeStatsPage;
