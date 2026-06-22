import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import type { TestimonialsContent } from "@/types/content";

function VideoPlaceholder({ name, role, src, thumbnail }: { name: string; role: string; src?: string; thumbnail?: string }) {
  const [playing, setPlaying] = React.useState(false);
  const [videoReady, setVideoReady] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handlePlay = () => setPlaying(true);

  if (src) {
    return (
      <div className="relative w-fit max-w-full mx-auto rounded-xl overflow-hidden group bg-hero">
        {/* Thumbnail stays in DOM to hold container size; fades out once video is ready */}
        {thumbnail ? (
          <img
            src={`/${thumbnail}`}
            alt={name}
            className="block max-h-[75vh] w-auto max-w-full transition-opacity duration-300"
            style={{ opacity: videoReady ? 0 : 1 }}
          />
        ) : (
          <div className="w-full aspect-video" />
        )}

        {/* Video overlaid at opacity 0, fades in on canPlay */}
        {playing && (
          <video
            ref={videoRef}
            src={`/${src}`}
            className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300"
            style={{ opacity: videoReady ? 1 : 0 }}
            onCanPlay={() => {
              setVideoReady(true);
              videoRef.current?.play().catch(() => {});
            }}
            controls
            playsInline
          />
        )}

        {/* Overlay hidden once playing starts */}
        {!playing && (
          <>
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(ellipse at 50% 40%, var(--color-primary) 0%, transparent 70%)`,
              }}
            />
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={handlePlay}
              onTouchEnd={(e) => { e.preventDefault(); handlePlay(); }}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 bg-hero-foreground/15 backdrop-blur-sm border-2 border-hero-foreground/40">
                <svg width="24" height="24" viewBox="0 0 24 24" className="fill-hero-foreground opacity-90">
                  <path d="M8 5L19 12L8 19V5Z" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-gradient-to-t from-black/70 to-transparent pointer-events-none">
              <p className="text-base font-normal text-hero-foreground font-serif leading-snug">{name}</p>
              {role && <p className="text-sm font-light text-hero-foreground/80 mt-0.5">{role}</p>}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden group cursor-pointer bg-hero">
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse at 50% 40%, var(--color-primary) 0%, transparent 70%)`,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-hero-foreground/15 backdrop-blur-sm border-2 border-hero-foreground/40">
          <svg width="24" height="24" viewBox="0 0 24 24" className="fill-hero-foreground opacity-90">
            <path d="M8 5L19 12L8 19V5Z" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-gradient-to-t from-black/70 to-transparent">
        <p className="text-base font-normal text-hero-foreground font-serif leading-snug">{name}</p>
        {role && <p className="text-sm font-light text-hero-foreground/80 mt-0.5">{role}</p>}
      </div>
    </div>
  );
}

function AvatarPlaceholder({ name, photo }: { name: string; photo?: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase();
  if (photo) {
    return (
      <img
        src={`/${photo}`}
        alt={name}
        className="w-24 h-24 rounded-full object-cover ring-4 ring-primary/20"
      />
    );
  }
  return (
    <div className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-light bg-primary/30 text-hero font-serif ring-4 ring-primary/20">
      {initials}
    </div>
  );
}

export default function TestimonialsSection({
  content,
}: {
  content: TestimonialsContent;
}) {
  const [headingRef, headingInView] = useInView<HTMLDivElement>(0.3);
  const [videosRef, videosInView] = useInView<HTMLDivElement>(0.1);
  const [reviewsRef, reviewsInView] = useInView<HTMLDivElement>(0.1);
  const [ctaRef, ctaInView] = useInView<HTMLDivElement>(0.3);
  const { badge, videos, reviews, cta } = content;
  const ctaHref = `mailto:${cta.email}?subject=${encodeURIComponent(cta.subject)}`;

  return (
    <section className="relative pt-6 pb-16 lg:pt-12 lg:pb-32 overflow-hidden bg-card">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse at 10% 80%, var(--color-primary) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 container mx-auto px-6 lg:px-16">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-10 lg:mb-20">
          <div
            className={cn(
              "flex items-center justify-center gap-4 mb-6",
              !headingInView ? "opacity-0" : "animate-fade-up",
            )}
            style={headingInView ? { animationDelay: "0ms" } : undefined}
          >
            <div className="w-16 h-px bg-primary/60" />
            <Badge
              variant="secondary"
              className="px-4 py-1 text-sm font-light rounded-full bg-primary/15 text-hero border border-primary/30"
            >
              {badge}
            </Badge>
            <div className="w-16 h-px bg-primary/60" />
          </div>
        </div>

        {/* Video cards */}
        <div
          ref={videosRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 lg:mb-24"
        >
          {videos.map((video, index) => (
            <div
              key={video.name}
              className={cn(
                "flex flex-col gap-4",
                !videosInView ? "opacity-0" : "animate-fade-up",
              )}
              style={videosInView ? { animationDelay: `${index * 160}ms` } : undefined}
            >
              <VideoPlaceholder name={video.name} role={video.role} src={video.src} thumbnail={video.thumbnail} />
            </div>
          ))}
        </div>

        {/* Review cards */}
        <div
          ref={reviewsRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {reviews.map((client, index) => (
            <div
              key={client.name}
              className={cn(
                !reviewsInView ? "opacity-0" : "animate-fade-up",
              )}
              style={reviewsInView ? { animationDelay: `${index * 120}ms` } : undefined}
            >
              <Card className="h-full border-0 bg-sidebar-accent">
                <CardContent className="p-8 flex flex-col items-center gap-4 text-center">
                  <AvatarPlaceholder name={client.name} photo={client.photo} />
                  <div>
                    <p className="font-normal text-base text-hero font-serif">
                      {client.name}
                    </p>
                    <p className="text-sm font-light text-muted-foreground mt-1">
                      {client.role}
                    </p>
                  </div>
                  <p className="text-sm font-light leading-relaxed italic text-foreground font-serif">
                    "{client.review}"
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div
        ref={ctaRef}
        className="relative z-10 container mx-auto px-6 lg:px-16 mt-16 lg:mt-24 text-center"
      >
        <div
          className={cn(
            !ctaInView ? "opacity-0" : "animate-fade-in [animation-delay:0ms]",
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

      <div className="relative mt-12 pt-8 lg:mt-24 lg:pt-12 border-t border-primary/20 text-center">
        <p className="text-sm font-light text-muted-foreground">
          © {new Date().getFullYear()} Aidan Belizaire ·{" "}
          <a
            href="mailto:hello@aidanbelizaire.com"
            className="text-primary hover:opacity-70 transition-opacity"
          >
            hello@aidanbelizaire.com
          </a>
        </p>
      </div>
    </section>
  );
}
