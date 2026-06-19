import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import type { HeroContent } from "@/types/content";

export default function HeroSection({ content }: { content: HeroContent }) {
  const {
    label,
    headingLine1,
    headingLine2,
    headingLine3,
    headingLine4,
    subtitle,
    cta,
  } = content;
  const ctaHref = `mailto:${cta.email}?subject=${encodeURIComponent(cta.subject)}`;

  return (
    <section className="relative lg:min-h-screen flex items-center overflow-hidden bg-hero">
      {/* Decorative glows */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 50%, var(--color-primary) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, var(--color-ring)   0%, transparent 50%)
          `,
        }}
      />

      <div className="relative z-10 container mx-auto px-6 lg:px-16 pt-8 pb-32 lg:py-24 grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">
        {/* Text side */}
        <div className="order-2 lg:order-1 flex flex-col gap-5 lg:gap-8">
          <div>
            <p
              className="uppercase tracking-widest text-sm mb-6 font-light text-ring animate-fade-up text-center lg:text-left"
              style={{ animationDelay: "0ms" }}
            >
              {label}
            </p>
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-light leading-tight text-hero-foreground font-serif">
              <span className="block animate-fade-up" style={{ animationDelay: "150ms" }}>
                {headingLine1}
              </span>
              <span className="block animate-fade-up" style={{ animationDelay: "300ms", paddingLeft: "0.12em" }}>
                <em className="italic font-normal text-ring">{headingLine2}</em>
              </span>
              <span className="block animate-fade-up" style={{ animationDelay: "450ms" }}>
                {headingLine3}
                <br />
                {headingLine4}
              </span>
            </h1>
          </div>

          <p
            className="text-lg lg:text-xl font-light leading-relaxed max-w-md text-hero-foreground/80 animate-fade-up"
            style={{ animationDelay: "600ms" }}
          >
            {subtitle}
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 animate-fade-up items-center lg:items-start"
            style={{ animationDelay: "750ms" }}
          >
            <a href={ctaHref}>
              <Button
                size="lg"
                className="text-base px-8 py-6 rounded-full font-light bg-cta text-cta-foreground hover:bg-cta/90 transition-all duration-300 hover:scale-105"
              >
                {cta.text}
              </Button>
            </a>
          </div>
        </div>

        {/* Photo */}
        <div
          className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-scale"
          style={{ animationDelay: "150ms" }}
        >
          <div className="relative">
            <div
              className="absolute -inset-2 lg:-inset-4 rounded-full opacity-20"
              style={{
                background: `conic-gradient(from 0deg, var(--color-primary), var(--color-ring), var(--color-primary))`,
              }}
            />
            <div
              className="relative w-64 h-64 lg:w-[28rem] lg:h-[28rem] rounded-full overflow-hidden"
              style={{
                boxShadow: `0 32px 64px oklch(0 0 0 / 0.4), 0 0 0 3px color-mix(in oklch, var(--color-primary) 60%, transparent)`,
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}/profile-photo.jpg`}
                alt="Aidan Belizaire"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect fill='%23526b3a' width='400' height='400'/%3E%3Ccircle fill='%234a6235' cx='200' cy='160' r='80'/%3E%3Cellipse fill='%234a6235' cx='200' cy='370' rx='130' ry='100'/%3E%3C/svg%3E";
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ height: "120px", display: "block", width: "100%" }}
        >
          <path
            className="fill-background"
            d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
          />
        </svg>
      </div>
    </section>
  );
}
