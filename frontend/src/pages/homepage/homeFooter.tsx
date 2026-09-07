import Link from "next/link";

export default function HomeFooter() {
    return (
        <footer 
            className="flex flex-col h-[300px] bg-[#EBF8E3] w-full justify-center items-center"
            role="contentinfo"
            aria-labelledby="footer-heading"
        >
            <div 
                className="flex flex-col justify-start bg-[#E3faeb] min-h-3/4 w-full p-8"
                role="region"
                aria-label="Footer main content"
            >
                <div 
                    className="flex justify-between items-center"
                    role="banner"
                >
                    <p 
                        className="text-xs tracking-widest font-thin text-black"
                        aria-label="Earth Forward company name"
                    >
                        EARTH FORWARD
                    </p>
                    <Link
                        href={"/"}
                        className="rounded-xl px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
                        aria-label="Return to home page"
                        role="button"
                    >
                        Home
                    </Link>
                </div>

                <div className="px-4">
                    <h2 
                        className="text-4xl font-bold tracking-widest"
                        id="footer-heading"
                    >
                        For decisions that protect
                        <br />
                        people and place.
                    </h2>
                </div>
            </div>

            <div 
                className="flex p-6 justify-center items-center"
                role="doc-endnote"
            >
                <p 
                    className="text-xs font-thin tracking-widest text-black"
                    aria-label="Earth Forward tagline and company focus"
                >
                    EARTH FORWARD · ENVIRONMENTAL INTELLIGENCE
                </p>
            </div>
        </footer>
    );
}