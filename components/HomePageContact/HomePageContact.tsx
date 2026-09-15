"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone, Camera, Hammer } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getFetcher } from "@/constans/apiFetcherFunction";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const HomePageContact = () => {
  const t = useTranslations("home");
  const containerRef = useRef<HTMLElement>(null);
  const [contactSettings, setContactSettings] = useState({
    visualizationEmail: "wizualizacje@lilemar.pl",
    visualizationPhone: "+48 000 000 001",
    customFurnitureEmail: "meble@lilemar.pl",
    customFurniturePhone: "+48 000 000 002",
  });

  useEffect(() => {
    getFetcher("/api/contact-settings")
      .then(setContactSettings)
      .catch(() => undefined);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
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
            {t("contact")}
          </span>

          <h2 className="contact-reveal text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-12">
            {t("changeVision")} <br />
            <span className="text-primary italic">{t("reality")}</span>
          </h2>

          <div className="contact-reveal w-full max-w-4xl bg-secondary/80 dark:bg-secondary/20 backdrop-blur-xl border border-white/10 p-8 md:p-16 rounded-[2.5rem] shadow-2xl mb-16">
            <p className="text-xl md:text-3xl text-secondary-foreground dark:text-foreground font-light leading-relaxed mb-12 italic">
              &quot;{t("contactQuote")}&quot;
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-6 bg-primary text-primary-foreground px-12 py-6 rounded-2xl text-xl font-black transition-all hover:scale-105 shadow-xl shadow-primary/20"
              >
                {t("startProject")}
                <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="contact-reveal grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-12 w-full max-w-4xl">
            <a
              href={`mailto:${contactSettings.visualizationEmail}`}
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-14 h-14 rounded-full bg-primary border-2 border-primary-foreground/20 flex items-center justify-center shadow-lg shadow-primary/25 transition-transform duration-300 group-hover:scale-110">
                <Mail
                  className="w-6 h-6 text-primary-foreground"
                  strokeWidth={2.5}
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground">
                {t("visualizationEmail")}
              </span>
              <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                {contactSettings.visualizationEmail}
              </span>
            </a>

            <a
              href={`tel:${contactSettings.visualizationPhone.replace(/\s/g, "")}`}
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-14 h-14 rounded-full bg-primary border-2 border-primary-foreground/20 flex items-center justify-center shadow-lg shadow-primary/25 transition-transform duration-300 group-hover:scale-110">
                <Phone
                  className="w-6 h-6 text-primary-foreground"
                  strokeWidth={2.5}
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground">
                {t("visualizationPhone")}
              </span>
              <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                {contactSettings.visualizationPhone}
              </span>
            </a>

            <a
              href={`mailto:${contactSettings.customFurnitureEmail}`}
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-14 h-14 rounded-full bg-primary border-2 border-primary-foreground/20 flex items-center justify-center shadow-lg shadow-primary/25 transition-transform duration-300 group-hover:scale-110">
                <Mail
                  className="w-6 h-6 text-primary-foreground"
                  strokeWidth={2.5}
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground text-center">
                {t("furnitureEmail")}
              </span>
              <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                {contactSettings.customFurnitureEmail}
              </span>
            </a>

            <a
              href={`tel:${contactSettings.customFurniturePhone.replace(/\s/g, "")}`}
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-14 h-14 rounded-full bg-primary border-2 border-primary-foreground/20 flex items-center justify-center shadow-lg shadow-primary/25 transition-transform duration-300 group-hover:scale-110">
                <Phone
                  className="w-6 h-6 text-primary-foreground"
                  strokeWidth={2.5}
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground text-center">
                {t("furniturePhone")}
              </span>
              <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                {contactSettings.customFurniturePhone}
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-30" />
    </section>
  );
};

export default HomePageContact;
