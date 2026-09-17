"use client";

import { useTranslations } from "next-intl";
import {
  LayoutDashboard,
  Images,
  TrendingUp,
  Clock,
  Hammer,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useSWR from "swr";
import { Loader2 } from "lucide-react";
import { getFetcher } from "@/constans/apiFetcherFunction";

type DashboardStats = {
  furnitureCount: number;
  visualizationsCount: number;
  furnitureThisMonth: number;
  viewsCount: number;
  recentProjects: { id: string; title: string }[];
};

const AdminPage = () => {
  const t = useTranslations("admin");
  const { data, error, isLoading } = useSWR<DashboardStats>(
    "/api/admin/stats",
    getFetcher,
  );

  const stats = [
    {
      title: t("stats.projects"),
      value: data?.furnitureCount ?? "-",
      description: t("stats.projectsDescription", {
        count: data?.furnitureThisMonth ?? 0,
      }),
      icon: Hammer,
    },
    {
      title: t("stats.visualizations"),
      value: data?.visualizationsCount ?? "-",
      description: t("stats.visualizationsDescription", {
        count: data?.visualizationsCount ?? 0,
      }),
      icon: Images,
    },
    {
      title: t("stats.views"),
      value: data?.viewsCount ?? "-",
      description: t("stats.viewsDescription", {
        count: data?.viewsCount ?? 0,
      }),
      icon: TrendingUp,
    },
    {
      title: t("stats.system"),
      value: error ? t("stats.offline") : data ? t("stats.online") : "-",
      description: error
        ? t("stats.systemError")
        : t("stats.systemDescription"),
      icon: Clock,
    },
  ];

  return (
    <div className="p-6 md:p-10 space-y-10 max-w-7xl mx-auto bg-background min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-foreground uppercase">
            {t("heading")}
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            {t("description")}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border-2 border-border bg-card hover:border-primary transition-colors"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="w-5 h-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-foreground">
                {stat.value}
              </div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-2 border-2 border-border bg-card">
          <CardHeader className="border-b border-border/50">
            <CardTitle className="text-lg font-black uppercase flex items-center gap-3">
              <LayoutDashboard className="w-5 h-5 text-primary" />
              {t("recent")}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {isLoading && (
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            )}
            {!isLoading && data?.recentProjects.length === 0 && (
              <p className="text-sm text-muted-foreground">
                {t("noRecentProjects")}
              </p>
            )}
            {!isLoading && data && (
              <div className="space-y-4">
                {data.recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-background border border-border group hover:border-primary transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded flex items-center justify-center border border-border">
                      <Hammer className="text-secondary w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-black text-foreground uppercase text-sm">
                        {project.title}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;
