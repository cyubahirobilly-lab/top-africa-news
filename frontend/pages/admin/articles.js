import { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import ProtectedPage from '../../components/Auth/ProtectedPage'
import Link from 'next/link'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000'

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const loadArticles = async (term = '') => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/api/articles?search=${encodeURIComponent(term)}&limit=50`)
      const payload = await response.json()
      setArticles(payload.data || [])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadArticles()
  }, [])

  const handleDelete = async (id) => {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('topAfricaAuth') : null
    const parsedToken = token ? JSON.parse(token).token : null

    if (!parsedToken) return

    try {
      const response = await fetch(`${API_BASE}/api/articles/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${parsedToken}` },
      })
      if (response.ok) {
        setArticles((current) => current.filter((item) => item._id !== id))
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout>
      <ProtectedPage requiredRole="admin" title="Sign in to manage the newsroom archive" description="Search, edit, and remove articles from the CMS archive.">
        <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">CMS archive</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">Manage stories</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Search published, pending, and draft stories then edit or delete them from one place.</p>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  loadArticles(search)
                }
              }}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950 md:max-w-md"
              placeholder="Search articles by title, keyword, or category"
            />
            <button
              onClick={() => loadArticles(search)}
              className="rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white"
            >
              Search
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {loading ? (
              <p className="text-sm text-slate-500">Loading articles…</p>
            ) : articles.length === 0 ? (
              <p className="text-sm text-slate-500">No articles found.</p>
            ) : (
              articles.map((article) => (
                <div key={article._id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-800 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">{article.category}</p>
                    <h2 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">{article.title}</h2>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{article.status} • {article.excerpt}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/admin/edit/${article._id}`} className="rounded-2xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(article._id)} className="rounded-2xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white dark:bg-slate-700">
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </ProtectedPage>
    </Layout>
  )
}
