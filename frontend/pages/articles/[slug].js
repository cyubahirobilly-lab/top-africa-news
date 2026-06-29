import Layout from '../../components/Layout/Layout'
import ArticleFull from '../../components/Articles/ArticleFull'
import { NextSeo } from 'next-seo'

const fallbackArticle = {
  title: 'A new era of African innovation is reshaping the continent',
  excerpt: 'Entrepreneurs and public institutions are building a more connected and resilient future.',
  content: 'This article page is ready for a fully published story. In a real deployment, the content would come from the backend CMS and be rendered here with SEO metadata and related links.',
  slug: 'sample-article',
  category: 'Technology',
}

export default function ArticlePage({ article }) {
  const seoTitle = article?.seo?.title || article?.title || 'Top Africa News'
  const seoDescription = article?.seo?.description || article?.excerpt || 'Latest news from Africa'
  const seoKeywords = article?.seo?.keywords?.join(', ') || 'Africa news, top stories'

  return (
    <Layout>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        openGraph={{
          title: seoTitle,
          description: seoDescription,
          images: article?.image?.url ? [{ url: article.image.url, alt: article.image.alt || seoTitle }] : [],
        }}
        additionalMetaTags={[{ name: 'keywords', content: seoKeywords }]}
      />
      <ArticleFull article={article} />
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/articles/${params.slug}`)
    const payload = await response.json()

    return {
      props: {
        article: payload.data || fallbackArticle,
      },
    }
  } catch (error) {
    return {
      props: {
        article: fallbackArticle,
      },
    }
  }
}
