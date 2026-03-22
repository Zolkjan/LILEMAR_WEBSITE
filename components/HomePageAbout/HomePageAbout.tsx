"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Camera, Hammer } from "lucide-react"; // Zmieniono na Hammer dla rzemiosła

gsap.registerPlugin(ScrollTrigger);

const HomePageAbout = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      // Animacja kart z dołu
      gsap.fromTo(
        ".info-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );

      // Animacja paska statystyk
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".stats-container",
            start: "top 90%",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-40 bg-background text-foreground overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        {/* NAGŁÓWEK - Czytelny i nowoczesny */}
        <div className="mb-24 text-center md:text-left">
          <span className="inline-block mb-4 px-4 py-1 border border-primary/30 text-primary text-[10px] font-black tracking-[0.5em] uppercase rounded-full">
            Model współpracy
          </span>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-8">
            Kompleksowe <br />
            <span className="text-primary italic">podejście.</span>
          </h2>
          <div className="w-24 h-2 bg-primary mb-8 hidden md:block" />
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl font-light leading-relaxed">
            Łączymy świat cyfrowego designu z fizycznym rzemiosłem. Nasza
            działalność opiera się na dwóch uzupełniających się filarach, które
            gwarantują spójność od pierwszego szkicu po montaż ostatniego
            uchwytu.
          </p>
        </div>

        {/* PODZIAŁ NA ODNOGI - Bez Linków */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-0 border border-border rounded-[2.5rem] overflow-hidden shadow-2xl">
          {/* FILAR 1: WIZUALIZACJE */}
          <div className="info-card relative bg-card p-10 md:p-16 flex flex-col justify-between border-b md:border-b-0 md:border-r border-border group transition-colors duration-500 hover:bg-muted/30">
            <div>
              <div className="mb-10 w-16 h-16 flex items-center justify-center bg-primary/10 rounded-2xl text-primary group-hover:scale-110 transition-transform">
                <Camera className="w-8 h-8" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6">
                Projektowanie <br /> &{" "}
                <span className="text-primary">Wizualizacje 3D</span>
              </h3>
              <p className="text-muted-foreground text-lg font-light leading-relaxed">
                Przekształcamy Twoje pomysły w fotorealistyczne obrazy. Dzięki
                zaawansowanej technologii 3D, zobaczysz swoje przyszłe wnętrze z
                uwzględnieniem każdego detalu, tekstury materiału i gry światła.
                To etap, na którym eliminujemy niepewność i kreujemy idealną
                wizję.
              </p>
            </div>
          </div>

          {/* FILAR 2: WYKONAWSTWO */}
          <div className="info-card relative bg-secondary p-10 md:p-16 flex flex-col justify-between group transition-colors duration-500 hover:bg-secondary/95 text-secondary-foreground">
            <div>
              <div className="mb-10 w-16 h-16 flex items-center justify-center bg-primary rounded-2xl text-primary-foreground group-hover:scale-110 transition-transform">
                <Hammer className="w-8 h-8" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6">
                Realizacja <br /> &{" "}
                <span className="text-primary">Meble na wymiar</span>
              </h3>
              <p className="text-secondary-foreground/70 text-lg font-light leading-relaxed">
                Wizja staje się rzeczywistością. Specjalizujemy się w
                dostarczaniu wysokiej jakości mebli na indywidualne zamówienie.
                Dbamy o to, aby rzemieślnicza precyzja wykonania w pełni
                oddawała to, co wspólnie wypracowaliśmy na etapie projektu 3D.
                Solidność bez kompromisów.
              </p>
            </div>
          </div>
        </div>

        {/* PASEK STATYSTYK - Informacje ogólne */}
        <div className="stats-container mt-20 grid grid-cols-2 lg:grid-cols-4 gap-12 py-12 px-6">
          {[
            { label: "Doświadczenie", val: "12 lat" },
            { label: "Projekty wnętrz", val: "300+" },
            { label: "Wykonane zabudowy", val: "150+" },
            { label: "Dbałość o detal", val: "100%" },
          ].map((stat, i) => (
            <div
              key={i}
              className="stat-item flex flex-col gap-1 border-l border-primary/30 pl-6"
            >
              <span className="text-4xl font-black text-foreground tracking-tighter">
                {stat.val}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold italic">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Dekoracyjne elementy tła - bardzo subtelne */}
      <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary rounded-full blur-[150px]" />
      </div>
    </section>
  );
};

export default HomePageAbout;
