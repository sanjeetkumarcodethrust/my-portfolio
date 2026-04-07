import { Helmet } from 'react-helmet-async';
import { seo } from '../data/portfolio';

export default function Seo({ title = seo.title, description = seo.description, path = '' }) {
  const canonical = `${seo.url}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href={canonical} />
    </Helmet>
  );
}
