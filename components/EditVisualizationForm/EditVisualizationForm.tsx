"use client";

import { useEffect, useState } from "react";
import { Loader2, Moon, Sun } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { getFetcher } from "@/constans/apiFetcherFunction";
import { ProjectThemes } from "@/enums";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";

type Project = {
  title: string;
  description: string;
  theme: ProjectThemes;
  roomType: string;
  images?: string[];
};
type RoomType = { id: string; label: string };

const EditVisualizationForm = () => {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations("common");
  const projectId = params.id as string;
  const { data: project, isLoading } = useSWR<Project>(
    `/api/visualizations/${projectId}`,
    getFetcher,
  );
  const { data: roomTypes = [] } = useSWR<RoomType[]>("/api/room-types", getFetcher);
  const [form, setForm] = useState({ title: "", description: "", theme: ProjectThemes.LIGHT, roomType: "" });
  const [images, setImages] = useState<File[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (project) {
      setForm({ title: project.title, description: project.description, theme: project.theme, roomType: project.roomType });
    }
  }, [project]);

  if (isLoading || !project) return <Loader2 className="mx-auto mt-20 h-8 w-8 animate-spin text-primary" />;

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    try {
      const body = new FormData();
      Object.entries(form).forEach(([key, value]) => body.append(key, value));
      images.forEach((image) => body.append("images", image));
      await fetch(`/api/visualizations/${projectId}`, { method: "PUT", body });
      router.push(`/admin/visualizations/${projectId}`);
      router.refresh();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="mx-auto max-w-4xl space-y-6 pb-20">
      <Input required minLength={3} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder={t("projectName")} />
      <select required value={form.roomType} onChange={(event) => setForm({ ...form, roomType: event.target.value })} className="h-12 w-full rounded-md border border-border bg-background px-3">
        <option value="">{t("chooseType")}</option>
        {roomTypes.map((room) => <option key={room.id} value={room.id}>{room.label}</option>)}
      </select>
      <div className="flex gap-3">
        {[ProjectThemes.LIGHT, ProjectThemes.DARK].map((theme) => (
          <Button key={theme} type="button" variant={form.theme === theme ? "default" : "outline"} onClick={() => setForm({ ...form, theme })} className="flex-1">
            {theme === ProjectThemes.LIGHT ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}{theme}
          </Button>
        ))}
      </div>
      <Textarea required minLength={10} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder={t("projectDescription")} className="min-h-40" />
      <div className="space-y-3">
        <label className="text-sm font-bold uppercase tracking-widest">{t("replaceImages")}</label>
        <input type="file" multiple accept="image/*" onChange={(event) => setImages(Array.from(event.target.files ?? []))} className="block w-full rounded-md border border-dashed border-border bg-background p-4" />
        <div className="flex gap-2 overflow-x-auto">
          {(project.images ?? []).map((image) => <img key={image} src={image} alt="" className="h-20 w-20 rounded object-cover" />)}
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()}>{t("cancel")}</Button>
        <Button type="submit" disabled={isSaving}>{isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{t("saveChanges")}</Button>
      </div>
    </form>
  );
};

export default EditVisualizationForm;
