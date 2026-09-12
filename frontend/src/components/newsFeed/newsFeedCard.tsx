import { ArrowRight } from "lucide-react";
import { Card } from "../ui/card";
import Link from "next/link";
import Image from "next/image";

interface CardProps {
  author: string;
  img: string;
  time: number;
  title: string;
  link: string;
}

export default function NewsFeedCard({
  author,
  img,
  time,
  title,
  link,
}: CardProps) {
  return (
    <Card
      className="group grid h-1/3 w-full grid-cols-[0.5fr_2fr] overflow-hidden border border-[var(--border)] bg-[var(--card)] transition-all duration-300 hover:border-[var(--accent)]/50 hover:shadow-lg hover:shadow-[var(--accent)]/20 focus-within:ring-2 focus-within:ring-[var(--ring)]"
      role="article"
      aria-labelledby={`news-title-${link}`}
      aria-describedby={`news-meta-${link}`}
    >
      <div
        className="relative min-h-32 h-full w-full overflow-hidden bg-secondary/20"
        role="img"
        aria-label={`News article: ${title}`}
      >
        <Image
          src={img}
          alt={`Thumbnail image for: ${title}`}
          fill
          sizes="(max-width: 768px) 40vw, 25vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-between pl-2 pr-4 py-8">
        <div>
          <h2
            className="text-[11px] text-orange-300 tracking-wide uppercase"
            id={`news-meta-${link}`}
            aria-label={`By ${author}, published ${time} time units ago`}
          >
            {author} · {time}
          </h2>

          <h3
            className="mt-2 text-2xl font-bold text-foreground"
            id={`news-title-${link}`}
          >
            {title}
          </h3>
        </div>

        <Link
          href={link}
          className="mt-4 flex w-fit items-center gap-2 rounded px-1 text-[11px] text-primary transition-colors duration-300"
          aria-label={`Read full article: ${title}`}
        >
          Read Signal

          <ArrowRight
            size={18}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </Card>
  );
}