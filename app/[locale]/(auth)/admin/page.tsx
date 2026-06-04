"use client";

import { useTranslations } from "next-intl";
import {
  LayoutDashboard,
  Images,
  TrendingUp,
  Clock,
  Hammer,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AdminPage = () => {
  const t = useTranslations("admin");

  // Dane statyczne dopasowane do Twojej palety
  const stats = [
    {
      title: "Wszystkie projekty",
      value: "24",
      description: "+3 w tym miesiącu",
      icon: Hammer,
    },
    {
      title: "Wizualizacje 3D",
      value: "12",
      description: "85% ukończonych",
      icon: Images,
    },
    {
      title: "Wyświetlenia",
      value: "1,284",
      description: "+12.5% vs last week",
      icon: TrendingUp,
    },
    {
      title: "Status systemu",
      value: "Online",
      description: "Wszystkie moduły aktywne",
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
            Zarządzaj swoją pracownią i projektami mebli.
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
              Ostatnie realizacje
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between p-4 rounded-lg bg-background border border-border group hover:border-primary transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded flex items-center justify-center border border-border">
                      <Hammer className="text-secondary w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-black text-foreground uppercase text-sm">
                        Szafa przesuwna dębowa v{item}
                      </p>
                      <p className="text-xs text-muted-foreground font-medium">
                        Ostatnia edycja: 2h temu
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;
