import Layout from '../../../components/Layout/Layout'
import ArticleList from '../../../components/Articles/ArticleList'

export default function CategoryPage({ category, articles }) {
  return (
    <Layout>
      <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">Category</p>
        <h1 className="mt-3 text-3xl font-semibold capitalize">{category}</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">Browsing the latest approved news in the {category} section.</p>
      </div>
      <ArticleList articles={articles} />
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  try {
    const response = await fetch(`http://localhost:5000/api/articles?category=${params.category}`)
    const payload = await response.json()

    return {
      props: {
        category: params.category,
        articles: payload.data || [],
      },
    }
  } catch (error) {
    return {
      props: {
        category: params.category,
        articles: [],
      },
    }
  }
}
