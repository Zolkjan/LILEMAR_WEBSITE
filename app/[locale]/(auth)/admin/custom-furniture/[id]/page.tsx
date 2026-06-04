"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Share2,
  Box,
  Sun,
  Moon,
  CheckCircle2,
  Info,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import useSWR from "swr";
import { getFetcher } from "@/constans/apiFetcherFunction";
import { useParams } from "next/navigation";
import { useState } from "react";

const CustomFurniturePreviewPage = () => {
  const params = useParams();
  const projectId = params.id;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data: projectData, isLoading } = useSWR(
    projectId ? `/api/custom-furnitures/${projectId}` : null,
    getFetcher,
  );

  console.log(projectData);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-bold uppercase">Nie znaleziono projektu.</p>
      </div>
    );
  }

  const displayData = {
    title: projectData.title || "Bez tytułu",
    description: projectData.description || "Brak opisu",
    roomType: projectData.roomType || "Niezdefiniowany",
    theme: projectData.theme || "LIGHT",
    images: projectData.images || [],
    features: projectData.features || ["Nowoczesny design", "Wysoka jakość"],
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          asChild
          className="hover:bg-muted font-bold uppercase text-xs tracking-widest"
        >
          <Link href="/admin/custom-furniture">
            <ChevronLeft className="w-4 h-4 mr-2" /> Wróć do listy
          </Link>
        </Button>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-border"
          >
            <Share2 className="w-4 h-4" />
          </Button>
          <Button className="bg-primary text-primary-foreground font-black uppercase text-xs px-6 shadow-[4px_4px_0px_0px_rgba(46,46,46,1)]">
            Publikuj projekt
          </Button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-6">
          <div className="overflow-hidden rounded-xl border-2 border-border bg-card shadow-sm">
            <AspectRatio ratio={16 / 9}>
              {displayData.images[selectedImageIndex] ? (
                <img
                  src={displayData.images[selectedImageIndex]}
                  alt={displayData.title}
                  className="object-cover w-full h-full transition-all duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <Box className="w-16 h-16 text-border" />
                </div>
              )}
            </AspectRatio>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {displayData.images.map((imgUrl: string, index: number) => (
              <div
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`aspect-square rounded-lg border-2 transition-colors cursor-pointer overflow-hidden ${
                  selectedImageIndex === index
                    ? "border-primary"
                    : "border-border"
                } bg-card hover:border-primary`}
              >
                <img
                  src={imgUrl}
                  alt={`Thumbnail ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Badge className="bg-secondary text-secondary-foreground px-3 py-1 font-black text-[10px] uppercase tracking-widest">
                {displayData.roomType}
              </Badge>
              <Badge className="bg-primary text-primary-foreground border-none px-3 py-1 font-black text-[10px] uppercase tracking-widest flex items-center gap-1.5">
                {displayData.theme.toUpperCase() === "DARK" ? (
                  <Moon size={10} />
                ) : (
                  <Sun size={10} />
                )}
                {displayData.theme} THEME
              </Badge>
            </div>

            <h1 className="text-4xl font-black text-foreground leading-none tracking-tighter uppercase">
              {displayData.title}
            </h1>
          </div>

          <div className="p-6 rounded-xl border-2 border-border bg-card space-y-4">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
              <Info size={14} className="text-primary" /> Opis techniczny
            </h3>
            <p className="text-foreground leading-relaxed font-medium">
              {displayData.description}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Wyposażenie i systemy
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {displayData.features.map((feature: string) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 p-3 rounded-lg border border-border bg-muted/30"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-foreground uppercase">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-1 bg-primary rounded-xl shadow-[8px_8px_0px_0px_rgba(46,46,46,1)]">
            <div className="bg-background rounded-xl p-6 border-2 border-secondary">
              <p className="font-black text-foreground text-center uppercase text-sm">
                To jest podgląd trybu administracyjnego.
                <br />
                <span className="text-muted-foreground font-medium normal-case">
                  Projekt ID: {projectId}
                </span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomFurniturePreviewPage;
