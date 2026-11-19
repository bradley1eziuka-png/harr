import { createFileRoute } from "@tanstack/react-router";

import { SiteLayout } from "@/components/painting/site-layout";
import { Hero } from "@/components/painting/hero";
import { Services } from "@/components/painting/services";
import { WhyChooseUs } from "@/components/painting/why-choose-us";
import { Gallery } from "@/components/painting/gallery";
import { Process } from "@/components/painting/process";
import { Trust } from "@/components/painting/trust";
import { Faq } from "@/components/painting/faq";
import { Estimator } from "@/components/painting/estimator";
import { FactsBand } from "@/components/painting/facts-band";
import { ContactSection } from "@/components/painting/contact-section";
import { Testimonials } from "@/components/painting/testimonials";
import { HOME_DESCRIPTION, HOME_TITLE, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => pageHead({ title: HOME_TITLE, description: HOME_DESCRIPTION, path: "/" }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <Services />
      <WhyChooseUs />
      <Estimator />
      <Gallery />
      <Trust />
      <Testimonials />
      <FactsBand />
      <Process />
      <Faq />
      <ContactSection />
    </SiteLayout>
  );
}
