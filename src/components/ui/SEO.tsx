import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    url?: string;
    image?: string;
    type?: string;
    googleSiteVerification?: string;
}

export function SEO({
    title = "EsperaStudio | Agency Automation Infrastructure",
    description = "EsperaStudio is an automation agency building autonomous digital infrastructure. We replace manual workflows with AI systems to save time and scale operations.",
    url = "https://esperastudio.com/",
    image = "/og-image.jpg",
    type = "website",
    googleSiteVerification
}: SEOProps) {

    // Organization Schema (JSON-LD)
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "EsperaStudio",
        "url": "https://esperastudio.com",
        "logo": "https://esperastudio.com/favicon.svg",
        "sameAs": [
            "https://linkedin.com/company/esperastudio"
        ],
        "description": description,
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "US"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "sales",
            "email": "contact@esperastudio.com"
        }
    };

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            {/* Google Search Console Verification */}
            {googleSiteVerification && (
                <meta name="google-site-verification" content={googleSiteVerification} />
            )}

            {/* JSON-LD Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
}
