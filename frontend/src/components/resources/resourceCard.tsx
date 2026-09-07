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
        <Link 
          href={link}
          aria-label={`${title}: ${desc}. Type: ${type}. Click to access resource.`}
          className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-2xl"
        >
            <Card 
              className="flex flex-col justify-between p-6 h-full border rounded-2xl hover:shadow-lg transition-shadow focus:outline-none"
              role="article"
              aria-labelledby={`resource-title-${link}`}
              aria-describedby={`resource-desc-${link}`}
            >
                <div>
                    <Badge 
                      className="text-xs font-light mb-3"
                      aria-label={`Resource type: ${type}`}
                    >
                      {type}
                    </Badge>
                    <h3 
                      className="text-xl font-semibold mb-2"
                      id={`resource-title-${link}`}
                    >
                      {title}
                    </h3>
                    <p 
                      className="text-sm text-gray-600"
                      id={`resource-desc-${link}`}
                    >
                      {desc}
                    </p>
                </div>
            </Card>
        </Link>
    )
}