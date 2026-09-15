"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { getFetcher } from "@/constans/apiFetcherFunction";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react";
import { useTranslations } from "next-intl";

const ContactPage = () => {
  const t = useTranslations("contact");
  const containerRef = useRef<HTMLDivElement>(null);
  const formStartedAt = useRef(0);
  const lastSubmitAt = useRef(0);
  const [contactTarget, setContactTarget] = useState<
    "visualization" | "customFurniture"
  >("visualization");
  const [contactSettings, setContactSettings] = useState({
    visualizationEmail: "wizualizacje@lilemar.pl",
    visualizationPhone: "+48 000 000 001",
    customFurnitureEmail: "meble@lilemar.pl",
    customFurniturePhone: "+48 000 000 002",
    postalCode: "00-000",
    city: "Warszawa",
    street: "ul. Projektowa",
    buildingNumber: "12",
    apartmentNumber: "",
  });

  useEffect(() => {
    formStartedAt.current = Date.now();
    getFetcher("/api/contact-settings")
      .then(setContactSettings)
      .catch(() => undefined);
  }, []);

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (formData.get("website")) {
      toast.error(t("formError"));
      return;
    }

    if (Date.now() - formStartedAt.current < 2500) {
      toast.error(t("wait"));
      return;
    }

    if (Date.now() - lastSubmitAt.current < 10000) {
      toast.error(t("retry"));
      return;
    }

    lastSubmitAt.current = Date.now();
    const recipient =
      contactTarget === "visualization"
        ? contactSettings.visualizationEmail
        : contactSettings.customFurnitureEmail;
    const subject = String(formData.get("subject") || t("subject"));
    const body = [
      `${t("name")}: ${formData.get("name") || ""}`,
      `${t("email")}: ${formData.get("email") || ""}`,
      "",
      String(formData.get("message") || ""),
    ].join("\n");

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

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
            {t("badge")}
          </Badge>
        </div>
        <h1 className="reveal-contact text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.8] uppercase italic font-serif">
          {t("title")}
        </h1>
        <p className="reveal-contact mt-8 text-xl md:text-2xl font-light text-muted-foreground uppercase tracking-tight max-w-2xl">
          {t("intro")}
        </p>
      </section>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* LEWA KOLUMNA: FORMULARZ (Shadcn) */}
        <section className="lg:col-span-7 reveal-contact">
          <Card className="border-border bg-card/50 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
            <form onSubmit={handleContactSubmit} className="space-y-8">
              <input
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-px w-px opacity-0"
              />
              <div className="space-y-3">
                <p className="text-[10px] uppercase font-black tracking-widest ml-1">
                  {t("targetLabel")}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-xl bg-background border border-border p-1">
                  <button
                    type="button"
                    aria-pressed={contactTarget === "visualization"}
                    onClick={() => setContactTarget("visualization")}
                    className={`h-12 rounded-lg px-4 text-left text-xs font-black uppercase tracking-widest transition-colors ${
                      contactTarget === "visualization"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t("visualizations")}
                  </button>
                  <button
                    type="button"
                    aria-pressed={contactTarget === "customFurniture"}
                    onClick={() => setContactTarget("customFurniture")}
                    className={`h-12 rounded-lg px-4 text-left text-xs font-black uppercase tracking-widest transition-colors ${
                      contactTarget === "customFurniture"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t("furniture")}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("sentTo")}{" "}
                  {contactTarget === "visualization"
                    ? contactSettings.visualizationEmail
                    : contactSettings.customFurnitureEmail}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest ml-1">
                    {t("name")}
                  </label>
                  <Input
                    name="name"
                    required
                    placeholder="Jan Kowalski"
                    className="h-14 rounded-xl bg-background border-border focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest ml-1">
                    {t("email")}
                  </label>
                  <Input
                    name="email"
                    type="email"
                    required
                    placeholder="biuro@projekt.pl"
                    className="h-14 rounded-xl bg-background border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest ml-1">
                  {t("subject")}
                </label>
                <Input
                  name="subject"
                  required
                  placeholder={t("subjectPlaceholder")}
                  className="h-14 rounded-xl bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest ml-1">
                  {t("message")}
                </label>
                <Textarea
                  name="message"
                  required
                  placeholder={t("messagePlaceholder")}
                  className="min-h-[150px] rounded-xl bg-background border-border resize-none"
                />
              </div>

              <Button className="w-full h-16 rounded-2xl bg-primary text-primary-foreground hover:bg-foreground hover:text-background transition-all font-black uppercase text-[10px] tracking-[0.4em] group">
                {t("send")}
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
                    {t("visualizationEmail")}
                  </p>
                  <a
                    href={`mailto:${contactSettings.visualizationEmail}`}
                    className="text-xl font-bold italic font-serif hover:text-primary transition-colors"
                  >
                    {contactSettings.visualizationEmail}
                  </a>
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
                    {t("visualizationPhone")}
                  </p>
                  <a
                    href={`tel:${contactSettings.visualizationPhone.replace(/\s/g, "")}`}
                    className="text-xl font-bold italic font-serif hover:text-primary transition-colors"
                  >
                    {contactSettings.visualizationPhone}
                  </a>
                </div>
              </div>
            </Card>

            <Card className="info-card border-none bg-secondary/20 rounded-3xl p-8 hover:bg-secondary/40 transition-colors">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-primary tracking-widest">
                    {t("furnitureEmail")}
                  </p>
                  <a
                    href={`mailto:${contactSettings.customFurnitureEmail}`}
                    className="text-xl font-bold italic font-serif hover:text-primary transition-colors"
                  >
                    {contactSettings.customFurnitureEmail}
                  </a>
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
                    {t("furniturePhone")}
                  </p>
                  <a
                    href={`tel:${contactSettings.customFurniturePhone.replace(/\s/g, "")}`}
                    className="text-xl font-bold italic font-serif hover:text-primary transition-colors"
                  >
                    {contactSettings.customFurniturePhone}
                  </a>
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
                    {t("studio")}
                  </p>
                  <p className="text-xl font-bold italic font-serif">
                    {contactSettings.street} {contactSettings.buildingNumber}
                    {contactSettings.apartmentNumber &&
                      `/${contactSettings.apartmentNumber}`}
                    , {contactSettings.postalCode} {contactSettings.city}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Social Media */}
          <div className="reveal-contact pt-10 border-t border-border">
            <p className="text-[10px] uppercase font-black tracking-[0.5em] mb-6 opacity-50 text-center lg:text-left">
              {t("follow")}
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
          {t("faqTitle")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(t.raw("faq") as Array<{ question: string; answer: string }>).map(
            (item, i) => (
              <div
                key={i}
                className="reveal-contact p-8 border border-border rounded-[2rem] hover:bg-secondary/10 transition-colors"
              >
                <h4 className="text-sm font-black uppercase tracking-widest mb-3 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />{" "}
                  {item.question}
                </h4>
                <p className="text-muted-foreground font-light leading-relaxed italic">
                  {item.answer}
                </p>
              </div>
            ),
          )}
        </div>
      </section>

      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-[-1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default ContactPage;
