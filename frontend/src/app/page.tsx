import { pageMetadata } from "@/lib/metadata";
import Landing from "../pages/homepage/landing";
import AboutPage from "@/pages/homepage/about";
import HomeFooter from "@/pages/homepage/homeFooter";

export const metadata = pageMetadata(
  "Know what’s changing. Act with care.",
  "Earth Forward turns weather, field reports, news, and place-based history into clear, verified guidance for communities facing environmental risks.",
  ["weather", "pollution", "earth"]
)

export default function Home() {
  return (
    <>
      <section className="">
        <Landing />
      </section>

      <section className="">
        <AboutPage />
      </section>

      <section className="">
        <HomeFooter />
      </section>
    </>
  );
}
