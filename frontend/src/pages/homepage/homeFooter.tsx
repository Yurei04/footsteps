import Link from "next/link";

export default function HomeFooter() {
    return (
        <footer 
            className="flex flex-col h-auto bg-secondary w-full justify-center items-center"
            role="contentinfo"
            aria-labelledby="footer-heading"
        >
            <div 
                className="flex flex-col justify-start bg-card min-h-[60vh] w-full p-8 md:p-12 border-b border-border"
                role="region"
                aria-label="Footer main content"
            >
                <div 
                    className="flex justify-between items-start mb-12"
                    role="banner"
                >
                    <p 
                        className="text-xs tracking-widest font-thin text-muted-foreground uppercase"
                        aria-label="Earth Forward company name"
                    >
                        Earth Forward
                    </p>
                    <Link
                        href={"/"}
                        className="rounded-full px-6 py-2 bg-primary text-primary-foreground hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card"
                        aria-label="Return to home page"
                        role="button"
                    >
                        Home
                    </Link>
                </div>

                <div className="px-0 flex-1 flex items-start">
                    <h2 
                        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-foreground"
                        id="footer-heading"
                    >
                        For decisions that protect
                        <br />
                        people and place.
                    </h2>
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