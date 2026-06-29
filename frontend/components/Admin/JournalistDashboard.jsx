import { useEffect, useState } from 'react'
import Link from 'next/link'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000'

export default function JournalistDashboard() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const loadArticles = async (term = '') => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/api/articles?status=published&search=${encodeURIComponent(term)}&limit=50`)
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
        setArticles((current) => current.filter((article) => article._id !== id))
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">Journalist workspace</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">Manage your newsroom stories</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Create new stories, update live articles, and remove outdated reports from one streamlined dashboard.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Your published stories</h2>
              <p className="text-sm text-slate-500">Search and manage content quickly.</p>
            </div>
            <div className="flex gap-2">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search"
                className="rounded-2xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
              />
              <button onClick={() => loadArticles(search)} className="rounded-2xl bg-[#2563EB] px-3 py-2 text-sm font-semibold text-white hover:bg-[#1D4ED8]">
                Search
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {loading ? (
              <p className="text-sm text-slate-500">Loading stories…</p>
            ) : articles.length === 0 ? (
              <p className="text-sm text-slate-500">No articles found.</p>
            ) : (
              articles.map((article, index) => {
                const articleId = article._id || article.id || article.slug || `article-${index}`

                return (
                  <div key={articleId} className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-800 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">{article.category}</p>
                      <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">{article.title}</h3>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{article.excerpt}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/admin/edit/${articleId}`} className="rounded-2xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(articleId)} className="rounded-2xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white dark:bg-slate-700">
                        Delete
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Quick actions</h2>
          <div className="mt-5 space-y-3">
            <Link href="/admin/create" className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
              + Add news
            </Link>
            <Link href="/admin/articles" className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
              Manage articles
            </Link>
            <a href="/api/articles/rss" target="_blank" rel="noreferrer" className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
              Open RSS feed
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
