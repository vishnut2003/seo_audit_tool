export interface getReportResponseInterface {
    success: true,
    data: {
        id: number,
        input: {
            url: string,
            pdf: boolean,
            callback: boolean,
            template: boolean
        },
        output: {
            success: boolean,
            callback: boolean,
            pdf: string,
            recommendation_count: number,
            screenshot: string,
            finalUrl: string,
            report_generation_time: string,
            request_completion_time: string,
            scores: {
                overall: {
                    grade: "A+" | "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D+" | "D" | "D-" | "E+" | "E" | "E-" | "F+" | "F" | "F-",
                    title: string,
                    description: string
                },
                seo: {
                    grade: "A+" | "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D+" | "D" | "D-" | "E+" | "E" | "E-" | "F+" | "F" | "F-",
                    title: string,
                    description: string
                },
                links: {
                    grade: "A+" | "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D+" | "D" | "D-" | "E+" | "E" | "E-" | "F+" | "F" | "F-",
                    title: string,
                    description: string
                },
                performance: {
                    grade: "A+" | "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D+" | "D" | "D-" | "E+" | "E" | "E-" | "F+" | "F" | "F-",
                    title: string,
                    description: string
                },
                social: {
                    grade: "A+" | "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D+" | "D" | "D-" | "E+" | "E" | "E-" | "F+" | "F" | "F-",
                    title: string,
                    description: string
                },
                ui: {
                    grade: "A+" | "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D+" | "D" | "D-" | "E+" | "E" | "E-" | "F+" | "F" | "F-",
                    title: string,
                    description: string
                },
                security: {
                    grade: "A+" | "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D+" | "D" | "D-" | "E+" | "E" | "E-" | "F+" | "F" | "F-",
                    title: string,
                    description: string
                }
            },
            title: {
                section: string,
                passed: boolean | null,
                shortAnswer: string,
                recommendation: string | null,
                value: string,
                data: string
            },
            description: {
                section: string,
                passed: boolean | null,
                shortAnswer: string,
                recommendation: string | null,
                value: string,
                data: string
            },
            hasHreflang: {
                section: string,
                passed: boolean | null,
                shortAnswer: string,
                recommendation: string | null,
                data: string[]
            },
            langCheck: {
                section: string,
                passed: boolean | null,
                shortAnswer: string,
                recommendation: string | null,
                data: boolean
            },
            hasH1Header: {
                section: string,
                passed: boolean | null,
                shortAnswer: string,
                recommendation: string | null,
                data: {
                    h1: string[]
                }
            },
            headers: {
                section: string,
                passed: boolean,
                shortAnswer: string,
                recommendation: string | null,
                data: string[]
            },
            keywords: {
                section: string,
                passed: boolean,
                shortAnswer: string,
                recommendation: string | null,
                data: {
                    keywords: {
                        word: string,
                        count: number,
                        title: boolean,
                        description: boolean,
                        headers: boolean
                    }[],
                    phrases: string[]
                }
            },
            googleSearchPreview: {
                section: string,
                passed: boolean | null,
                shortAnswer: string,
                recommendation: string | null,
                data: {
                    url: string,
                    title: string,
                    description: string
                }
            },
            contentLength: {
                section: string,
                passed: boolean | null,
                shortAnswer: string,
                recommendation: string | null,
                value: string
            },
            imageAlt: {
                section: string,
                passed: boolean | boolean,
                shortAnswer: string,
                recommendation: string | null,
                data: {
                    total: number,
                    altCount: number,
                    noAltCount: number,
                    list: string[]
                }
            },
            canonicalCheck: {
                section: string,
                passed: boolean | null,
                shortAnswer: string,
                recommendation: string | null,
                data: string[]
            },
            backlinks: {
                section: string,
                passed: boolean | null,
                shortAnswer: string,
                recommendation: string | null,
                data: {
                    backlinks: number,
                    allbacklinks: number,
                    mozda: number,
                    referring_domains: number,
                    domain_strength: number
                }
            },
            backlinksList: {
                section: string,
                passed: boolean | null,
                shortAnswer: string,
                recommendation: string | null,
                data: {
                    list: {
                        domain_authority: number,
                        url: string,
                        title: string,
                        anchor_text: string,
                        target: string,
                        domain_strength: number
                    }[]
                }
            },
            referringDomainsList: {
                section: string,
                passed: null,
                shortAnswer: null,
                recommendation: null,
                data: null
            },
            onPageLinks: {
                section: string,
                passed: null,
                shortAnswer: string,
                recommendation: string | null,
                data: {
                    total: number,
                    filesCount: number,
                    externalCount: number,
                    nofollowCount: number,
                    externalPercentage: number,
                    nofollowPercentage: number
                }
            },
            brokenLinks: {
                section: string,
                passed: boolean | null,
                shortAnswer: string | null,
                recommendation: string | null,
                data: null
            },
            friendlyUrls: {
                section: string,
                passed: boolean | null,
                shortAnswer: string | null,
                recommendation: string | null,
            },
            noindexTags: {
                section: string,
                passed: boolean | null,
                shortAnswer: string | null,
                recommendation: string | null,
                data: null
            },
            noindexHeaders: {
                section: string,
                passed: boolean | null,
                shortAnswer: string | null,
                recommendation: string | null,
                data: null
            },
            robotsTxt: {
                section: string,
                passed: boolean | null,
                shortAnswer: string | null,
                recommendation: string | null,
                data: null
            },
            blockedByRobotsTxt: {
                section: string,
                passed: boolean | null,
                shortAnswer: string | null,
                recommendation: string | null,
            },
            sitemap: {
                section: string,
                passed: boolean,
                shortAnswer: string,
                recommendation: string,
                data: {
                    found: number,
                    tested: number,
                    urls: string[]
                }
            },
            analytics: {
                section: string,
                passed: boolean,
                shortAnswer: string,
                recommendation: string,
                data: string[]
            },
            schemaOrg: {
                section: string,
                passed: boolean,
                shortAnswer: string,
                recommendation: string | null,
                data: string | null
            },
            topKeywordRankings: boolean,
            totalTrafficFromSearch: boolean,
            keywordPositions: {
                section: string,
                shortAnswer: string,
                recommendation: null,
                data: {
                    "Position 1": number,
                    "Position 2-3": number,
                    "Position 4-10": number,
                    "Position 11-20": number,
                    "Position 21-30": number,
                    "Position 31-100": number
                }
            },
            deviceRendering: {
                section: string,
                passed: boolean | null,
                shortAnswer: string,
                recommendation: string | null,
                data: {
                    mobile: string,
                    tablet: string
                }
            },
            coreWebVitals: {
                section: string,
                passed: boolean | null,
                shortAnswer: string,
                recommendation: string | null,
                data: {
                    "cumulative-layout-shift": number,
                    "largest-contentful-paint": number,
                    "first-input-delay": number
                }
            },
            mobilePageInsights: {
                section: string,
                passed: boolean | null,
                shortAnswer: string,
                recommendation: null,
                data: {
                    score: number,
                    labdata: {
                        name: string,
                        value: number
                    }[],
                    opportunities: string[]
                }
            },
            desktopPageInsights: {
                section: string,
                passed: boolean | null,
                shortAnswer: string,
                recommendation: string | null,
                data: {
                    score: number,
                    labdata: {
                        name: string,
                            value: number
                    }[],
                    opportunities: string[]
                }
            },
            mobileViewport: {
                section: string,
                passed: boolean,
                shortAnswer: string | null,
                recommendation: string | null
            },
            flash: {
                section: string,
                passed: boolean,
                shortAnswer: string | null,
                recommendation: string | null
            },
            iframe: {
                section: string,
                passed: boolean,
                shortAnswer: string | null,
                recommendation: string | null
            },
            favicon: {
                section: string,
                passed: boolean,
                shortAnswer: string | null,
                recommendation: string | null
            },
            legibleFonts: {
                section: string,
                passed: boolean,
                shortAnswer: string | null,
                recommendation: string | null
            },
            tapTargetSizing: {
                section: string,
                passed: boolean,
                shortAnswer: string | null,
                recommendation: string | null
            },
            serverResponseTime: {
                section: string,
                passed: boolean,
                shortAnswer: string | null,
                recommendation: string | null
                data: {
                    responseTime: number,
                    loadTime: number,
                    completeTime: number
                }
            },
            pageSize: {
                section: string,
                passed: true,
                shortAnswer: string | null,
                recommendation: string | null,
                data: {
                    totalSize: number,
                    htmlSize: number,
                    cssSize: number,
                    jsSize: number,
                    imageSize: number,
                    otherSize: number
                }
            },
            numberOfResources: {
                section: string,
                passed: true,
                shortAnswer: string | null,
                recommendation: string | null,
                data: {
                    total: number,
                    images: number,
                    css: number,
                    js: number,
                    html: number,
                    other: number
                }
            },
            hasAmp: {
                section: string,
                passed: true,
                shortAnswer: string | null,
                recommendation: string | null,
                data: {
                    isAmpOpenTag: boolean,
                    isAmpScriptTag: boolean,
                    hasAmpBoilerplate: boolean,
                    hasAmpCustomStyles: boolean,
                    hasAmpImgTag: boolean,
                    hasCanonicalLink: boolean
                }
            },
            javascriptErrors: {
                section: string,
                passed: true,
                shortAnswer: string | null,
                recommendation: string | null,
            },
            gzip: {
                section: string,
                passed: true,
                shortAnswer: string | null,
                recommendation: string | null,
                data: {
                    htmlOriginalSize: number,
                    totalOriginalSize: number,
                    htmlRate: number,
                    cssRate: number,
                    jsRate: number,
                    imageRate: number,
                    otherRate: number,
                    totalRate: number
                }
            },
            http2: {
                section: string,
                passed: true,
                shortAnswer: string | null,
                recommendation: string | null,
            },
            optimizedImages: {
                section: string,
                passed: true,
                shortAnswer: string | null,
                recommendation: string | null,
            },
            minified: {
                section: string,
                passed: true,
                shortAnswer: string | null,
                recommendation: string | null,
                data: string[]
            },
            deprecated: {
                section: string,
                passed: true,
                shortAnswer: string | null,
                recommendation: string | null,
            },
            inlineCss: {
                section: string,
                passed: true,
                shortAnswer: string | null,
                recommendation: string | null,
            },
            facebookLink: {
                section: string,
                passed: true,
                shortAnswer: string | null,
                recommendation: string | null,
            },
            facebookPixel: {
                section: string,
                passed: true,
                shortAnswer: string | null,
                recommendation: string | null,
                data: string[]
            },
            twitterLink: {
                section: string,
                passed: true,
                shortAnswer: string | null,
                recommendation: string | null,
            },
            twitterTags: {
                section: string,
                passed: true,
                shortAnswer: string | null,
                recommendation: string | null,
                data: string[]
            },
            twitterActivity: false,
            instagramLink: {
                section: string,
                passed: true,
                shortAnswer: string | null,
                recommendation: string | null,
            },
            youtubeLink: {
                section: string,
                passed: true,
                shortAnswer: string | null,
                recommendation: string | null,
            },
            youtubeActivity: false,
            linkedInLink: {
                section: string,
                passed: true,
                shortAnswer: string | null,
                recommendation: string | null,
                data: null
            },
            openGraphTags: {
                section: string,
                passed: true,
                shortAnswer: string | null,
                recommendation: string | null,
                data: string[]
            },
            sslEnabled: {
                section: string,
                passed: true,
                shortAnswer: string | null,
                recommendation: string | null,
            },
            httpsRedirect: {
                section: string,
                passed: true,
                shortAnswer: string | null,
                recommendation: string | null,
            },
            malware: {
                section: string,
                passed: true,
                shortAnswer: string | null,
                recommendation: string | null,
                data: null
            },
            email: {
                section: string,
                passed: true,
                shortAnswer: string | null,
                recommendation: string | null,
            },
            websitePhoneAddress: {
                section: string,
                passed: true,
                shortAnswer: string | null,
                recommendation: string | null,
                data: {
                    missing: string
                }
            },
            localBusinessSchema: {
                section: string,
                passed: true,
                shortAnswer: string | null,
                recommendation: string | null,
                data: {
                    schema: string[]
                }
            },
            gbpIdentified: {
                section: string,
                passed: true,
                shortAnswer: string | null,
                recommendation: string | null,
                data: string[]
            },
            gbpCompleteness: {
                section: string,
                passed: true,
                shortAnswer: string | null,
                recommendation: string | null,
                data: string[]
            },
            gbpReviews: {
                section: string,
                passed: true,
                shortAnswer: string | null,
                recommendation: string | null,
                data: string[]
            },
            technologies: {
                section: string,
                passed: true,
                shortAnswer: string | null,
                recommendation: string | null,
                data: string[]
            },
            ip: {
                section: string,
                passed: true,
                shortAnswer: string | null,
                recommendation: string | null,
                data: string
            },
            dns: {
                section: string,
                passed: true,
                shortAnswer: string | null,
                recommendation: string | null,
                data: string
            },
            webServer: boolean,
            charset: boolean,
            recommendations:{
                priority: string,
                    section: string,
                    recommendation: string
            }[]
        },
        created_at: string,
        completed_at: string
    }
}