import { useEffect, useState } from 'react'
import Layout from '../../../components/Layout/Layout'
import ProtectedPage from '../../../components/Auth/ProtectedPage'
import ArticleForm from '../../../components/Admin/ArticleForm'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000'

export default function EditArticlePage({ id }) {
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/articles/id/${id}`)
        const payload = await response.json()
        setArticle(payload.data || null)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadArticle()
  }, [id])

  return (
    <Layout>
      <ProtectedPage requiredRole="admin" title="Sign in to edit this article" description="Refresh headlines, upload images, and update SEO metadata for the newsroom archive.">
        <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">CMS editor</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">Edit article</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Update the content, image, and metadata for this story using the newsroom editor.</p>
        </div>
        {loading ? (
          <p className="mt-6 text-sm text-slate-500">Loading article…</p>
        ) : article ? (
          <ArticleForm isAdmin mode="edit" initialValues={{ ...article, _id: id }} />
        ) : (
          <p className="mt-6 text-sm text-red-600">Unable to load this article.</p>
        )}
      </ProtectedPage>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      id: params.id,
    },
  }
}
