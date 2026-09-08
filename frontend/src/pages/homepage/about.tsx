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
    title: "Monitoring",
    des: "Monitor environmental conditions and ongoing events.",
    link: "/monitoring",
  },
  {
    title: "News & Insights",
    des: "Stay updated with the latest environmental news and insights.",
    link: "/newFeed",
  },
  {
    title: "Impact Tracker",
    des: "Track environmental impact and progress over time.",
    link: "/impactTracker",
  },
  {
    title: "Resources",
    des: "Access useful environmental resources and information.",
    link: "/resources",
  },
  {
    title: "Settings",
    des: "Manage your preferences and application settings.",
    link: "/settings",
  },
];

export default function AboutPage() {
  return (
    <main
      className="min-h-screen w-full flex flex-col px-4 sm:px-6 md:px-10 lg:px-12 py-8 sm:py-10 md:py-12 gap-8 sm:gap-10 md:gap-12 bg-[#EBF8E3]"
      aria-label="About page - Eight Connected Capabilities"
      role="main"
    >
      <div className="flex flex-col gap-2 sm:gap-3">
        <p 
          className="text-xs sm:text-sm font-thin text-black/50 tracking-wider uppercase"
          aria-label="Section heading"
        >
          Eight Connected Capabilities
        </p>
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
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
          <article
            key={card.title}
            className="group h-full"
            aria-label={`${card.title}: ${card.des}`}
            role="article"
          >
            <Card 
              className="h-full px-8 pb-8 justify-start bg-white border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-300 flex flex-col"
              aria-describedby={`card-${idx}-desc`}
            >
              <div className="flex flex-row justify-between gap-4">
                <span
                  className="inline-flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-[#EBF8E3] font-bold text-sm sm:text-base"
                  aria-label={`Card number ${idx + 1} of ${data.length}`}
                  role="doc-pagebreak"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>

                <div className="flex gap-4">
                  <Link
                    href={card.link}
                    className="flex justify-evenly items-center rounded-xl px-2 py-2 border-2 text-md hover:bg-gray-50 transition-colors"
                    aria-label={`Learn more about ${card.title}`}
                    aria-describedby={`card-${idx}-desc`}
                  >
                    <span>Learn More</span>
                    <ArrowRight 
                      aria-hidden="true"
                      className="ml-2"
                    />
                  </Link>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-3 sm:gap-4">
                <h2 
                  className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2"
                  id={`card-${idx}-title`}
                >
                  {card.title}
                </h2>
                <p 
                  className="text-sm sm:text-base text-gray-600 line-clamp-3 flex-1"
                  id={`card-${idx}-desc`}
                >
                  {card.des}
                </p>
              </div>
            </Card>
          </article>
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