"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HomePageAbout = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".reveal-text",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: false,
          },
        },
      );

      gsap.fromTo(
        ".about-line",
        { width: 0 },
        {
          width: "100%",
          duration: 1.5,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
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
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="text-primary font-bold tracking-widest uppercase text-sm">
                01 — O nas
              </span>
              <div className="about-line h-px bg-primary/30 w-full" />
            </div>
            <h2 className="reveal-text text-4xl md:text-5xl font-black leading-tight tracking-tighter">
              Tworzymy przestrzenie, które{" "}
              <span className="text-primary italic font-serif">
                opowiadają historię
              </span>
              .
            </h2>
          </div>

          <div
            ref={textRef}
            className="lg:col-span-7 lg:col-start-6 flex flex-col gap-8"
          >
            <p className="reveal-text text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              Nasze studio to połączenie pasji do architektury z rzemieślniczą
              precyzją. Wierzymy, że każde wnętrze powinno być lustrem
              osobowości jego mieszkańców, dlatego od lat łączymy nowoczesny
              design z funkcjonalnością mebli na wymiar.
            </p>

            <div className="reveal-text grid grid-cols-2 md:grid-cols-3 gap-8 mt-4">
              <div>
                <h4 className="text-3xl font-bold text-primary">12+</h4>
                <p className="text-sm uppercase tracking-wider text-muted-foreground">
                  Lat doświadczenia
                </p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-primary">350+</h4>
                <p className="text-sm uppercase tracking-wider text-muted-foreground">
                  Zrealizowanych wizji
                </p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-primary">100%</h4>
                <p className="text-sm uppercase tracking-wider text-muted-foreground">
                  Pasji w każdym detalu
                </p>
              </div>
            </div>

            <div className="reveal-text mt-8">
              <p className="text-lg border-l-2 border-primary pl-6 py-2 italic text-muted-foreground">
                "Nie projektujemy tylko pomieszczeń. Projektujemy Twoje
                codzienne doświadczenia."
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
    </section>
  );
};

export default HomePageAbout;
