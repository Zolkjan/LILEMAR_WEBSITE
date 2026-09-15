"use client";

import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFetcher, putFetcher } from "@/constans/apiFetcherFunction";
import { useTranslations } from "next-intl";

type ContactSettings = {
  visualizationEmail: string;
  visualizationPhone: string;
  customFurnitureEmail: string;
  customFurniturePhone: string;
  postalCode: string;
  city: string;
  street: string;
  buildingNumber: string;
  apartmentNumber: string;
};

const initialSettings: ContactSettings = {
  visualizationEmail: "",
  visualizationPhone: "",
  customFurnitureEmail: "",
  customFurniturePhone: "",
  postalCode: "",
  city: "",
  street: "",
  buildingNumber: "",
  apartmentNumber: "",
};

const ContactSettingsForm = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const t = useTranslations("settings");

  useEffect(() => {
    getFetcher("/api/contact-settings")
      .then(setSettings)
      .catch(() => toast.error(t("loadError")))
      .finally(() => setIsLoading(false));
  }, []);

  const updateField = (field: keyof ContactSettings, value: string) => {
    setSettings((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      await putFetcher<ContactSettings, ContactSettings>(
        "/api/contact-settings",
        {
          arg: settings,
        },
      );
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

  return (
    <Card className="w-full border-2 border-border bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-black uppercase tracking-tight">
          {t("title")}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{t("description")}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-6 xl:grid-cols-2">
            <fieldset className="space-y-4 rounded-xl border border-border/70 bg-background/50 p-5">
              <legend className="text-sm font-black uppercase tracking-widest text-primary">
                {t("visualizations")}
              </legend>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm font-semibold">
                  <span>{t("visualizationEmail")}</span>
                  <Input
                    type="email"
                    required
                    value={settings.visualizationEmail}
                    onChange={(event) =>
                      updateField("visualizationEmail", event.target.value)
                    }
                    placeholder="wizualizacje@lilemar.pl"
                    className="h-12"
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold">
                  <span>{t("visualizationPhone")}</span>
                  <Input
                    type="tel"
                    required
                    value={settings.visualizationPhone}
                    onChange={(event) =>
                      updateField("visualizationPhone", event.target.value)
                    }
                    placeholder="+48 000 000 001"
                    className="h-12"
                  />
                </label>
              </div>
            </fieldset>

            <fieldset className="space-y-4 rounded-xl border border-border/70 bg-background/50 p-5">
              <legend className="text-sm font-black uppercase tracking-widest text-primary">
                {t("furniture")}
              </legend>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm font-semibold">
                  <span>{t("furnitureEmail")}</span>
                  <Input
                    type="email"
                    required
                    value={settings.customFurnitureEmail}
                    onChange={(event) =>
                      updateField("customFurnitureEmail", event.target.value)
                    }
                    placeholder="meble@lilemar.pl"
                    className="h-12"
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold">
                  <span>{t("furniturePhone")}</span>
                  <Input
                    type="tel"
                    required
                    value={settings.customFurniturePhone}
                    onChange={(event) =>
                      updateField("customFurniturePhone", event.target.value)
                    }
                    placeholder="+48 000 000 002"
                    className="h-12"
                  />
                </label>
              </div>
            </fieldset>
          </div>

          <fieldset className="space-y-4 rounded-xl border border-border/70 bg-background/50 p-5">
            <legend className="text-sm font-black uppercase tracking-widest text-primary">
              {t("address")}
            </legend>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <label className="space-y-2 text-sm font-semibold">
                <span>{t("postalCode")}</span>
                <Input
                  required
                  value={settings.postalCode}
                  onChange={(event) =>
                    updateField("postalCode", event.target.value)
                  }
                  placeholder="00-000"
                  className="h-12"
                />
              </label>
              <label className="space-y-2 text-sm font-semibold">
                <span>{t("city")}</span>
                <Input
                  required
                  value={settings.city}
                  onChange={(event) => updateField("city", event.target.value)}
                  placeholder="Warszawa"
                  className="h-12"
                />
              </label>
              <label className="space-y-2 text-sm font-semibold">
                <span>{t("street")}</span>
                <Input
                  required
                  value={settings.street}
                  onChange={(event) =>
                    updateField("street", event.target.value)
                  }
                  placeholder="ul. Projektowa"
                  className="h-12"
                />
              </label>
              <label className="space-y-2 text-sm font-semibold">
                <span>{t("building")}</span>
                <Input
                  required
                  value={settings.buildingNumber}
                  onChange={(event) =>
                    updateField("buildingNumber", event.target.value)
                  }
                  placeholder="12"
                  className="h-12"
                />
              </label>
              <label className="space-y-2 text-sm font-semibold">
                <span>{t("apartment")}</span>
                <Input
                  value={settings.apartmentNumber}
                  onChange={(event) =>
                    updateField("apartmentNumber", event.target.value)
                  }
                  placeholder="4"
                  className="h-12"
                />
              </label>
            </div>
          </fieldset>

          <div className="flex items-center gap-4">
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
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactSettingsForm;
