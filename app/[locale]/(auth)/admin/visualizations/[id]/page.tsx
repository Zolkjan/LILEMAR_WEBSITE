"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Box,
  Sun,
  Moon,
  CheckCircle2,
  Info,
  Loader2,
  Edit,
  PowerOff,
} from "lucide-react";
import Link from "next/link";
import useSWR from "swr";
import { getFetcher } from "@/constans/apiFetcherFunction";
import { useParams } from "next/navigation";
import { useState } from "react";

const VisualisationPreviewPage = () => {
  const params = useParams();
  const projectId = params.id;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data: projectData, isLoading } = useSWR(
    projectId ? `/api/visualizations/${projectId}` : null,
    getFetcher,
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground font-medium uppercase tracking-widest">
          Projekt nie został odnaleziony.
        </p>
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
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <nav className="sticky top-0 z-20 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              asChild
              className="text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-md px-2"
            >
              <Link href="/admin/custom-furniture">
                <ChevronLeft className="w-5 h-5" />
              </Link>
            </Button>
            <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase hidden sm:block">
              Panel / {projectId}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-border hover:bg-muted font-bold text-xs uppercase tracking-widest px-6 h-10 transition-all"
            >
              <Edit className="w-4 h-4 mr-2" /> Edytuj
            </Button>

            <Button
              variant="destructive"
              className="bg-destructive text-destructive-foreground font-bold text-xs uppercase tracking-widest px-6 h-10 shadow-sm transition-all"
            >
              <PowerOff className="w-4 h-4 mr-2" /> Dezaktywuj
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* --- MEDIA SECTION --- */}
          <div className="lg:col-span-7 space-y-4">
            <div className="overflow-hidden rounded-xl bg-card border border-border shadow-sm">
              <AspectRatio ratio={16 / 9}>
                {displayData.images[selectedImageIndex] ? (
                  <img
                    src={displayData.images[selectedImageIndex]}
                    alt={displayData.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                    <Box className="w-12 h-12 opacity-20" />
                  </div>
                )}
              </AspectRatio>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {displayData.images.map((imgUrl: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative shrink-0 w-20 aspect-square rounded-lg overflow-hidden transition-all duration-200 border-2 ${
                    selectedImageIndex === index
                      ? "border-primary scale-95"
                      : "border-transparent opacity-50 hover:opacity-100"
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* --- CONTENT SECTION --- */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Badge
                  variant="secondary"
                  className="bg-secondary text-secondary-foreground border-none px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest"
                >
                  {displayData.roomType}
                </Badge>
                <Badge className="bg-primary text-primary-foreground border-none px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                  {displayData.theme.toUpperCase() === "DARK" ? (
                    <Moon size={10} />
                  ) : (
                    <Sun size={10} />
                  )}
                  {displayData.theme}
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground uppercase leading-none">
                {displayData.title}
              </h1>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <Info size={14} className="text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                    Opis techniczny
                  </span>
                </div>
                <p className="text-foreground/80 leading-relaxed font-medium">
                  {displayData.description}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Wyposażenie i systemy
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {displayData.features.map((feature: string) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 p-3 rounded-md bg-card border border-border/50 transition-colors hover:border-primary/50"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-foreground uppercase tracking-tight">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer info box */}
            <div className="p-4 rounded-lg bg-muted/30 border border-border mt-auto">
              <div className="flex justify-between items-center text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                <span>Tryb administracyjny</span>
                <span className="text-primary">Status: Aktywny</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VisualisationPreviewPage;
