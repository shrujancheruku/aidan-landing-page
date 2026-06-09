export interface CtaContent {
  text: string;
  email: string;
  subject: string;
}

export interface HeroContent {
  label: string;
  headingLine1: string;
  headingLine2: string;
  headingLine3: string;
  headingLine4: string;
  subtitle: string;
  cta: CtaContent;
}

export interface AboutParagraph {
  variant: "body" | "emphasis" | "italic";
  text: string;
}

export interface AboutContent {
  paragraphs: AboutParagraph[];
  cta: CtaContent;
}

export interface TestimonialVideo {
  name: string;
  title: string;
  quote: string;
}

export interface ClientReview {
  name: string;
  role: string;
  review: string;
}

export interface TestimonialsContent {
  badge: string;
  sectionTitle: string;
  carouselTitle: string;
  videos: TestimonialVideo[];
  reviews: ClientReview[];
}
