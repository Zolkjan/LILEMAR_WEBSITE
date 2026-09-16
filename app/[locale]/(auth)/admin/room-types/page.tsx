"use client";

import AdminHeader from "@/components/AdminHeader";
import RoomTypesManager from "@/components/RoomTypesManager";
import { useTranslations } from "next-intl";

const AdminRoomTypesPage = () => {
  const t = useTranslations("roomTypesSettings");

  return (
    <div className="w-full max-w-none space-y-8 bg-background min-h-screen">
      <AdminHeader title={t("title")} showBackButton backHref="/admin" />
      <RoomTypesManager />
    </div>
  );
};

export default AdminRoomTypesPage;
