"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Instagram, Facebook, Linkedin, ArrowUp } from "lucide-react";
import SocialMediaIcons from "../SocialMediaIcons";
import { useTheme } from "next-themes";
import Image from "next/image";

const BottomNav = () => {
  const { resolvedTheme } = useTheme();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const Logo = () => (
    <Image
      src={
        resolvedTheme === "dark"
          ? "/logo/Lilemar_poziomo_jasne.svg"
          : "/logo/Lilemar_poziomo_ciemne.svg"
      }
      alt="Lilemar logo"
      width={160}
      height={40}
      className="w-auto h-8 xl:h-10"
    />
  );

  return (
    <footer className="w-full bg-background text-secondary pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-5 flex flex-col gap-6">
            <Link href="/">
              <Logo />
            </Link>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              Tworzymy unikalne projekty architektoniczne i wnętrza, które łączą
              estetykę z najwyższą funkcjonalnością. Każdy detal ma znaczenie.
            </p>
            <SocialMediaIcons />
          </div>

          <div className="md:col-span-3">
            <h4 className="text-primary font-bold uppercase text-xs tracking-widest mb-6">
              Nawigacja
            </h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Strona Główna
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  O nas
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="hover:text-primary transition-colors"
                >
                  Projekty
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="hover:text-primary transition-colors"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-primary font-bold uppercase text-xs tracking-widest mb-6">
              Kontakt
            </h4>
            <div className="flex flex-col gap-4 text-sm">
              <p className="text-muted-foreground leading-relaxed">
                ul. Projektowa 12, <br />
                00-001 Warszawa
              </p>
              <a
                href="mailto:biuro@studiovision.pl"
                className="text-lg font-bold hover:text-primary transition-colors"
              >
                biuro@studiovision.pl
              </a>
              <a
                href="tel:+48000000000"
                className="text-lg font-bold hover:text-primary transition-colors"
              >
                +48 000 000 000
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:row items-center justify-between gap-6 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 font-medium">
          <p>
            © {new Date().getFullYear()} Studio Vision. Wszystkie prawa
            zastrzeżone.
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 hover:text-primary transition-colors cursor-pointer"
          >
            Wróć do góry
            <div className="p-2 rounded-full bg-white/5 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default BottomNav;
