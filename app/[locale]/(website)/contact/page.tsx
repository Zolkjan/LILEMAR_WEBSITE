"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Instagram,
  Facebook,
  Linkedin,
  ArrowRight,
} from "lucide-react";

const ContactPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Wejście nagłówków
      gsap.from(".reveal-contact", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
      });

      // Animacja kart informacyjnych
      gsap.from(".info-card", {
        x: -30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".info-grid",
          start: "top 80%",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="bg-background text-foreground min-h-screen pt-40 pb-20 px-6 overflow-hidden"
    >
      {/* NAGŁÓWEK */}
      <section className="max-w-7xl mx-auto mb-20">
        <div className="reveal-contact mb-6">
          <Badge
            variant="outline"
            className="border-primary/40 text-primary px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.4em]"
          >
            Kontakt — 04
          </Badge>
        </div>
        <h1 className="reveal-contact text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.8] uppercase italic font-serif">
          Poroz
          <span className="text-primary not-italic font-sans">mawiajmy</span>
        </h1>
        <p className="reveal-contact mt-8 text-xl md:text-2xl font-light text-muted-foreground uppercase tracking-tight max-w-2xl">
          Twoja wizja zasługuje na najlepszą realizację. Napisz do nas lub
          odwiedź nasze studio.
        </p>
      </section>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* LEWA KOLUMNA: FORMULARZ (Shadcn) */}
        <section className="lg:col-span-7 reveal-contact">
          <Card className="border-border bg-card/50 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest ml-1">
                    Imię i Nazwisko
                  </label>
                  <Input
                    placeholder="Jan Kowalski"
                    className="h-14 rounded-xl bg-background border-border focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest ml-1">
                    E-mail
                  </label>
                  <Input
                    type="email"
                    placeholder="biuro@projekt.pl"
                    className="h-14 rounded-xl bg-background border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest ml-1">
                  Temat Projektu
                </label>
                <Input
                  placeholder="Wizualizacja salonu / Projekt mebli"
                  className="h-14 rounded-xl bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest ml-1">
                  Twoja Wiadomość
                </label>
                <Textarea
                  placeholder="Opisz krótko swoje oczekiwania..."
                  className="min-h-[150px] rounded-xl bg-background border-border resize-none"
                />
              </div>

              <Button className="w-full h-16 rounded-2xl bg-primary text-primary-foreground hover:bg-foreground hover:text-background transition-all font-black uppercase text-[10px] tracking-[0.4em] group">
                Wyślij Zapytanie
                <Send className="ml-3 w-4 h-4 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </form>
          </Card>
        </section>

        {/* PRAWA KOLUMNA: INFO & SOCIALS */}
        <section className="lg:col-span-5 flex flex-col justify-between space-y-12">
          <div className="info-grid space-y-6">
            <Card className="info-card border-none bg-secondary/20 rounded-3xl p-8 hover:bg-secondary/40 transition-colors">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-primary tracking-widest">
                    Napisz do nas
                  </p>
                  <p className="text-xl font-bold italic font-serif">
                    biuro@lilemastudio.pl
                  </p>
                </div>
              </div>
            </Card>

            <Card className="info-card border-none bg-secondary/20 rounded-3xl p-8 hover:bg-secondary/40 transition-colors">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-primary tracking-widest">
                    Zadzwoń
                  </p>
                  <p className="text-xl font-bold italic font-serif">
                    +48 500 600 700
                  </p>
                </div>
              </div>
            </Card>

            <Card className="info-card border-none bg-secondary/20 rounded-3xl p-8 hover:bg-secondary/40 transition-colors">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-primary tracking-widest">
                    Studio
                  </p>
                  <p className="text-xl font-bold italic font-serif">
                    ul. Projektowa 12, Warszawa
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Social Media */}
          <div className="reveal-contact pt-10 border-t border-border">
            <p className="text-[10px] uppercase font-black tracking-[0.5em] mb-6 opacity-50 text-center lg:text-left">
              Śledź naszą twórczość
            </p>
            <div className="flex justify-center lg:justify-start gap-4">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="icon"
                  className="w-14 h-14 rounded-2xl border-border hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <Icon size={20} />
                </Button>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* FAQ SECTION - Shadcn Accordion lub Custom Grid */}
      <section className="max-w-7xl mx-auto mt-40">
        <h2 className="reveal-contact text-4xl font-black uppercase tracking-tighter mb-12">
          Częste <span className="text-primary italic font-serif">Pytania</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              q: "Ile trwa proces projektowy?",
              a: "Standardowy czas to od 2 do 6 tygodni, zależnie od stopnia skomplikowania.",
            },
            {
              q: "Czy wykonujecie meble na wymiar?",
              a: "Tak, współpracujemy z najlepszymi stolarniami, realizując nasze autorskie projekty.",
            },
            {
              q: "W jakich miastach działacie?",
              a: "Działamy stacjonarnie w Warszawie, ale projekty wizualizacji realizujemy online w całej Polsce.",
            },
            {
              q: "Jaki jest koszt wizualizacji?",
              a: "Cena ustalana jest indywidualnie na podstawie metrażu i stylu wnętrza.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="reveal-contact p-8 border border-border rounded-[2rem] hover:bg-secondary/10 transition-colors"
            >
              <h4 className="text-sm font-black uppercase tracking-widest mb-3 flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" /> {item.q}
              </h4>
              <p className="text-muted-foreground font-light leading-relaxed italic">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-[-1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default ContactPage;
