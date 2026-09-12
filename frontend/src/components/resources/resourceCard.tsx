import Link from "next/link";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { ArrowRight } from "lucide-react";

interface ResourceCardProps {
  title: string;
  desc: string;
  type: string;
  link: string;
}

export default function ResourceCard({
  title,
  desc,
  type,
  link,
}: ResourceCardProps) {
  return (
    <Link
      href={link}
      aria-label={`${title}: ${desc}. Type: ${type}. Click to access resource.`}
      className="rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
    >
      <Card
        className="group flex h-full flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-300 hover:border-[var(--accent)]/50 hover:shadow-lg hover:shadow-[var(--accent)]/20 focus:outline-none"
        role="article"
        aria-labelledby={`resource-title-${link}`}
        aria-describedby={`resource-desc-${link}`}
      >
        <div>
          <Badge
            className="mb-3 border border-[var(--accent)]/30 bg-[var(--secondary)] text-xs font-light text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
            aria-label={`Resource type: ${type}`}
          >
            {type}
          </Badge>

          <h3
            className="mb-2 text-xl font-semibold text-[var(--foreground)]"
            id={`resource-title-${link}`}
          >
            {title}
          </h3>

          <p
            className="text-sm text-[var(--muted-foreground)]"
            id={`resource-desc-${link}`}
          >
            {desc}
          </p>
        </div>

        <div className="mt-4 flex items-center gap-2 font-semibold text-[var(--accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Open

          <ArrowRight
            size={18}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </div>
      </Card>
    </Link>
  );
}