"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getFetcher, putFetcher } from "@/constans/apiFetcherFunction";
import { useTranslations } from "next-intl";

type HomeStats = {
  experience: string;
  interiorProjects: string;
  builtIns: string;
  attentionToDetail: string;
};

const initialStats: HomeStats = {
  experience: "",
  interiorProjects: "",
  builtIns: "",
  attentionToDetail: "",
};

const HomeStatsForm = () => {
  const t = useTranslations("homeStatsSettings");
  const [stats, setStats] = useState(initialStats);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getFetcher("/api/home-stats")
      .then(setStats)
      .catch(() => toast.error(t("loadError")))
      .finally(() => setIsLoading(false));
  }, [t]);

  const updateField = (field: keyof HomeStats, value: string) => {
    setStats((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      await putFetcher<HomeStats, HomeStats>("/api/home-stats", { arg: stats });
      toast.success(t("saveSuccess"));
    } catch (error: unknown) {
      const apiMessage = axios.isAxiosError(error)
        ? error.response?.data?.message
        : undefined;
      toast.error(apiMessage ?? t("saveError"));
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <Loader2 className="w-6 h-6 animate-spin text-primary" />;
  }

  const fields: { field: keyof HomeStats; label: string }[] = [
    { field: "experience", label: t("experience") },
    { field: "interiorProjects", label: t("interiorProjects") },
    { field: "builtIns", label: t("builtIns") },
    { field: "attentionToDetail", label: t("attentionToDetail") },
  ];

  return (
    <Card className="w-full border-2 border-border bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-black uppercase tracking-tight">
          {t("title")}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{t("description")}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map(({ field, label }) => (
              <label key={field} className="space-y-2 text-sm font-semibold">
                <span>{label}</span>
                <Input
                  required
                  value={stats[field]}
                  onChange={(event) => updateField(field, event.target.value)}
                  className="h-12"
                />
              </label>
            ))}
          </div>
          <Button
            type="submit"
            disabled={isSaving}
            className="font-bold uppercase tracking-widest"
          >
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {t("save")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default HomeStatsForm;
