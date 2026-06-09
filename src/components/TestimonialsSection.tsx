import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import type { TestimonialsContent } from "@/types/content";

function VideoPlaceholder({ name, title }: { name: string; title: string }) {
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden group cursor-pointer bg-hero">
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse at 50% 40%, var(--color-primary) 0%, transparent 70%)`,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 bg-hero-foreground/15 backdrop-blur-sm border-2 border-hero-foreground/40">
          <svg width="24" height="24" viewBox="0 0 24 24" className="fill-hero-foreground opacity-90">
            <path d="M8 5L19 12L8 19V5Z" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <p className="text-sm font-light text-hero-foreground font-serif">{name}</p>
        <p className="text-xs text-hero-foreground/70">{title}</p>
      </div>
    </div>
  );
}

function AvatarPlaceholder({ name }: { name: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase();
  return (
    <div className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-light shrink-0 bg-primary/30 text-hero font-serif">
      {initials}
    </div>
  );
}

export default function TestimonialsSection({ content }: { content: TestimonialsContent }) {
  const [headingRef, headingInView] = useInView<HTMLDivElement>(0.3);
  const [videosRef, videosInView] = useInView<HTMLDivElement>(0.1);
  const [carouselRef, carouselInView] = useInView<HTMLDivElement>(0.1);
  const { badge, sectionTitle, carouselTitle, videos, reviews } = content;

  return (
    <section className="relative pt-12 pb-32 overflow-hidden bg-card">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse at 10% 80%, var(--color-primary) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 container mx-auto px-6 lg:px-16">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-20">
          <div
            className={cn(
              "flex items-center justify-center gap-4 mb-6",
              !headingInView ? "opacity-0" : "animate-fade-in [animation-delay:0ms]"
            )}
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
          <h2
            className={cn(
              "text-4xl lg:text-5xl font-light text-hero font-serif",
              !headingInView ? "opacity-0" : "animate-fade-up [animation-delay:150ms]"
            )}
          >
            {sectionTitle}
          </h2>
        </div>

        {/* Video cards — staggered per index */}
        <div ref={videosRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {videos.map((video, index) => (
            <div
              key={video.name}
              className={cn(
                "flex flex-col gap-4",
                !videosInView ? "opacity-0" : "animate-fade-up"
              )}
              style={videosInView ? { animationDelay: `${index * 160}ms` } : undefined}
            >
              <VideoPlaceholder name={video.name} title={video.title} />
              <p className="text-sm font-light leading-relaxed italic px-1 text-muted-foreground font-serif">
                "{video.quote}"
              </p>
            </div>
          ))}
        </div>

        {/* Carousel */}
        <div ref={carouselRef}>
          <div
            className={cn(
              !carouselInView ? "opacity-0" : "animate-fade-up [animation-delay:180ms]"
            )}
          >
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {reviews.map((client) => (
                  <CarouselItem key={client.name} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="h-full border-0 shadow-sm bg-sidebar-accent">
                      <CardContent className="p-8 flex flex-col gap-6 h-full">
                        <div className="flex items-center gap-4">
                          <AvatarPlaceholder name={client.name} />
                          <div>
                            <p className="font-normal text-sm text-hero font-serif">{client.name}</p>
                            <p className="text-xs font-light text-muted-foreground">{client.role}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} width="14" height="14" viewBox="0 0 24 24" className="fill-primary">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-sm font-light leading-relaxed flex-1 italic text-foreground font-serif">
                          "{client.review}"
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-4 mt-8">
                <CarouselPrevious className="relative static translate-y-0 left-auto top-auto rounded-full w-10 h-10 bg-primary/15 border border-primary/40 text-hero hover:bg-primary/25" />
                <CarouselNext className="relative static translate-y-0 right-auto top-auto rounded-full w-10 h-10 bg-primary/15 border border-primary/40 text-hero hover:bg-primary/25" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>

      <div className="relative mt-24 pt-12 border-t border-primary/20 text-center">
        <p className="text-sm font-light text-muted-foreground">
          © {new Date().getFullYear()} Aidan Belizaire ·{" "}
          <a href="mailto:hello@aidanbelizaire.com" className="text-primary hover:opacity-70 transition-opacity">
            hello@aidanbelizaire.com
          </a>
        </p>
      </div>
    </section>
  );
}
