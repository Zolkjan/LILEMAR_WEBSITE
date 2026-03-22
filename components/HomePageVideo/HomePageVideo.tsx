"use client";

import React, { useRef } from "react";
import { Button } from "../ui/button";
import { MoveRight, Cuboid, Camera } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

const HomePageVideo = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".video-bg",
        { scale: 1.2, opacity: 0 },
        { scale: 1.05, opacity: 1, duration: 2 },
      );

      tl.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        "-=1.5",
      );

      tl.fromTo(
        descriptionRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.8",
      );

      tl.fromTo(
        ".nav-button",
        { scale: 0.8, opacity: 0, y: 20 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
        },
        "-=0.5",
      );

      gsap.to(".scroll-indicator", {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-svh overflow-hidden bg-background"
    >
      {/* Tło Video z inteligentną nakładką */}
      <div className="absolute inset-0 z-0">
        <video
          className="video-bg object-cover w-full h-full"
          autoPlay
          loop
          muted
          playsInline
          src="/videos/main_video.mp4"
        />
        {/* Dynamiczny gradient: w light mode chroni czytelność, w dark mode wtapia się w tło */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background/90 dark:from-black/60 dark:to-background" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        {/* Tag nad tytułem - wymuszamy widoczność przez bg-secondary w Light Mode */}
        <span
          className="mb-6 px-5 py-2 rounded-full border border-primary/50 bg-secondary/80 dark:bg-primary/10 text-primary dark:text-primary text-xs md:text-sm font-bold tracking-[0.3em] uppercase opacity-0 shadow-lg"
          style={{ animation: "fadeIn 1s forwards 0.5s" }}
        >
          Architektura & Wykonawstwo
        </span>

        {/* Tytuł: Używamy text-foreground, który automatycznie zmienia kolor #2e2e2e <-> #ede7d6 */}
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-[8.5rem] font-black max-w-7xl tracking-tighter leading-[0.85] mb-8 text-foreground drop-shadow-[0_5px_15px_rgba(0,0,0,0.2)] dark:drop-shadow-none"
        >
          Od wizji do <span className="text-primary italic">realizacji</span>
        </h1>

        {/* Opis: text-muted-foreground zapewnia czytelność bez "krzyczenia" */}
        <p
          ref={descriptionRef}
          className="text-lg md:text-2xl max-w-3xl text-foreground/80 dark:text-muted-foreground mb-12 leading-relaxed font-medium bg-background/20 backdrop-blur-sm md:bg-transparent rounded-lg p-4 md:p-0"
        >
          Projektujemy fotorealistyczne wnętrza 3D i tworzymy meble na wymiar,
          łącząc świat cyfrowej precyzji z rzemieślniczą pasją.
        </p>

        {/* PRZYCISKI */}
        <div
          ref={buttonsRef}
          className="flex flex-col md:flex-row gap-6 w-full max-w-2xl"
        >
          {/* Ścieżka: Wizualizacje */}
          <Link href="/wizualizacje" className="flex-1">
            <Button
              size="lg"
              className="nav-button w-full bg-primary text-primary-foreground hover:ring-4 hover:ring-primary/30 rounded-2xl px-8 py-12 text-xl font-black shadow-2xl transition-all hover:-translate-y-1 group"
            >
              <div className="flex flex-col items-center gap-2">
                <Camera className="w-8 h-8 group-hover:scale-110 transition-transform" />
                <span>Wizualizacje 3D</span>
                <span className="text-[10px] font-normal tracking-widest opacity-80">
                  ZOBACZ PROJEKTY
                </span>
              </div>
            </Button>
          </Link>

          {/* Ścieżka: Meble */}
          <Link href="/meble" className="flex-1">
            <Button
              variant="outline"
              size="lg"
              className="nav-button w-full border-2 border-primary/50 bg-background/50 backdrop-blur-md text-foreground hover:bg-secondary hover:text-secondary-foreground rounded-2xl px-8 py-12 text-xl font-black shadow-2xl transition-all hover:-translate-y-1 group"
            >
              <div className="flex flex-col items-center gap-2">
                <Cuboid className="w-8 h-8 group-hover:scale-110 transition-transform text-primary" />
                <span>Meble na wymiar</span>
                <span className="text-[10px] font-normal tracking-widest opacity-60">
                  ZOBACZ REALIZACJE
                </span>
              </div>
            </Button>
          </Link>
        </div>

        <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-foreground dark:text-muted-foreground/60">
            Zjedź niżej
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default HomePageVideo;
