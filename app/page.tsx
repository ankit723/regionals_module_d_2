import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Timeline from "./components/timeline";
import Products from "./components/products";
import Stats from "./components/stats";
import Testimonials from "./components/testimonials";
import Sustainability from "./components/sustainability";
import CTA from "./components/cta";
import Footer from "./components/footer";
import SectionDivider from "./components/section-divider";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SectionDivider variant="gold" />
      <Timeline />
      <SectionDivider variant="cyan" />
      <Products />
      <SectionDivider variant="gold" />
      <Stats />
      <SectionDivider variant="cyan" />
      <Testimonials />
      <SectionDivider variant="green" />
      <Sustainability />
      <SectionDivider variant="cyan" />
      <CTA />
      <Footer />
    </>
  );
}
