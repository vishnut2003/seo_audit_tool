
export interface competitorAnalysisRawInterface {
    website: string | null,
    overview: {
        siteSecurity: {
            label: string,
            value: "NO PROTOCOL FOUND" | "SSL NOT INSTALLED" | "SSL INSTALLED",
        },
        callToAction: {
            label: string,
            value: "PASSED" | "FAILED" | null,
        },
        niche: {
            label: string,
            value: string,
        },
        siteCategory: {
            label: string,
            value: string,
        },
        validBlogPage: {
            label: string,
            value: "PRESENT" | "NOT PRESENT" | null,
        },
        socialConnection: {
            label: string,
            value: "PRESENT" | "NOT PRESENT"
        },
    },
    websiteIssues: {
        mainDomainCanonical: {
            label: string,
            value: "PRESENT" | "NOT PRESENT" | null,
        },
    },
    crawlAccess: {
        xmlSitemap: {
            label: string,
            value: "PRESENT" | "NOT PRESENT" | null,
        },
        htmlSitemap: {
            label: string,
            value: "PRESENT" | "NOT PRESENT" | null,
        },
        robotTxt: {
            label: string,
            value: "PRESENT" | "NOT PRESENT" | null,
        },
    },
    optimization: {
        metaQuality: {
            label: string,
            value: "HIGH" | "MEDIUM" | "LOW" | null,
        },
        imageAltText: {
            label: string,
            value: "PRESENT" | "NOT PRESENT" | null,
        },
        h1Tag: {
            label: string,
            value: "PRESENT" | "NOT PRESENT" | null,
        },
        contentOptimization: {
            label: string,
            value: "HIGH" | "MEDIUM" | "LOW" | null,
        },
        structureDataError: {
            label: string,
            value: "PRESENT" | "NOT PRESENT" | null,
        }
    }
}