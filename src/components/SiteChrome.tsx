import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ARTIST } from "@/data/dovgan";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/bio", label: "Biography" },
  { to: "/season", label: "Concerts" },
  { to: "/gallery", label: "Photogallery" },
  { to: "/media", label: "Media" },
  { to: "/press", label: "Press" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 md:px-12">
        <Link to="/" className="flex items-baseline gap-3">
          <span className="text-sm uppercase tracking-[0.34em] text-foreground">
            {ARTIST.name}
          </span>
          <span className="hidden text-[0.6875rem] uppercase tracking-[0.28em] text-primary sm:inline">
            {ARTIST.instrument}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.slice(1).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[0.6875rem] uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center border border-border lg:hidden"
        >
          <span className="relative block h-[7px] w-4">
            <span className="absolute inset-x-0 top-0 h-px bg-foreground" />
            <span className="absolute inset-x-0 bottom-0 h-px bg-foreground" />
          </span>
        </button>
      </div>

      {open ? (
        <nav className="border-t border-border bg-background px-6 py-6 lg:hidden">
          <ul className="space-y-4">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="text-[0.75rem] uppercase tracking-[0.24em] text-muted-foreground"
                  activeProps={{ className: "text-primary" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-10 text-[0.6875rem] uppercase tracking-[0.24em] text-muted-foreground md:flex-row md:items-center md:justify-between md:px-12">
        <span>{ARTIST.name} — {ARTIST.instrument}</span>
        <span>General management · AMC — Artists Management Company, Verona</span>
        <a
          href="mailto:office@amcmusic.com"
          className="text-primary transition-opacity hover:opacity-70"
        >
          office@amcmusic.com
        </a>
      </div>
    </footer>
  );
}

export function PageHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="fade-up mx-auto max-w-[1400px] px-6 pt-16 pb-14 md:px-12 md:pt-24">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-6 font-display text-5xl leading-[1.05] text-foreground md:text-7xl">
        {title}
      </h1>
      {lead ? (
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">{lead}</p>
      ) : null}
    </div>
  );
}
