import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface CardsData {
  title: string;
  des: string;
  link: string;
}

const data: CardsData[] = [
  {
    title: "Dashboard",
    des: "View your main dashboard and system overview.",
    link: "/riskMap",
  },
  {
    title: "Risk Map",
    des: "Explore environmental risks and affected areas.",
    link: "/riskMap",
  },
  {
    title: "Report",
    des: "View and manage environmental reports.",
    link: "/reports",
  },
  {
    title: "AI Agent",
    des: "Interact with the AI agent for insights and assistance.",
    link: "/aiAgent",
  },
  {
    title: "News & Insights",
    des: "Stay updated with the latest environmental news and insights.",
    link: "/newFeed",
  },
  {
    title: "Resources",
    des: "Access useful environmental resources and information.",
    link: "/resources",
  },
];

export default function AboutPage() {
  return (
    <main
      className="min-h-screen w-full flex flex-col px-4 sm:px-6 md:px-10 lg:px-12 py-8 sm:py-10 md:py-12 gap-8 sm:gap-10 md:gap-12 bg-background"
      aria-label="About page - Eight Connected Capabilities"
      role="main"
    >
      <div className="flex flex-col gap-2 sm:gap-3">
        <p 
          className="text-xs sm:text-sm font-thin text-muted-foreground tracking-wider uppercase"
          aria-label="Section heading"
        >
          Eight Connected Capabilities
        </p>
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-foreground"
          id="about-heading"
        >
          A Quieter Way to Understand Risk
        </h1>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
        role="region"
        aria-labelledby="about-heading"
        aria-describedby="capabilities-description"
      >
        {data.map((card, idx) => (
          <Link
            href={card.link}
            key={card.title}
            className="group h-full"
            aria-label={`Learn more about ${card.title}`}
            aria-describedby={`card-${idx}-desc`}
          >
            <Card className="h-full px-8 pb-8 justify-start bg-card border border-border hover:border-primary hover:shadow-lg transition-all duration-300 flex flex-col">
              <div className="flex flex-row justify-between gap-4">
                <span
                  className="inline-flex items-center justify-start w-8 sm:w-10 h-8 sm:h-10 text-secondary-foreground font-bold text-xs"
                  aria-label={`Card number ${idx + 1} of ${data.length}`}
                  role="doc-pagebreak"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="flex gap-4 justify-end">
                  <div className="inline-flex h-5 items-center justify-center gap-0.5 rounded-sm border px-1.5 text-[10px] leading-none text-foreground transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                    <span>Open</span>
                    <ArrowRight
                      aria-hidden="true"
                      className="h-2.5 w-2.5 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-3 sm:gap-4">
                <h2
                  className="text-lg sm:text-xl font-bold text-foreground line-clamp-2"
                  id={`card-${idx}-title`}
                >
                  {card.title}
                </h2>

                <p
                  className="text-sm sm:text-base text-muted-foreground line-clamp-3 flex-1"
                  id={`card-${idx}-desc`}
                >
                  {card.des}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      
      <p 
        id="capabilities-description" 
        className="sr-only"
      >
        Learn about our eight connected capabilities for understanding environmental risk.
      </p>
    </main>
  );
}