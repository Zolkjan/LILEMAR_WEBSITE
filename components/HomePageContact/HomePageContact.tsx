"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone, Camera, Hammer } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HomePageContact = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });

      tl.fromTo(
        ".contact-reveal",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power4.out" },
      );

      gsap.to(".floating-icon", {
        y: -30,
        x: 10,
        rotation: 15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 md:py-44 bg-background overflow-hidden border-t border-border"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03] dark:opacity-[0.07]">
        <Camera
          size={300}
          className="floating-icon absolute -left-10 top-20 text-primary"
        />
        <Hammer
          size={250}
          className="floating-icon absolute -right-10 bottom-20 text-primary"
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,var(--primary)_0%,transparent_60%)] opacity-[0.05]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <span className="contact-reveal px-4 py-1 border border-primary/30 text-primary text-[10px] font-black tracking-[0.5em] uppercase rounded-full mb-8">
            Kontakt
          </span>

          <h2 className="contact-reveal text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-12">
            Zmieńmy wizję <br />
            <span className="text-primary italic">w rzeczywistość.</span>
          </h2>

          <div className="contact-reveal w-full max-w-4xl bg-secondary/80 dark:bg-secondary/20 backdrop-blur-xl border border-white/10 p-8 md:p-16 rounded-[2.5rem] shadow-2xl mb-16">
            <p className="text-xl md:text-3xl text-secondary-foreground dark:text-foreground font-light leading-relaxed mb-12 italic">
              "Niezależnie od tego, czy potrzebujesz{" "}
              <span className="text-primary not-italic font-bold">
                fotorealistycznego projektu
              </span>
              , czy perfekcyjnie wykonanych{" "}
              <span className="text-primary not-italic font-bold">
                mebli na wymiar
              </span>{" "}
              – jesteśmy tu, by to zbudować."
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <Link
                href="/kontakt"
                className="group relative inline-flex items-center gap-6 bg-primary text-primary-foreground px-12 py-6 rounded-2xl text-xl font-black transition-all hover:scale-105 shadow-xl shadow-primary/20"
              >
                ROZPOCZNIJ PROJEKT
                <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="contact-reveal grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-2xl">
            <a
              href="mailto:biuro@twojastrona.pl"
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                <Mail className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground">
                Napisz do nas
              </span>
              <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                biuro@twojastrona.pl
              </span>
            </a>

            <a
              href="tel:+48000000000"
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                <Phone className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground">
                Zadzwoń
              </span>
              <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                +48 000 000 000
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
    </section>
  );
};

export default HomePageContact;
