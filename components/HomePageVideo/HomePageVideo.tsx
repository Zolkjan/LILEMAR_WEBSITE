"use client";

import React, { useRef } from "react";
import { Button } from "../ui/button";
import { MoveRight, Mail } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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
      <div className="absolute inset-0 z-0">
        <video
          className="video-bg object-cover w-full h-full"
          autoPlay
          loop
          muted
          playsInline
          src="/videos/main_video.mp4"
        />
        <div className="absolute inset-0 bg-linear-to-b from-secondary/40 via-secondary/60 to-background" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-foreground text-center">
        <span
          className="mb-4 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs md:text-sm font-medium tracking-[0.3em] uppercase opacity-0 animate-fade-in"
          style={{ animation: "fadeIn 1s forwards 0.5s" }}
        >
          Architektura & Wnętrza
        </span>

        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-[10rem] font-black max-w-6xl tracking-tighter leading-[0.85] mb-6 drop-shadow-2xl"
        >
          Od wizji do <span className="text-primary italic">realizacji</span>
        </h1>

        <p
          ref={descriptionRef}
          className="text-lg md:text-xl max-w-2xl text-muted-foreground mb-10 leading-relaxed font-light"
        >
          Tworzymy przestrzenie, które inspirują. Od koncepcji, przez
          fotorealistyczne wizualizacje, aż po perfekcyjne wykonanie mebli.
        </p>

        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Button
            size="lg"
            className="nav-button bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 py-8 text-lg font-bold shadow-xl shadow-primary/20 transition-transform hover:scale-105 group"
          >
            Nasze Portfolio
            <MoveRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="nav-button border-primary/40 text-foreground hover:bg-secondary hover:text-secondary-foreground rounded-full px-10 py-8 text-lg font-bold transition-all"
          >
            <Mail className="mr-2 w-5 h-5" />
            Napisz do nas
          </Button>
        </div>

        <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground">
            Odkryj
          </span>
          <div className="w-px h-16 bg-linear-to-b from-primary to-transparent" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePageVideo;
