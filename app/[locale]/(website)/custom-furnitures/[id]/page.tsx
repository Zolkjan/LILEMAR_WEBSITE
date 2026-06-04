"use client";

import { useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import useSWR from "swr";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Moon, Sun, ArrowRight, Share2 } from "lucide-react";
import { getFetcher } from "@/constans/apiFetcherFunction";
import { VisualisationType } from "@/types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CustomFurniturePage = () => {
  const params = useParams();
  const projectId = params.id as string;
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: projectData, isLoading } = useSWR<VisualisationType>(
    projectId ? `/api/custom-furnitures/${projectId}` : null,
    getFetcher,
  );

  useGSAP(
    () => {
      if (!projectData) return;

      gsap.from(".reveal-text", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.1,
      });

      const images = gsap.utils.toArray(".project-image-container");
      images.forEach((img) => {
        gsap.from(img as HTMLElement, {
          opacity: 0,
          y: 60,
          scale: 0.98,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: img as HTMLElement,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { dependencies: [projectData, isLoading], scope: containerRef },
  );

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-2 border-primary border-t-transparent animate-spin rounded-full" />
      </div>
    );

  if (!projectData) return null;

  return (
    <div
      ref={containerRef}
      className="bg-background text-foreground min-h-screen"
    >
      <div className="pt-24 px-6 md:px-10 max-w-480 mx-auto flex justify-between items-center relative z-10">
        <Button
          variant="ghost"
          asChild
          className="hover:bg-transparent p-0 text-foreground font-black uppercase text-[10px] tracking-[0.3em] group"
        >
          <Link href="/custom-furnitures">
            <ChevronLeft className="mr-2 w-5 h-5 text-primary group-hover:-translate-x-1 transition-transform" />
            Powrót do Portfolio
          </Link>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-border bg-card/50 backdrop-blur-md hover:bg-primary hover:text-primary-foreground transition-all"
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </div>

      <main className="max-w-480 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 pt-10">
        <section className="lg:col-span-5 h-fit lg:h-[calc(100vh-100px)] lg:sticky lg:top-24 flex flex-col justify-center p-8 md:p-16 lg:p-24 overflow-hidden">
          <div className="space-y-12">
            <div className="reveal-text flex flex-wrap gap-3">
              <Badge className="bg-primary text-primary-foreground border-none px-5 py-1.5 font-black text-[9px] uppercase tracking-[0.2em] rounded-full">
                {projectData.roomType}
              </Badge>
              <Badge
                variant="outline"
                className="border-border text-muted-foreground px-5 py-1.5 font-bold text-[9px] uppercase tracking-[0.2em] flex items-center gap-2 rounded-full"
              >
                {projectData.theme === "dark" ? (
                  <Moon size={12} />
                ) : (
                  <Sun size={12} />
                )}
                {projectData.theme} Mode
              </Badge>
            </div>
            <div className="space-y-6">
              <h1 className="reveal-text text-6xl md:text-7xl lg:text-8xl font-black leading-[0.85] tracking-tighter uppercase italic font-serif">
                {projectData.title}
              </h1>
              <div className="reveal-text w-24 h-1.5 bg-primary rounded-full" />
            </div>

            <p className="reveal-text text-muted-foreground/80 text-lg md:text-xl font-light leading-relaxed max-w-lg uppercase tracking-tight">
              {projectData.description}
            </p>

            <div className="reveal-text pt-6">
              <Button className="bg-foreground text-background hover:bg-primary hover:text-primary-foreground rounded-full h-16 px-12 text-[10px] font-black uppercase tracking-[0.3em] transition-all group">
                Rozpocznij projekt
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </div>
        </section>

        <section className="lg:col-span-7 p-6 md:p-12 lg:p-20 space-y-12 md:space-y-24">
          {projectData.images?.map((url, index) => (
            <div key={index} className="project-image-container group relative">
              <div className="overflow-hidden rounded-4xl border border-border bg-card shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:border-primary/20">
                <img
                  src={url}
                  alt={`${projectData.title} view ${index}`}
                  className="w-full h-auto object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/5 -z-10 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
            </div>
          ))}
        </section>
      </main>

      <footer className="bg-card border-t border-border p-20 mt-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center space-y-10 relative z-10">
          <div className="text-foreground font-black text-5xl md:text-7xl tracking-tighter uppercase italic font-serif">
            Lilema <span className="text-primary">Studio</span>
          </div>
          <div className="h-px w-20 bg-primary/30" />
          <p className="text-[10px] uppercase tracking-[0.6em] text-muted-foreground font-bold text-center">
            Tworzymy przestrzenie, które inspirują. © 2026
          </p>
        </div>

        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </footer>
    </div>
  );
};

export default CustomFurniturePage;
