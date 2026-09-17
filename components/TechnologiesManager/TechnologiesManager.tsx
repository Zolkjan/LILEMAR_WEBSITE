"use client";

import { FormEvent, useState } from "react";
import axios from "axios";
import { Loader2, Plus, Trash2 } from "lucide-react";
import useSWR from "swr";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getFetcher, postFetcher } from "@/constans/apiFetcherFunction";
import { useTranslations } from "next-intl";

type Technology = { id: string; label: string };

const TechnologiesManager = () => {
  const t = useTranslations("technologiesSettings");
  const [label, setLabel] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const {
    data: technologies = [],
    isLoading,
    mutate,
  } = useSWR<Technology[]>("/api/technologies", getFetcher);

  const addTechnology = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      await postFetcher<{ label: string }>("/api/technologies", {
        arg: { label },
      });
      setLabel("");
      await mutate();
      toast.success(t("addSuccess"));
    } catch (error: unknown) {
      const apiMessage = axios.isAxiosError(error)
        ? error.response?.data?.message
        : undefined;
      toast.error(apiMessage ?? t("addError"));
    } finally {
      setIsSaving(false);
    }
  };

  const deleteTechnology = async (id: string) => {
    setDeletingId(id);
    try {
      await axios.delete("/api/technologies", { data: { id } });
      await mutate();
      toast.success(t("deleteSuccess"));
    } catch (error: unknown) {
      const apiMessage = axios.isAxiosError(error)
        ? error.response?.data?.message
        : undefined;
      toast.error(apiMessage ?? t("deleteError"));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Card className="w-full border-2 border-border bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-black uppercase tracking-tight">
          {t("title")}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{t("description")}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={addTechnology} className="flex gap-3">
          <Input
            required
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            placeholder={t("placeholder")}
            className="h-12"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isSaving}
            title={t("add")}
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </Button>
        </form>

        {isLoading ? (
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        ) : (
          <div className="divide-y divide-border rounded-lg border border-border">
            {technologies.map((technology) => (
              <div
                key={technology.id}
                className="flex min-h-14 items-center justify-between gap-4 px-4"
              >
                <span className="font-semibold">{technology.label}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  title={t("delete")}
                  disabled={deletingId === technology.id}
                  onClick={() => deleteTechnology(technology.id)}
                >
                  {deletingId === technology.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4 text-destructive" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TechnologiesManager;
