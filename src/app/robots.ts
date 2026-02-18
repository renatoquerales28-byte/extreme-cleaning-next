import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/admin/',
                '/portfolio/',
                '/category/',
                '/tag/',
            ],
        },
        sitemap: 'https://extremecleaning509.com/sitemap.xml',
    }
}
