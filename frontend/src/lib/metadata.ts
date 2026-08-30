import type { Metadata } from "next";

const baseMetadata = {
    siteName: "Footsteps",
    siteUrl: "https://vercel.foosteps.app",
    twitterHandle: "@footsteps",
};

export const defaultMetdata: Metadata = {
    title: { default: "Footsteps", template: "%s | Footsteps"},
    description: "Learn more ",
    keywords: ["weather", ""],
    robots: { index: true, follow: true},
    viewport: { width: "device-width", initialScale: 1},
    themeColor: "#000000"
}

export function pageMetadata(
    title: string,
    description: string,
    keywords: string[] = []

): Metadata {
    return {
        title,
        description,
        keywords,
        openGraph: {
            type: "website",
            url: `${baseMetadata.siteUrl}`,
            title,
            description,
            siteName: baseMetadata.siteName
        },
        twitter: {
            card: "summary",
            title,
            description,
            creator: baseMetadata.twitterHandle,
        }
    }
}