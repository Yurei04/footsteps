import Link from "next/link";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

interface ResourceCardProps {
    title: string
    desc: string
    type: string
    link: string
}

export default function ResourceCard ({ title, desc, type, link }: ResourceCardProps) {
    return (
        <Link href={link}>
            <Card className="flex flex-col justify-between p-6 h-full border rounded-2xl hover:shadow-lg transition-shadow">
                <div>
                    <Badge className="text-xs font-light mb-3">{type}</Badge>
                    <h1 className="text-xl font-semibold mb-2">{title}</h1>
                    <p className="text-sm text-gray-600">{desc}</p>
                </div>
            </Card>
        </Link>
    )
}