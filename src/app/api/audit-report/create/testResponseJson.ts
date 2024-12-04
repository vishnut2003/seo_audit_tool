const testResponse = {
    "success": true,
    "data": {
        "id": 6,
        "input": {
            "url": "example.org",
            "pdf": true,
            "callback": false,
            "template": false
        },
        "output": {
            "success": true,
            "callback": false,
            "pdf": "https://seoptimer.com/download-pdf.inc/BsXyMVp8A4bcWUo5",
            "recommendation_count": 25,
            "screenshot": "https://seoptimer.com/screenshots/D0SPEyC1GhUr0uz4c3RWM9D4a089bBHl-desktop.jpg",
            "finalUrl": "http://example.org/",
            "report_generation_time": "15 second(s)",
            "request_completion_time": "31 second(s)",
            "scores": {
                "overall": {
                    "grade": "C-",
                    "title": "Your page could be better",
                    "description": ""
                },
                "seo": {
                    "grade": "D-",
                    "title": "Your On-Page SEO needs improvement",
                    "description": "Your page is not well optimized from an On-Page SEO perspective. On-Page SEO is important to ensure Search Engines can understand your content appropriately and help it rank for relevant keywords. You should ensure that HTML Tag Content is completed correctly and align text content to target keywords."
                },
                "links": {
                    "grade": "A+",
                    "title": "Your links are very good!",
                    "description": "Congratulations, your have good link structuring and backlink activity. Ensuring strong linking on and off your site is important for search engines to recognise the authority of your site, and increase it's rankings. We recommend actively building links as an ongoing activity."
                },
                "performance": {
                    "grade": "A",
                    "title": "Your performance is good",
                    "description": "Your page has performed well in our testing meaning it should be reasonably responsive for your users, but there is still room for improvement. Performance is important to ensure a good user experience, and reduced bounce rates (which can also indirectly affect your search engine rankings)."
                },
                "social": {
                    "grade": "F",
                    "title": "Your social needs improvement",
                    "description": "You appear to have a weak social presence or level of social activity (or we may just not be able to see your profiles!). Social activity is important for customer communication, brand awareness and as a marketing channel to bring visitors to your website. We recommend that you list all of your profiles on your page for visibility, and begin to build a following on those networks."
                },
                "ui": {
                    "grade": "A+",
                    "title": "Your usability is very good!",
                    "description": "Your page is highly usable across devices. Usability is important to maximize your available audience and minimize user bounce rates (which can indirectly affect your search engine rankings)."
                },
                "security": {
                    "grade": "",
                    "title": "",
                    "description": ""
                }
            },
            "title": {
                "section": "seo",
                "passed": true,
                "shortAnswer": "You have a title tag of optimal length (between 10 and 70 characters).",
                "recommendation": null,
                "value": "14",
                "data": "Example Domain"
            },
            "description": {
                "section": "seo",
                "passed": false,
                "shortAnswer": "Meta Description Missing",
                "recommendation": "Include a meta description tag",
                "value": "0",
                "data": ""
            },
            "hasHreflang": {
                "section": "seo",
                "passed": null,
                "shortAnswer": "Your page is not making use of Hreflang attributes.",
                "recommendation": null,
                "data": []
            },
            "langCheck": {
                "section": "seo",
                "passed": false,
                "shortAnswer": "Lang attribute not used",
                "recommendation": "Add lang attribute",
                "data": false
            },
            "hasH1Header": {
                "section": "seo",
                "passed": true,
                "shortAnswer": "Your page has a H1 Tag.",
                "recommendation": null,
                "data": {
                    "h1": [
                        "Example Domain"
                    ]
                }
            },
            "headers": {
                "section": "seo",
                "passed": false,
                "shortAnswer": "Poor Header Tag Usage",
                "recommendation": "Make greater use of header tags",
                "data": []
            },
            "keywords": {
                "section": "seo",
                "passed": false,
                "shortAnswer": "Keyword Consistency Too Low",
                "recommendation": "Use your main keywords across the important HTML tags",
                "data": {
                    "keywords": [
                        {
                            "word": "domain",
                            "count": 3,
                            "title": true,
                            "description": false,
                            "headers": true
                        },
                        {
                            "word": "example",
                            "count": 1,
                            "title": true,
                            "description": false,
                            "headers": true
                        },
                        {
                            "word": "illustrative",
                            "count": 1,
                            "title": false,
                            "description": false,
                            "headers": false
                        },
                        {
                            "word": "examples",
                            "count": 1,
                            "title": false,
                            "description": false,
                            "headers": false
                        },
                        {
                            "word": "documents",
                            "count": 1,
                            "title": false,
                            "description": false,
                            "headers": false
                        },
                        {
                            "word": "literature",
                            "count": 1,
                            "title": false,
                            "description": false,
                            "headers": false
                        },
                        {
                            "word": "prior",
                            "count": 1,
                            "title": false,
                            "description": false,
                            "headers": false
                        },
                        {
                            "word": "coordination",
                            "count": 1,
                            "title": false,
                            "description": false,
                            "headers": false
                        }
                    ],
                    "phrases": []
                }
            },
            "googleSearchPreview": {
                "section": "seo",
                "passed": null,
                "shortAnswer": "This illustrates how your page may appear in Search Results. Note, this is intended as a guide and Search Engines are more frequently generating this content dynamically.",
                "recommendation": null,
                "data": {
                    "url": "http://example.org",
                    "title": "Example Domain",
                    "description": ""
                }
            },
            "contentLength": {
                "section": "seo",
                "passed": false,
                "shortAnswer": "Page Text Content Too Short",
                "recommendation": "Increase page text content",
                "value": "29"
            },
            "imageAlt": {
                "section": "seo",
                "passed": true,
                "shortAnswer": "You do not have any images missing Alt attributes on your page.",
                "recommendation": null,
                "data": {
                    "total": 0,
                    "altCount": 0,
                    "noAltCount": 0,
                    "list": []
                }
            },
            "canonicalCheck": {
                "section": "seo",
                "passed": false,
                "shortAnswer": "Canonical Tag not used",
                "recommendation": "Add Canonical Tag",
                "data": []
            },
            "backlinks": {
                "section": "links",
                "passed": true,
                "shortAnswer": "You have a strong level of backlink activity to this page.",
                "recommendation": null,
                "data": {
                    "backlinks": 6254456,
                    "allbacklinks": 6254456,
                    "mozda": 77,
                    "referring_domains": 39385,
                    "domain_strength": 77
                }
            },
            "backlinksList": {
                "section": "links",
                "passed": null,
                "shortAnswer": "These are the highest value external pages we have found linking to your site.",
                "recommendation": null,
                "data": {
                    "list": [
                        {
                            "domain_authority": 99,
                            "url": "devblogs.microsoft.com/oldnewthing/20201102-00/?p=104411",
                            "title": "",
                            "anchor_text": "http://example.org/",
                            "target": "",
                            "domain_strength": 99
                        },
                        {
                            "domain_authority": 98,
                            "url": "en.wikipedia.org/wiki/Uma_Thurman",
                            "title": "Uma Thurman - Wikipedia",
                            "anchor_text": "uma thurman",
                            "target": "",
                            "domain_strength": 98
                        },
                        {
                            "domain_authority": 98,
                            "url": "en.wikipedia.org/wiki/New_York_City_FC",
                            "title": "New York City FC - Wikipedia",
                            "anchor_text": "the soccer file",
                            "target": "",
                            "domain_strength": 98
                        },
                        {
                            "domain_authority": 98,
                            "url": "developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe",
                            "title": "<iframe>: The Inline Frame element - HTML: HyperText Markup Language | MDN",
                            "anchor_text": "https://example.org",
                            "target": "",
                            "domain_strength": 98
                        },
                        {
                            "domain_authority": 98,
                            "url": "en.wikipedia.org/wiki/Example.com",
                            "title": "Example.com - Wikipedia",
                            "anchor_text": "example.org",
                            "target": "",
                            "domain_strength": 98
                        },
                        {
                            "domain_authority": 98,
                            "url": "en.wikipedia.org/wiki/Education_in_Nigeria",
                            "title": "Education in Nigeria - Wikipedia",
                            "anchor_text": "reading club",
                            "target": "",
                            "domain_strength": 98
                        },
                        {
                            "domain_authority": 98,
                            "url": "en.wikipedia.org/wiki/Parallel_text",
                            "title": "Parallel text - Wikipedia",
                            "anchor_text": "mycat – olanto",
                            "target": "",
                            "domain_strength": 98
                        },
                        {
                            "domain_authority": 98,
                            "url": "en.wikipedia.org/wiki/Template:Official_website",
                            "title": "Template:Official website - Wikipedia",
                            "anchor_text": "official website",
                            "target": "",
                            "domain_strength": 98
                        },
                        {
                            "domain_authority": 98,
                            "url": "en.wikipedia.org/wiki/Billie_Davis",
                            "title": "Billie Davis - Wikipedia",
                            "anchor_text": "miss billie davis  official website",
                            "target": "",
                            "domain_strength": 98
                        },
                        {
                            "domain_authority": 98,
                            "url": "developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe",
                            "title": "<iframe> - HTML（超文本标记语言） | MDN",
                            "anchor_text": "https://example.org",
                            "target": "",
                            "domain_strength": 98
                        }
                    ]
                }
            },
            "referringDomainsList": {
                "section": "links",
                "passed": null,
                "shortAnswer": null,
                "recommendation": null,
                "data": null
            },
            "onPageLinks": {
                "section": "links",
                "passed": null,
                "shortAnswer": "",
                "recommendation": null,
                "data": {
                    "total": 1,
                    "filesCount": 0,
                    "externalCount": 1,
                    "nofollowCount": 0,
                    "externalPercentage": 100,
                    "nofollowPercentage": 0
                }
            },
            "brokenLinks": {
                "section": "links",
                "passed": null,
                "shortAnswer": null,
                "recommendation": null,
                "data": null
            },
            "friendlyUrls": {
                "section": "links",
                "passed": true,
                "shortAnswer": "Your link URLs appear friendly (easily human or search engine readable).",
                "recommendation": null
            },
            "noindexTags": {
                "section": "seo",
                "passed": true,
                "shortAnswer": "Your page is not using the Noindex Tag which prevents indexing.",
                "recommendation": null,
                "data": null
            },
            "noindexHeaders": {
                "section": "seo",
                "passed": true,
                "shortAnswer": "Your page is not using the Noindex Header which prevents indexing.",
                "recommendation": null,
                "data": null
            },
            "robotsTxt": {
                "section": "seo",
                "passed": false,
                "shortAnswer": "Robots.txt Missing or Inaccessible",
                "recommendation": "Implement a robots.txt file",
                "data": false
            },
            "blockedByRobotsTxt": {
                "section": "seo",
                "passed": true,
                "shortAnswer": "Your page does not appear to be blocked by robots.txt.",
                "recommendation": null
            },
            "sitemap": {
                "section": "seo",
                "passed": false,
                "shortAnswer": "Sitemaps Missing or Inaccessible",
                "recommendation": "Implement a XML sitemaps file",
                "data": {
                    "found": 0,
                    "tested": 7,
                    "urls": []
                }
            },
            "analytics": {
                "section": "seo",
                "passed": false,
                "shortAnswer": "Analytics Tracking Missing",
                "recommendation": "Implement an analytics tracking tool",
                "data": []
            },
            "schemaOrg": {
                "section": "seo",
                "passed": false,
                "shortAnswer": "No Schema Markup",
                "recommendation": "Add Schema Markup",
                "data": null
            },
            "topKeywordRankings": false,
            "totalTrafficFromSearch": false,
            "keywordPositions": {
                "section": "rankings",
                "shortAnswer": "This shows you a summary of the positions for your Keyword Rankings. The higher you rank, the more likely you are to capture traffic, with recent research showing that as much as 92% of clicks happen on the first page.",
                "recommendation": null,
                "data": {
                    "Position 1": 0,
                    "Position 2-3": 0,
                    "Position 4-10": 0,
                    "Position 11-20": 0,
                    "Position 21-30": 0,
                    "Position 31-100": 0
                }
            },
            "deviceRendering": {
                "section": "ui",
                "passed": null,
                "shortAnswer": "This check visually demonstrates how your page renders on different devices. It is important that your page is optimized for mobile and tablet experiences as today the majority of web traffic comes from these sources.",
                "recommendation": null,
                "data": {
                    "mobile": "https://seoptimer.com/screenshots/D0SPEyC1GhUr0uz4c3RWM9D4a089bBHl-mobile.jpg",
                    "tablet": "https://seoptimer.com/screenshots/D0SPEyC1GhUr0uz4c3RWM9D4a089bBHl-tablet.jpg"
                }
            },
            "coreWebVitals": {
                "section": "ui",
                "passed": true,
                "shortAnswer": "Your page has passed Google's Core Web Vitals assessment.",
                "recommendation": null,
                "data": {
                    "cumulative-layout-shift": 0,
                    "largest-contentful-paint": 0.842,
                    "first-input-delay": 11
                }
            },
            "mobilePageInsights": {
                "section": "ui",
                "passed": true,
                "shortAnswer": "Google is indicating that your page is scoring well on their Mobile PageSpeed Insights evaluation.Note that this evaluation is being performed from US servers and the results may differ slightly from an evaluation carried out from Google's PageSpeed Web Interface as that reporting localizes to the region in which you are running the report.",
                "recommendation": null,
                "data": {
                    "score": 100,
                    "labdata": [
                        {
                            "name": "First Contentful Paint",
                            "value": 0.7
                        },
                        {
                            "name": "Speed Index",
                            "value": 0.7
                        },
                        {
                            "name": "Largest Contentful Paint",
                            "value": 0.7
                        },
                        {
                            "name": "Time to Interactive",
                            "value": 0.7
                        },
                        {
                            "name": "Total Blocking Time",
                            "value": 0
                        },
                        {
                            "name": "Cumulative Layout Shift",
                            "value": 0
                        }
                    ],
                    "opportunities": []
                }
            },
            "desktopPageInsights": {
                "section": "ui",
                "passed": true,
                "shortAnswer": "Google is indicating that your page is scoring well on their Desktop PageSpeed Insights evaluation.",
                "recommendation": null,
                "data": {
                    "score": 100,
                    "labdata": [
                        {
                            "name": "First Contentful Paint",
                            "value": 0.2
                        },
                        {
                            "name": "Speed Index",
                            "value": 0.2
                        },
                        {
                            "name": "Largest Contentful Paint",
                            "value": 0.2
                        },
                        {
                            "name": "Time to Interactive",
                            "value": 0.2
                        },
                        {
                            "name": "Total Blocking Time",
                            "value": 0
                        },
                        {
                            "name": "Cumulative Layout Shift",
                            "value": 0
                        }
                    ],
                    "opportunities": []
                }
            },
            "mobileViewport": {
                "section": "ui",
                "passed": true,
                "shortAnswer": "Your page specifies a viewport matching the device's size, allowing it to render appropriately across devices.",
                "recommendation": null
            },
            "flash": {
                "section": "ui",
                "passed": true,
                "shortAnswer": "No Flash content has been identified on your page.",
                "recommendation": null
            },
            "iframe": {
                "section": "ui",
                "passed": true,
                "shortAnswer": "There are no iFrames detected on your page.",
                "recommendation": null
            },
            "favicon": {
                "section": "ui",
                "passed": false,
                "shortAnswer": "Favicon Not Found",
                "recommendation": "Add a favicon"
            },
            "legibleFonts": {
                "section": "ui",
                "passed": true,
                "shortAnswer": "The text on your page appears to be legible across devices.",
                "recommendation": null
            },
            "tapTargetSizing": {
                "section": "ui",
                "passed": true,
                "shortAnswer": "The links and buttons on your page appear to be appropriately sized for a user to easily tap on a touchscreen.",
                "recommendation": null
            },
            "serverResponseTime": {
                "section": "performance",
                "passed": true,
                "shortAnswer": "Your page loads in a reasonable amount of time.",
                "recommendation": null,
                "data": {
                    "responseTime": 6,
                    "loadTime": 34,
                    "completeTime": 6
                }
            },
            "pageSize": {
                "section": "performance",
                "passed": true,
                "shortAnswer": "Your page's file size is reasonably low which is good for Page Load Speed and user experience.",
                "recommendation": null,
                "data": {
                    "totalSize": 1022,
                    "htmlSize": 1022,
                    "cssSize": 0,
                    "jsSize": 0,
                    "imageSize": 0,
                    "otherSize": 0
                }
            },
            "numberOfResources": {
                "section": "performance",
                "passed": null,
                "shortAnswer": "This check displays the total number of files that need to be retrieved from web servers to load your page.",
                "recommendation": null,
                "data": {
                    "total": 1,
                    "images": 0,
                    "css": 0,
                    "js": 0,
                    "html": 1,
                    "other": 0
                }
            },
            "hasAmp": {
                "section": "performance",
                "passed": null,
                "shortAnswer": "This page does not appear to have AMP Enabled.",
                "recommendation": null,
                "data": {
                    "isAmpOpenTag": false,
                    "isAmpScriptTag": false,
                    "hasAmpBoilerplate": false,
                    "hasAmpCustomStyles": false,
                    "hasAmpImgTag": false,
                    "hasCanonicalLink": false
                }
            },
            "javascriptErrors": {
                "section": "performance",
                "passed": true,
                "shortAnswer": "Your page is not reporting any JavaScript errors.",
                "recommendation": null
            },
            "gzip": {
                "section": "performance",
                "passed": true,
                "shortAnswer": "Your website appears to be using a reasonable level of compression.",
                "recommendation": "Make better use of website compression",
                "data": {
                    "htmlOriginalSize": 1262,
                    "totalOriginalSize": 1262,
                    "htmlRate": 19,
                    "cssRate": 100,
                    "jsRate": 100,
                    "imageRate": 100,
                    "otherRate": 100,
                    "totalRate": 19
                }
            },
            "http2": {
                "section": "performance",
                "passed": false,
                "shortAnswer": "Outdated HTTP Protocol Used",
                "recommendation": "Make use of HTTP/2+ protocol"
            },
            "optimizedImages": {
                "section": "performance",
                "passed": true,
                "shortAnswer": "All of the images on your page appear to be optimized.",
                "recommendation": null
            },
            "minified": {
                "section": "performance",
                "passed": true,
                "shortAnswer": "All your JavaScript and CSS files appear to be minified.",
                "recommendation": null,
                "data": []
            },
            "deprecated": {
                "section": "performance",
                "passed": true,
                "shortAnswer": "No deprecated HTML tags have been found within your page.",
                "recommendation": null
            },
            "inlineCss": {
                "section": "performance",
                "passed": true,
                "shortAnswer": "No inline styles have been found within your page's HTML tags.",
                "recommendation": null
            },
            "facebookLink": {
                "section": "social",
                "passed": false,
                "shortAnswer": "Facebook Page Link Not Found",
                "recommendation": "Create and link your Facebook Page"
            },
            "facebookPixel": {
                "section": "social",
                "passed": false,
                "shortAnswer": "No Facebook Pixel",
                "recommendation": "Setup & Install a Facebook Pixel",
                "data": []
            },
            "twitterLink": {
                "section": "social",
                "passed": false,
                "shortAnswer": "Twitter Page Link Not Found",
                "recommendation": "Create and link your Twitter profile"
            },
            "twitterTags": {
                "section": "social",
                "passed": false,
                "shortAnswer": "No Twitter Cards",
                "recommendation": "Add Twitter Cards",
                "data": []
            },
            "twitterActivity": false,
            "instagramLink": {
                "section": "social",
                "passed": false,
                "shortAnswer": "Instagram Profile Link Not Found",
                "recommendation": "Create and link associated Instagram profile"
            },
            "youtubeLink": {
                "section": "social",
                "passed": false,
                "shortAnswer": "YouTube Channel Link Not Found",
                "recommendation": "Create and link an associated YouTube channel"
            },
            "youtubeActivity": false,
            "linkedInLink": {
                "section": "social",
                "passed": false,
                "shortAnswer": "LinkedIn Profile Link Not Found",
                "recommendation": "Create and link an associated LinkedIn profile",
                "data": null
            },
            "openGraphTags": {
                "section": "social",
                "passed": false,
                "shortAnswer": "No Facebook Open Graph Tags",
                "recommendation": "Please add Facebook Open Graph Tags",
                "data": []
            },
            "sslEnabled": {
                "section": "seo",
                "passed": true,
                "shortAnswer": "Your website has SSL enabled.",
                "recommendation": null
            },
            "httpsRedirect": {
                "section": "seo",
                "passed": false,
                "shortAnswer": "No Redirect to HTTPS",
                "recommendation": "Implement a redirect to HTTPS on your website"
            },
            "malware": {
                "section": "security",
                "passed": null,
                "shortAnswer": null,
                "recommendation": null,
                "data": null
            },
            "email": {
                "section": "ui",
                "passed": true,
                "shortAnswer": "No email addresses have been found in plain text on your page.",
                "recommendation": null
            },
            "websitePhoneAddress": {
                "section": "localseo",
                "passed": false,
                "shortAnswer": "We can't identify one or both of these components on the page.",
                "recommendation": "Add business address and phone number",
                "data": {
                    "missing": "Phone, Address"
                }
            },
            "localBusinessSchema": {
                "section": "localseo",
                "passed": false,
                "shortAnswer": "No Local Business Schema identified on the page.",
                "recommendation": "Add Local Business Schema",
                "data": {
                    "schema": []
                }
            },
            "gbpIdentified": {
                "section": "localseo",
                "passed": false,
                "shortAnswer": "No Google Business Profile was identified that links to this website.",
                "recommendation": "Create Google Business Profile",
                "data": []
            },
            "gbpCompleteness": {
                "section": "localseo",
                "passed": null,
                "shortAnswer": "No Google Business Profile was identified that links to this website.",
                "recommendation": null,
                "data": []
            },
            "gbpReviews": {
                "section": "localseo",
                "passed": null,
                "shortAnswer": "No Google Business Profile was identified that links to this website.",
                "recommendation": null,
                "data": []
            },
            "technologies": {
                "section": "technology",
                "passed": null,
                "shortAnswer": "These software or coding libraries have been identified on your page.",
                "recommendation": null,
                "data": [
                    "Amazon ECS",
                    "Amazon Web Services",
                    "Azure CDN",
                    "Docker"
                ]
            },
            "ip": {
                "section": "technology",
                "passed": null,
                "shortAnswer": "",
                "recommendation": null,
                "data": "93.184.216.34"
            },
            "dns": {
                "section": "technology",
                "passed": null,
                "shortAnswer": "",
                "recommendation": null,
                "data": "a.iana-servers.net b.iana - servers.net"
            },
            "webServer": false,
            "charset": false,
            "recommendations": [
                {
                    "priority": "high",
                    "section": "seo",
                    "recommendation": "Include a meta description tag"
                },
                {
                    "priority": "medium",
                    "section": "seo",
                    "recommendation": "Add Canonical Tag"
                },
                {
                    "priority": "medium",
                    "section": "seo",
                    "recommendation": "Make greater use of header tags"
                },
                {
                    "priority": "medium",
                    "section": "seo",
                    "recommendation": "Implement a redirect to HTTPS on your website"
                },
                {
                    "priority": "medium",
                    "section": "seo",
                    "recommendation": "Implement a XML sitemaps file"
                },
                {
                    "priority": "medium",
                    "section": "seo",
                    "recommendation": "Implement a robots.txt file"
                },
                {
                    "priority": "low",
                    "section": "seo",
                    "recommendation": "Add lang attribute"
                },
                {
                    "priority": "low",
                    "section": "seo",
                    "recommendation": "Use your main keywords across the important HTML tags"
                },
                {
                    "priority": "low",
                    "section": "localseo",
                    "recommendation": "Add Local Business Schema"
                },
                {
                    "priority": "low",
                    "section": "seo",
                    "recommendation": "Implement an analytics tracking tool"
                },
                {
                    "priority": "low",
                    "section": "seo",
                    "recommendation": "Add Schema Markup"
                },
                {
                    "priority": "low",
                    "section": "social",
                    "recommendation": "Please add Facebook Open Graph Tags"
                },
                {
                    "priority": "low",
                    "section": "social",
                    "recommendation": "Add Twitter Cards"
                },
                {
                    "priority": "low",
                    "section": "ui",
                    "recommendation": "Add a favicon"
                },
                {
                    "priority": "low",
                    "section": "seo",
                    "recommendation": "Increase page text content"
                },
                {
                    "priority": "low",
                    "section": "social",
                    "recommendation": "Setup & Install a Facebook Pixel"
                },
                {
                    "priority": "low",
                    "section": "performance",
                    "recommendation": "Make better use of website compression"
                },
                {
                    "priority": "low",
                    "section": "performance",
                    "recommendation": "Make use of HTTP/2+ protocol"
                },
                {
                    "priority": "low",
                    "section": "localseo",
                    "recommendation": "Add business address and phone number"
                },
                {
                    "priority": "low",
                    "section": "localseo",
                    "recommendation": "Create Google Business Profile"
                },
                {
                    "priority": "low",
                    "section": "social",
                    "recommendation": "Create and link your Facebook Page"
                },
                {
                    "priority": "low",
                    "section": "social",
                    "recommendation": "Create and link your Twitter profile"
                },
                {
                    "priority": "low",
                    "section": "social",
                    "recommendation": "Create and link associated Instagram profile"
                },
                {
                    "priority": "low",
                    "section": "social",
                    "recommendation": "Create and link an associated YouTube channel"
                },
                {
                    "priority": "low",
                    "section": "social",
                    "recommendation": "Create and link an associated LinkedIn profile"
                }
            ]
        },
        "created_at": "2023-04-12 12:15:46",
        "completed_at": "2023-04-12 12:16:17"
    }
}

export default testResponse