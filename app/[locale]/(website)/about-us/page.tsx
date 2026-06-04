"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

// Shadcn UI
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Icons
import {
  ArrowRight,
  Star,
  ShieldCheck,
  Target,
  Zap,
  Quote,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutUsPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animacja wejściowa (Hero)
      gsap.from(".reveal-about", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "expo.out",
        delay: 0.3,
      });

      // Licznik w statystykach
      const stats = gsap.utils.toArray(".stat-number");
      stats.forEach((stat: any) => {
        const targetValue = parseInt(stat.getAttribute("data-value") || "0");
        gsap.to(stat, {
          innerText: targetValue,
          duration: 2,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: stat,
            start: "top 90%",
          },
        });
      });

      // Pojawianie się sekcji (Scroll)
      const sections = gsap.utils.toArray(".about-section");
      sections.forEach((section: any) => {
        gsap.from(section, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="bg-background text-foreground min-h-screen pb-20 overflow-hidden"
    >
      {/* 1. HERO SECTION */}
      <section className="pt-44 pb-24 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="reveal-about space-y-4 mb-12">
          <Badge
            variant="outline"
            className="border-primary/30 text-primary px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.4em]"
          >
            Lilema Studio — Od 2018
          </Badge>
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.8] uppercase">
            Definiujemy <br />
            <span className="text-primary italic font-serif">Przestrzeń</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7 reveal-about">
            <p className="text-xl md:text-2xl font-light leading-relaxed text-muted-foreground uppercase tracking-tight max-w-2xl">
              Nie interesują nas powtarzalne schematy. W Lilema Studio łączymy
              rzemiosło z technologią 3D, tworząc wnętrza, które są
              przedłużeniem osobowości ich właścicieli.
            </p>
          </div>
          <div className="lg:col-span-5 reveal-about flex lg:justify-end">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-700" />
              <div className="w-32 h-32 rounded-full border border-border flex items-center justify-center relative bg-background/50 backdrop-blur-sm animate-spin-slow">
                <Star className="text-primary w-10 h-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS (Shadcn Card) */}
      <section className="about-section px-6 mb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {[
            { label: "Projekty", value: 240, suffix: "+" },
            { label: "Nagrody", value: 18, suffix: "" },
            { label: "Klienci", value: 195, suffix: "" },
            { label: "Miasta", value: 45, suffix: "" },
          ].map((stat, i) => (
            <Card
              key={i}
              className="bg-secondary/20 border-border rounded-[2rem] overflow-hidden text-center py-10"
            >
              <CardContent className="p-0">
                <div className="text-5xl md:text-6xl font-black tracking-tighter mb-2">
                  <span className="stat-number" data-value={stat.value}>
                    0
                  </span>
                  {stat.suffix}
                </div>
                <p className="text-[9px] uppercase font-black tracking-[0.3em] text-muted-foreground">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 3. FILARY (Shadcn Grid) */}
      <section className="about-section px-6 max-w-7xl mx-auto mb-32">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-20">
          <div className="max-w-md">
            <h2 className="text-5xl font-black tracking-tighter uppercase leading-none mb-6">
              Nasze{" "}
              <span className="text-primary italic font-serif text-6xl">
                DNA
              </span>
            </h2>
            <Separator className="w-20 bg-primary h-1 mb-8" />
            <p className="text-muted-foreground font-light leading-relaxed">
              Każdy projekt traktujemy jak unikalne dzieło sztuki. Nasze
              podejście opiera się na trzech filarach: estetyce, użyteczności i
              emocjach, jakie wywołuje przestrzeń.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full lg:w-2/3">
            {[
              {
                icon: ShieldCheck,
                title: "Jakość",
                desc: "Tylko materiały i rozwiązania, pod którymi podpisujemy się obiema rękami.",
              },
              {
                icon: Zap,
                title: "Energia",
                desc: "Wnosimy dynamikę i świeże spojrzenie do każdego metra kwadratowego.",
              },
              {
                icon: Target,
                title: "Wizja",
                desc: "Widzimy potencjał tam, gdzie inni widzą tylko puste ściany.",
              },
              {
                icon: Quote,
                title: "Dialog",
                desc: "Twój głos jest fundamentem, na którym budujemy naszą koncepcję.",
              },
            ].map((filar, i) => (
              <div
                key={i}
                className="p-8 border border-border rounded-[2.5rem] bg-card hover:bg-secondary/10 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <filar.icon className="w-6 h-6" />
                </div>
                <h4 className="font-black text-xl uppercase tracking-tighter mb-3">
                  {filar.title}
                </h4>
                <p className="text-sm text-muted-foreground font-light leading-snug">
                  {filar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION (CTA) */}
      <section className="about-section px-6 max-w-7xl mx-auto">
        <div className="relative bg-foreground rounded-[3rem] p-12 md:p-24 overflow-hidden">
          <div className="relative z-10 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
              <h3 className="text-background text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none mb-6">
                Chcesz zmienić swoją <br />{" "}
                <span className="text-primary italic font-serif text-5xl md:text-7xl">
                  Codzienność?
                </span>
              </h3>
              <p className="text-background/60 text-sm uppercase font-bold tracking-[0.2em]">
                Zacznijmy od rozmowy o Twoich marzeniach.
              </p>
            </div>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-white hover:text-foreground rounded-full h-20 px-12 text-[10px] font-black uppercase tracking-[0.4em] transition-all group"
              asChild
            >
              <Link href="/contact">
                Zarezerwuj Termin
                <ArrowRight className="ml-4 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Noise i dekoracje */}
          <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        </div>
      </section>

      {/* Tło ziarniste dla całej strony */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-[-1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default AboutUsPage;
