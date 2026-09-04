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
        <Card className="w-full h-1/3 grid grid-cols-[0.5fr_2fr] overflow-hidden">
            <div className="relative h-32 w-full flex justify-center items-center">
                <Image
                    src={img}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="p-6 flex flex-col justify-between">
                <div>
                    <h2 className="text-sm tracking-widest font-thin text-gray-600">
                        {author} · {time}
                    </h2>
                    <h1 className="text-2xl font-bold mt-2">{title}</h1>
                </div>
                <Link 
                    href={link}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
                >
                    Read Signal <ArrowRight size={18} />
                </Link>
            </div>
        </Card>
    )
}