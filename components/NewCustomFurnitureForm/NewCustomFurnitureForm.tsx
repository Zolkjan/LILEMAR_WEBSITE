"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Loader2, X, ImagePlus, Sun, Moon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel, FieldError } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ProjectThemes } from "@/enums";
import { roomTypeOptions } from "@/enums/selectOptions";
import {
  NewCustomFurnitureSchema,
  NewCustomFurnitureSchemaType,
} from "@/zodSchema/newCustomFurniture";
import useSWRMutation from "swr/mutation";
import { postFetcher } from "@/constans/apiFetcherFunction";

const NewCustomFurnitureForm = () => {
  const [previews, setPreviews] = useState<string[]>([]);

  const { trigger: createProject, isMutating: isLoading } = useSWRMutation(
    "/api/custom-furnitures/new",
    postFetcher,
  );

  const form = useForm<NewCustomFurnitureSchemaType>({
    resolver: zodResolver(NewCustomFurnitureSchema),
    defaultValues: {
      title: "",
      description: "",
      images: [],
      theme: ProjectThemes.LIGHT,
      roomType: undefined,
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  console.log(errors);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: any,
  ) => {
    const files = Array.from(e.target.files || []);
    onChange(files);
    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(filePreviews);
  };

  const onSubmit = async (data: NewCustomFurnitureSchemaType) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("theme", data.theme);
      formData.append("roomType", data.roomType);

      data.images.forEach((file) => {
        formData.append("images", file);
      });

      await createProject(formData);

      reset();
      setPreviews([]);
    } catch (error) {
      console.error("Wystąpił błąd podczas wysyłania:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto space-y-8 pb-20"
    >
      <FieldGroup className=" bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm">
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="space-y-2">
              <FieldLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Nazwa projektu
              </FieldLabel>
              <Input
                {...field}
                placeholder="Np. Loft Apartment"
                className="h-12 bg-background border-border focus-visible:ring-primary"
              />
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />
        <Controller
          name="roomType"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="space-y-2">
              <FieldLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Typ pomieszczenia
              </FieldLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="h-12 bg-background border-border">
                  <SelectValue placeholder="Wybierz typ" />
                </SelectTrigger>
                <SelectContent>
                  {roomTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />

        <Controller
          name="theme"
          control={control}
          render={({ field }) => (
            <Field className="space-y-3">
              <FieldLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Klimat / Motyw kolorystyczny
              </FieldLabel>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex gap-4"
              >
                <div className="flex-1">
                  <RadioGroupItem
                    value={ProjectThemes.LIGHT}
                    id="theme-light"
                    className="peer sr-only"
                  />
                  <label
                    htmlFor="theme-light"
                    className="flex items-center justify-center gap-2 rounded-xl border-2 border-border bg-background p-4 cursor-pointer hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all"
                  >
                    <Sun size={18} className="text-amber-500" />
                    <span className="font-medium">Jasny</span>
                  </label>
                </div>
                <div className="flex-1">
                  <RadioGroupItem
                    value={ProjectThemes.DARK}
                    id="theme-dark"
                    className="peer sr-only"
                  />
                  <label
                    htmlFor="theme-dark"
                    className="flex items-center justify-center gap-2 rounded-xl border-2 border-border bg-background p-4 cursor-pointer hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all"
                  >
                    <Moon size={18} className="text-indigo-400" />
                    <span className="font-medium">Ciemny</span>
                  </label>
                </div>
              </RadioGroup>
            </Field>
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="space-y-2">
              <FieldLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Opis projektu
              </FieldLabel>
              <Textarea
                {...field}
                className="min-h-37.5 bg-background border-border focus-visible:ring-primary"
              />
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />
        <Controller
          name="images"
          control={control}
          render={({ field: { onChange, value }, fieldState }) => (
            <Field className="space-y-4">
              <FieldLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Galeria zdjęć
              </FieldLabel>
              <div className="relative border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center bg-background hover:border-primary/50 transition-all cursor-pointer group">
                <ImagePlus className="w-10 h-10 mb-2 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-muted-foreground text-sm">
                  Przeciągnij zdjęcia lub kliknij tutaj
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handleImageChange(e, onChange)}
                />
              </div>

              {previews.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {previews.map((src, i) => (
                    <div
                      key={i}
                      className="relative aspect-square rounded-lg overflow-hidden border border-border group"
                    >
                      <img
                        src={src}
                        className="w-full h-full object-cover"
                        alt="podgląd"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            const newPreviews = previews.filter(
                              (_, idx) => idx !== i,
                            );
                            const newFiles = value.filter(
                              (_: any, idx: number) => idx !== i,
                            );

                            setPreviews(newPreviews);
                            onChange(newFiles);
                          }}
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />
      </FieldGroup>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" className="px-8 rounded-xl">
          Anuluj
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 rounded-xl font-bold"
        >
          {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
          Zapisz i opublikuj
        </Button>
      </div>
    </form>
  );
};

export default NewCustomFurnitureForm;
