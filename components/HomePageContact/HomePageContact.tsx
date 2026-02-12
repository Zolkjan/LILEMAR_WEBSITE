"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, MessageSquare } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HomePageContact = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      tl.fromTo(
        ".contact-reveal",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" },
      );

      gsap.to(".contact-bg-icon", {
        y: -20,
        rotation: 10,
        duration: 3,
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
      className="relative w-full py-24 md:py-32 bg-background overflow-hidden border-t border-border"
    >
      <div className="contact-bg-icon absolute -right-12 -bottom-12 opacity-[0.03] pointer-events-none">
        <MessageSquare size={400} className="text-primary" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <span className="contact-reveal text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6">
            Zacznijmy projekt
          </span>

          <h2 className="contact-reveal text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none mb-8">
            Masz wizję? My mamy <br />
            <span className="text-primary italic font-serif">rozwiązania</span>.
          </h2>

          <p className="contact-reveal text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl font-light">
            Niezależnie od tego, czy planujesz remont mieszkania, czy budowę
            domu marzeń – nasz zespół jest gotowy, by nadać Twoim pomysłom
            realny kształt.
          </p>

          <div className="contact-reveal">
            <Link
              href="/kontakt"
              className="group relative inline-flex items-center gap-4 bg-secondary text-secondary-foreground px-10 py-5 rounded-full text-lg font-bold transition-transform hover:scale-105 active:scale-95"
            >
              Porozmawiajmy o projekcie
              <div className="bg-primary text-primary-foreground p-2 rounded-full group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight size={24} />
              </div>
            </Link>
          </div>

          <div className="contact-reveal mt-12 flex gap-8">
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                E-mail
              </span>
              <a
                href="mailto:hello@studio.pl"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                hello@studio.pl
              </a>
            </div>
            <div className="w-px h-12 bg-border hidden sm:block" />
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                Zadzwoń
              </span>
              <a
                href="tel:+48000000000"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                +48 000 000 000
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePageContact;
