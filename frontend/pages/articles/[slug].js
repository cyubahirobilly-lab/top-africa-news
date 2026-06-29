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
  return (
    <Layout>
      <NextSeo
        title={article.title}
        description={article.excerpt}
      />
      <ArticleFull article={article} />
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  try {
    const response = await fetch(`http://localhost:5000/api/articles/${params.slug}`)
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
