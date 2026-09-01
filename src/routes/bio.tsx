import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeading, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { BIO_DATE, BIO_LANGUAGES, BIO_PARAGRAPHS, PHOTOS, QUOTES } from "@/data/dovgan";

export const Route = createFileRoute("/bio")({
  head: () => ({
    meta: [
      { title: "Biography — Alexandra Dovgan, Pianist" },
      {
        name: "description",
        content:
          "Full biography of pianist Alexandra Dovgan, born 2007, prize-winner of the Grand Piano Competition Moscow, in English, Italian, German and French.",
      },
      { property: "og:title", content: "Biography — Alexandra Dovgan" },
      {
        property: "og:description",
        content: "The complete biography of pianist Alexandra Dovgan, in four languages.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BioPage,
});

function BioPage() {
  const [lang, setLang] = useState("ENG");
  const active = BIO_LANGUAGES.find((l) => l.label === lang) ?? BIO_LANGUAGES[0];

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <PageHeading eyebrow="Biography / Piano" title="Alexandra Dovgan" />

      <div className="mx-auto grid max-w-[1400px] gap-14 px-6 md:grid-cols-[1fr_1.15fr] md:px-12">
        <div>
          <img
            src={PHOTOS[1].src}
            alt="Alexandra Dovgan portrait by Vladimir Volkov"
            className="w-full object-cover"
          />
          <img
            src={PHOTOS[8].src}
            alt="Alexandra Dovgan on stage, photographed by Vladimir Volkov"
            loading="lazy"
            className="mt-6 w-full object-cover"
          />
          <p className="mt-3 text-[0.6875rem] uppercase tracking-[0.24em] text-muted-foreground">
            Photography by Vladimir Volkov
          </p>
        </div>

        <div>
          <div className="flex flex-wrap gap-6 border-b border-border pb-4">
            {BIO_LANGUAGES.map((l) => (
              <button
                key={l.label}
                type="button"
                onClick={() => setLang(l.label)}
                className={`text-[0.6875rem] uppercase tracking-[0.24em] transition-colors ${
                  l.label === lang ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {lang === "ENG" ? (
            <div className="mt-8 space-y-6">
              {BIO_PARAGRAPHS.map((p) => (
                <p key={p.slice(0, 40)} className="text-base leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
              <p className="text-[0.6875rem] uppercase tracking-[0.24em] text-primary">{BIO_DATE}</p>
            </div>
          ) : (
            <div className="mt-8 space-y-6">
              <p className="text-base leading-relaxed text-muted-foreground">{active.excerpt}</p>
              <a href={active.pdf} target="_blank" rel="noreferrer" className="rule-link">
                {active.name} — full biography (PDF) →
              </a>
            </div>
          )}

          <div className="mt-12 border-t border-border pt-8">
            <p className="eyebrow">Download</p>
            <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
              {BIO_LANGUAGES.map((l) => (
                <a
                  key={l.pdf}
                  href={l.pdf}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[0.6875rem] uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-primary"
                >
                  [{l.label}] Biography
                </a>
              ))}
            </div>
          </div>

          <div className="mt-14 space-y-10">
            {QUOTES.map((q) => (
              <blockquote key={q.author} className="border-l border-primary/40 pl-6">
                <p className="font-display text-2xl italic leading-snug text-foreground">
                  “{q.text}”
                </p>
                <footer className="mt-4 text-[0.6875rem] uppercase tracking-[0.24em] text-primary">
                  {q.author} / {q.year}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
