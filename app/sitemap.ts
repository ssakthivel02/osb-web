import type { MetadataRoute } from 'next';
const routes=['','/tracks/','/tracks/devops/','/tracks/azure-cloud/','/tracks/platform-engineering/','/tracks/cloud-security/','/dashboard/','/search/','/login/','/register/','/profile/','/settings/','/devops/','/devops/roadmap/','/devops/labs/','/devops/interview/','/devops/glossary/'];
export default function sitemap(): MetadataRoute.Sitemap {const now=new Date();return routes.map(route=>({url:`https://learn.omsaravanabhava.org${route}`,lastModified:now,changeFrequency:route===''?'weekly':'monthly',priority:route===''?1:.8}));}
