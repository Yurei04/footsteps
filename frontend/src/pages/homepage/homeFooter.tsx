import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomeFooter() {
    return (
        <footer 
            className="flex flex-col h-auto bg-background w-full"
            role="contentinfo"
            aria-labelledby="footer-heading"
        >
            <div 
                className="flex flex-col bg-background w-full px-8 md:px-12 py-16 md:py-24 border-b border-border"
                role="region"
                aria-label="Footer main content"
            >
                <p 
                    className="text-xs tracking-widest font-thin text-muted-foreground uppercase mb-12"
                    aria-label="Earth Forward company name"
                >
                    Earth Forward
                </p>
                <div className="flex justify-between items-start gap-8">
                    <h2 
                        className="text-4xl md:text-6xl lg:text-6xl tracking-tight leading-tighter text-foreground flex-1"
                        id="footer-heading"
                    >
                        For decisions that protect<br/> people and place.
                    </h2>
                    
                    <Link
                        href={"/"}
                        className="flex items-center gap-2 rounded-full px-6 py-3 bg-foreground text-background hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card whitespace-nowrap mt-2"
                        aria-label="Start monitoring"
                        role="button"
                    >
                        Start monitoring
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>

            <div 
                className="flex p-6 md:p-8 justify-center items-center w-full"
                role="doc-endnote"
            >
                <p 
                    className="text-xs font-thin tracking-widest text-muted-foreground uppercase"
                    aria-label="Earth Forward tagline and company focus"
                >
                    Earth Forward · Environmental Intelligence
                </p>
            </div>
        </footer>
    );
}