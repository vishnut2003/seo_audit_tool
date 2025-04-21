import React from 'react'
import toolsList from './toolsList'
import SectionTemplateSEOTools from './SectionTemplate'
import SEOToolsLayout from './layoutTemplate'

const SEORootPage = () => {
    return (
        <SEOToolsLayout
            pageTitle='SEO Tools'
        >
            <div>
                <div
                    className='space-y-5'
                >
                    {toolsList.map((section, index) => {
                        return (
                            <SectionTemplateSEOTools
                                sectionData={section}
                                key={index}
                            />
                        )
                    })}
                </div>
            </div>
        </SEOToolsLayout>
    )
}

export default SEORootPage