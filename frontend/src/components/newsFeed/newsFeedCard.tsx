import { ArrowRight } from "lucide-react";
import { Card } from "../ui/card";
import Link from "next/link";
import Image from "next/image";

interface CardProps {
    author: string
    img: string
    time: number
    title: string
    link: string
}

export default function NewsFeedCard ({ author, img, time, title, link }: CardProps) {
    return (
        <Card 
          className="w-full h-1/3 grid grid-cols-[0.5fr_2fr] overflow-hidden hover:shadow-lg transition-shadow focus-within:ring-2 focus-within:ring-blue-500"
          role="article"
          aria-labelledby={`news-title-${link}`}
          aria-describedby={`news-meta-${link}`}
        >
            <div 
              className="relative h-32 w-full flex justify-center items-center"
              role="img"
              aria-label={`News article: ${title}`}
            >
                <Image
                    src={img}
                    alt={`Thumbnail image for: ${title}`}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="p-6 flex flex-col justify-between">
                <div>
                    <h2 
                      className="text-sm tracking-widest font-thin text-gray-600"
                      id={`news-meta-${link}`}
                      aria-label={`By ${author}, published ${time} time units ago`}
                    >
                        {author} · {time}
                    </h2>
                    <h3 
                      className="text-2xl font-bold mt-2"
                      id={`news-title-${link}`}
                    >
                      {title}
                    </h3>
                </div>
                <Link 
                    href={link}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1"
                    aria-label={`Read full article: ${title}`}
                >
                    Read Signal 
                    <ArrowRight 
                      size={18}
                      aria-hidden="true"
                    />
                </Link>
            </div>
        </Card>
    )
}