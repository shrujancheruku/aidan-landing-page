import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import type { AboutContent } from "@/types/content";

const DELAYS = [100, 280, 460, 640];

const variantClass: Record<string, string> = {
  emphasis: "text-2xl lg:text-3xl font-normal text-hero",
  italic: "text-lg lg:text-xl italic text-muted-foreground",
  body: "",
};

export default function AboutSection({ content }: { content: AboutContent }) {
  const [contentRef, inView] = useInView<HTMLDivElement>(0.1);
  const [waveRef, waveInView] = useInView<HTMLDivElement>(0.8);
  const { paragraphs, cta } = content;
  const ctaHref = `mailto:${cta.email}?subject=${encodeURIComponent(cta.subject)}`;

  return (
    <section className="relative pb-32 overflow-hidden bg-background -mt-px">
      {/* Decorative glow */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse at 100% 50%, var(--color-primary) 0%, transparent 70%)`,
        }}
      />

      <div
        ref={contentRef}
        className="relative z-10 container mx-auto px-6 lg:px-16"
      >
        <div className="max-w-3xl mx-auto">
          {/* Decorative leaf */}
          <div
            className={cn(
              "flex items-center justify-center gap-4 mb-6 lg:mb-12",
              !inView ? "opacity-0" : "animate-fade-in [animation-delay:0ms]",
            )}
          >
            <div className="w-12 h-px bg-primary" />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                className="fill-primary"
                opacity="0.7"
                d="M12 2C8 2 4 6 4 12C4 16 7 19.5 12 22C17 19.5 20 16 20 12C20 6 16 2 12 2Z"
              />
              <path
                className="stroke-primary"
                opacity="0.6"
                d="M12 2L12 22"
                strokeWidth="0.5"
                fill="none"
              />
            </svg>
            <div className="w-12 h-px bg-primary" />
          </div>

          <div className="space-y-4 lg:space-y-6 text-xl lg:text-2xl font-light leading-relaxed text-foreground font-serif">
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className={cn(
                  variantClass[para.variant],
                  !inView
                    ? "opacity-0"
                    : `animate-fade-up [animation-delay:${DELAYS[i] ?? i * 180}ms]`,
                )}
              >
                {para.text}
              </p>
            ))}
          </div>

          <div
            className={cn(
              "mt-8 lg:mt-12",
              !inView ? "opacity-0" : "animate-fade-in [animation-delay:1340ms]",
            )}
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
      </div>

      {/* Wave */}
      <div
        ref={waveRef}
        className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none"
      >
        <svg
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className={cn(waveInView && "animate-wave-ripple")}
          style={{
            height: "120px",
            display: "block",
            width: "calc(100% + 44px)",
            marginLeft: "-22px",
          }}
        >
          <path
            className="fill-card"
            d="M0,40 C180,100 360,0 540,60 C720,120 900,10 1080,70 C1260,120 1350,30 1440,50 L1440,120 L0,120 Z"
          />
        </svg>
      </div>
    </section>
  );
}
