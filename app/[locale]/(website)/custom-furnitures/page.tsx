"use client";

import { useState, useMemo, useRef } from "react";
import useSWR from "swr";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { getFetcher } from "@/constans/apiFetcherFunction";
import { VisualisationType } from "@/types";
import { ProjectThemes } from "@/enums";
import { roomTypeOptions } from "@/enums/selectOptions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, X, Send, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const PortfolioPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: projects, isLoading } = useSWR<VisualisationType[]>(
    "/api/custom-furnitures",
    getFetcher,
  );

  const [activeRoom, setActiveRoom] = useState<string>("all");
  const [activeTheme, setActiveTheme] = useState<string>("all");
  const [isContactOpen, setIsContactOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    return (
      projects?.filter((project) => {
        const matchRoom =
          activeRoom === "all" || project.roomType === activeRoom;
        const matchTheme =
          activeTheme === "all" || project.theme === activeTheme;
        return matchRoom && matchTheme;
      }) || []
    );
  }, [projects, activeRoom, activeTheme]);

  useGSAP(
    () => {
      gsap.from(".reveal", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
      });

      const cards = gsap.utils.toArray(".portfolio-card");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 20, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.05,
            duration: 0.6,
            ease: "expo.out",
            overwrite: true,
          },
        );
      }
    },
    { dependencies: [filteredProjects], scope: containerRef },
  );

  const toggleContact = () => {
    const panel = document.getElementById("contact-panel");
    const isOpen = !isContactOpen;

    if (isOpen) {
      gsap.set(panel, { display: "block" });
      gsap.fromTo(
        panel,
        { y: 50, opacity: 0, scale: 0.8, transformOrigin: "bottom right" },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
      );
    } else {
      gsap.to(panel, {
        y: 20,
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(panel, { display: "none" });
        },
      });
    }
    setIsContactOpen(isOpen);
  };

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-background pt-32 pb-24 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="reveal">
            <span className="text-primary font-black tracking-[0.5em] uppercase text-[10px] block mb-4">
              01 — Galeria Projektów
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.8]">
              PORT<span className="text-primary italic font-serif">FOLIO</span>
            </h1>
          </div>
          <div className="reveal flex bg-secondary/50 p-1 rounded-xl border border-border backdrop-blur-sm">
            {[
              { id: "all", label: "Wszystkie" },
              { id: ProjectThemes.LIGHT, label: "Jasne" },
              { id: ProjectThemes.DARK, label: "Ciemne" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTheme(t.id)}
                className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                  activeTheme === t.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="reveal flex flex-wrap gap-2 border-t border-border pt-8">
          <Button
            variant={activeRoom === "all" ? "default" : "ghost"}
            onClick={() => setActiveRoom("all")}
            className="rounded-full px-6 uppercase text-[10px] font-bold tracking-widest"
          >
            Wszystkie Realizacje
          </Button>
          {roomTypeOptions.map((opt) => (
            <Button
              key={opt.value}
              variant={activeRoom === opt.value ? "default" : "ghost"}
              onClick={() => setActiveRoom(opt.value)}
              className="rounded-full px-6 uppercase text-[10px] font-bold tracking-widest"
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {filteredProjects.map((project) => (
          <div key={project.id} className="portfolio-card group">
            <Link href={`/custom-furnitures/${project.id}`}>
              <Card className="border-none bg-transparent shadow-none overflow-hidden cursor-pointer">
                <div className="relative aspect-3/4 overflow-hidden rounded-4xl bg-muted mb-6">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img
                    src={project.images?.[0]}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6 z-20">
                    <Badge className="bg-background/90 text-foreground backdrop-blur-md border-none px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                      {project.roomType}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between group-hover:text-primary transition-colors">
                    <h3 className="text-3xl font-black tracking-tighter uppercase leading-none">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                  </div>
                  <p className="text-muted-foreground font-light text-sm line-clamp-2 uppercase tracking-tight opacity-70">
                    {project.description}
                  </p>
                </div>
              </Card>
            </Link>
          </div>
        ))}
      </div>

      <div className="fixed bottom-8 right-8 z-100 flex flex-col items-end gap-4">
        <div
          id="contact-panel"
          className="hidden bg-card border border-border shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] rounded-[2.5rem] w-[320px] overflow-hidden"
        >
          <div className="bg-primary p-8 text-primary-foreground">
            <h4 className="font-black text-2xl tracking-tighter uppercase italic leading-none mb-2">
              Zapytaj o projekt
            </h4>
            <p className="text-[10px] uppercase font-bold tracking-widest opacity-80">
              Bezpłatna wycena w 24h
            </p>
          </div>
          <div className="p-8 space-y-3">
            <Button
              className="w-full h-14 rounded-2xl font-black uppercase text-[10px] tracking-widest"
              asChild
            >
              <a href="mailto:hello@studio.pl">Wyślij wiadomość</a>
            </Button>
            <Button
              variant="outline"
              className="w-full h-14 rounded-2xl font-black uppercase text-[10px] tracking-widest"
              asChild
            >
              <a href="tel:+48000000000">Zadzwoń do nas</a>
            </Button>
          </div>
        </div>

        <button
          onClick={toggleContact}
          className="w-20 h-20 rounded-full bg-primary text-primary-foreground shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all group relative"
        >
          {isContactOpen ? <X size={32} /> : <MessageCircle size={32} />}
          {!isContactOpen && (
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-25" />
          )}
        </button>
      </div>

      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-[-1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </main>
  );
};

export default PortfolioPage;
