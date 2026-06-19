import React from "react";
import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import type { AboutContent } from "@/types/content";

const DELAYS = [0, 150, 300, 450, 600, 750];

function renderInlineText(text: string, inView = false, paragraphDelay = 0): React.ReactNode {
  const parts = text.split(/(<u>[\s\S]*?<\/u>|<em>[\s\S]*?<\/em>)/);
  return parts.map((part, i) => {
    if (part.startsWith("<u>") && part.endsWith("</u>")) {
      const circleDelay = paragraphDelay + 800;
      return (
        <span key={i} className="relative inline-block whitespace-nowrap">
          {part.slice(3, -4)}
          <svg
            aria-hidden="true"
            className="absolute pointer-events-none overflow-visible"
            style={{ left: "-2px", bottom: "-2px", width: "calc(100% + 4px)", height: "8px" }}
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
          >
            <path
              d="M 0,7 C 9,3 19,9 33,5 C 47,2 55,8 70,6 C 81,4 94,8 100,5"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="200"
              strokeDashoffset="200"
              style={inView ? { animation: `draw-stroke 0.6s ease-out ${circleDelay}ms both` } : undefined}
            />
          </svg>
        </span>
      );
    }
    if (part.startsWith("<em>") && part.endsWith("</em>")) {
      return <em key={i}>{part.slice(4, -5)}</em>;
    }
    return part || null;
  });
}

const variantClass: Record<string, string> = {
  emphasis: "font-normal text-hero",
  italic: "italic text-muted-foreground",
  body: "",
};

export default function AboutSection({ content }: { content: AboutContent }) {
  const [contentRef, inView] = useInView<HTMLDivElement>(0.1);
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
<div className="space-y-4 lg:space-y-6 text-xl lg:text-2xl font-light leading-relaxed text-foreground font-serif">
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className={cn(
                  variantClass[para.variant],
                  !inView ? "opacity-0" : "animate-fade-up",
                )}
                style={inView ? { animationDelay: `${DELAYS[i] ?? i * 180}ms` } : undefined}
              >
                {renderInlineText(para.text, inView, DELAYS[i] ?? i * 180)}
              </p>
            ))}
          </div>

          <div
            className={cn(
              "mt-8 lg:mt-12 flex justify-center lg:justify-start",
              !inView ? "opacity-0" : "animate-fade-in [animation-delay:1500ms]",
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
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
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
