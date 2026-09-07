import type { Metadata, Viewport } from "next";

const baseMetadata = {
    siteName: "Footsteps",
    siteUrl: "https://vercel.foosteps.app",
    twitterHandle: "@footsteps",
};

// Metadata export
export const defaultMetadata: Metadata = {
    title: { default: "Footsteps", template: "%s | Footsteps"},
    description: "Learn more",
    keywords: ["weather", "pollution", "earth"],
    robots: { index: true, follow: true},
};

// Viewport export
export const defaultViewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

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