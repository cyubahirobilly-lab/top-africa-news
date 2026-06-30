function buildSeo(title, description, image = null, url = null) {
  const baseUrl = process.env.FRONTEND_URL || 'https://topafricanews.com';
  
  return {
    title: title || 'Top Africa News',
    description: description || 'Coverage of the latest stories across Africa.',
    image: image || `${baseUrl}/og-image.png`,
    url: url || baseUrl,
    keywords: 'Africa, news, journalism, top stories, African media',
    author: 'Top Africa News',
    robots: 'index, follow',
    openGraph: {
      title: title || 'Top Africa News',
      description: description || 'Coverage of the latest stories across Africa.',
      image: image || `${baseUrl}/og-image.png`,
      url: url || baseUrl,
      type: 'article',
      site_name: 'Top Africa News'
    },
    twitter: {
      card: 'summary_large_image',
      title: title || 'Top Africa News',
      description: description || 'Coverage of the latest stories across Africa.',
      image: image || `${baseUrl}/og-image.png`
    }
  };
}

function generateStructuredData(article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    datePublished: article.createdAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: article.author || 'Top Africa News'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Top Africa News',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.FRONTEND_URL || 'https://topafricanews.com'}/logo.png`
      }
    }
  };
}

function generateSitemap(articles) {
  const baseUrl = process.env.FRONTEND_URL || 'https://topafricanews.com';
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Homepage
  xml += '  <url>\n    <loc>' + baseUrl + '</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n';
  
  // Articles
  articles.forEach(article => {
    xml += '  <url>\n';
    xml += '    <loc>' + baseUrl + '/articles/' + article.slug + '</loc>\n';
    xml += '    <lastmod>' + new Date(article.updatedAt).toISOString().split('T')[0] + '</lastmod>\n';
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  return xml;
}

function optimizeImageSeo(filename, title) {
  return {
    alt: title || 'Article image',
    title: title || 'Article image',
    filename: filename.toLowerCase().replace(/\s+/g, '-')
  };
}

module.exports = { buildSeo, generateStructuredData, generateSitemap, optimizeImageSeo };
