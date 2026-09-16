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

type RoomType = { id: string; label: string };

const defaultRoomTypeIds = new Set([
  "kitchen",
  "living_room",
  "bedroom",
  "bathroom",
  "office",
]);

const RoomTypesManager = () => {
  const t = useTranslations("roomTypesSettings");
  const [label, setLabel] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const {
    data: roomTypes = [],
    isLoading,
    mutate,
  } = useSWR<RoomType[]>("/api/room-types", getFetcher);

  const addRoomType = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      await postFetcher<{ label: string }>("/api/room-types", {
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

  const deleteRoomType = async (id: string) => {
    setDeletingId(id);
    try {
      await axios.delete("/api/room-types", { data: { id } });
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
        <form onSubmit={addRoomType} className="flex gap-3">
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
            {roomTypes.map((room) => {
              const isDefault = defaultRoomTypeIds.has(room.id);

              return (
                <div
                  key={room.id}
                  className="flex min-h-14 items-center justify-between gap-4 px-4"
                >
                  <span className="font-semibold">{room.label}</span>
                  {isDefault ? (
                    <span className="text-xs text-muted-foreground">
                      {t("default")}
                    </span>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      title={t("delete")}
                      disabled={deletingId === room.id}
                      onClick={() => deleteRoomType(room.id)}
                    >
                      {deletingId === room.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4 text-destructive" />
                      )}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RoomTypesManager;
