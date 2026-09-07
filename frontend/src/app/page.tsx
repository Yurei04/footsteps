import { pageMetadata } from "@/lib/metadata";
import Landing from "../pages/homepage/landing";
import AboutPage from "@/pages/homepage/about";
import HomeFooter from "@/pages/homepage/homeFooter";
import { Metadata } from "next";

export const metadata: Metadata = pageMetadata(
  "Landing Page",
  "Earth Forward turns weather, field reports, news, and place-based history into clear, verified guidance for communities facing environmental risks.",
  ["weather", "pollution", "earth"]
)

export default function Home() {
  return (
    <>
      <section 
        aria-labelledby="landing-heading"
        role="region"
      >
        <Landing />
      </section>

      <section 
        aria-labelledby="about-heading"
        role="region"
      >
        <AboutPage />
      </section>

      <footer 
        aria-labelledby="footer-heading"
        role="contentinfo"
      >
        <HomeFooter />
      </footer>
    </>
  );
}