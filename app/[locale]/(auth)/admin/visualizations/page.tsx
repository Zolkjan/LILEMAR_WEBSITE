"use client";

import AdminHeader from "@/components/AdminHeader";
import { Plus } from "lucide-react";

const AdminPortfolioPage = () => {
  return (
    <div className="w-full">
      <AdminHeader
        title="Portfolio"
        buttons={[
          {
            label: "Add new",
            href: "/admin/portfolio/new",
            icon: Plus,
          },
        ]}
      />
      <div>PROJEKTY</div>
    </div>
  );
};

export default AdminPortfolioPage;
