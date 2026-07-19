import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {return {rules:{userAgent:'*',allow:'/'},sitemap:'https://learn.omsaravanabhava.org/sitemap.xml',host:'https://learn.omsaravanabhava.org'};}
