import React from 'react'
import toolsList from './toolsList'
import SectionTemplateSEOTools from './SectionTemplate'
import SEOToolsLayout from './layoutTemplate'
import ConvertorPromo from './ConvertorPromo'

const SEORootPage = () => {
    return (
        <SEOToolsLayout
            pageTitle='SEO Tools'
        >
            <div>
                <div
                    className='space-y-10'
                >
                    <ConvertorPromo/>
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