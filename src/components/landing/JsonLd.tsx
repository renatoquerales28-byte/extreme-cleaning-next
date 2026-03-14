"use client";

import React from 'react';

export default function JsonLd() {
    const businessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Extreme Cleaning Spokane",
        "image": "https://extremecleaning509.com/brand/logo-full.png",
        "@id": "https://extremecleaning509.com",
        "url": "https://extremecleaning509.com",
        "telephone": "509-000-0000", // Update with actual phone if available
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "", // Update with actual address if available
            "addressLocality": "Spokane",
            "addressRegion": "WA",
            "postalCode": "99201",
            "addressCountry": "US"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 47.6588,
            "longitude": -117.4260
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            "opens": "08:00",
            "closes": "18:00"
        },
        "sameAs": [
            "https://www.facebook.com/profile.php?id=100076351471060",
            "https://www.instagram.com/extremecleaning509/"
        ]
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Premium Cleaning Services",
        "provider": {
            "@type": "LocalBusiness",
            "name": "Extreme Cleaning Spokane"
        },
        "areaServed": {
            "@type": "City",
            "name": "Spokane"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Cleaning Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Residential Cleaning"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Commercial Cleaning"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Post-Construction Cleaning"
                    }
                }
            ]
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How much does professional cleaning cost in Spokane?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Professional cleaning costs in Spokane vary based on the square footage and condition of the home. Use our instant quote wizard to get a precise estimate in seconds."
                }
            },
            {
                "@type": "Question",
                "name": "What is included in a premium cleaning service?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our premium cleaning includes deep restoration, dust removal, floor sanitation, and detailed cleaning of high-touch surfaces using professional-grade supplies."
                }
            },
            {
                "@type": "Question",
                "name": "Do you offer same-day quotes?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we provide instant quotes through our online wizard, and our team typically responds to inquiries within 24 hours."
                }
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
        </>
    );
}
