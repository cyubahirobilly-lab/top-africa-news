import { useEffect, useState } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000'

export default function ApprovalsPanel() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState(null)

  const loadArticles = async () => {
    try {
      const token = typeof window !== 'undefined' ? window.localStorage.getItem('topAfricaAuth') : null
      const parsedToken = token ? JSON.parse(token).token : null

      const response = await fetch(`${API_BASE}/api/articles/pending`, {
        headers: {
          Authorization: `Bearer ${parsedToken}`,
        },
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Unable to load pending stories.')
      }

      setArticles(result.data || [])
    } catch (loadError) {
      setError(loadError.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadArticles()
  }, [])

  const handleDecision = async (id, action) => {
    setBusyId(id)
    setError('')

    try {
      const token = typeof window !== 'undefined' ? window.localStorage.getItem('topAfricaAuth') : null
      const parsedToken = token ? JSON.parse(token).token : null
      const response = await fetch(`${API_BASE}/api/articles/${id}/${action}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${parsedToken}`,
        },
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Unable to update this submission.')
      }

      setArticles((current) => current.filter((article) => article._id !== id))
    } catch (decisionError) {
      setError(decisionError.message)
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">Pending approvals</p>
          <h2 className="mt-2 text-3xl font-semibold">Review reporter submissions</h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">Admin can approve or reject stories before they go live.</p>
      </div>

      {error && <p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>}

      <div className="mt-8 space-y-6">
        {loading && <p className="text-sm text-slate-600 dark:text-slate-400">Loading pending submissions…</p>}
        {!loading && articles.length === 0 && <p className="text-sm text-slate-600 dark:text-slate-400">No pending stories right now.</p>}
        {articles.map((article) => (
          <div key={article._id} className="rounded-3xl border border-slate-200 p-6 dark:border-slate-800">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{article.title}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {article.author?.name || 'Reporter'} • {article.category || 'General'} • Submitted {new Date(article.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-3 pt-4 sm:pt-0">
                <button
                  onClick={() => handleDecision(article._id, 'approve')}
                  disabled={busyId === article._id}
                  className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {busyId === article._id ? 'Working…' : 'Approve'}
                </button>
                <button
                  onClick={() => handleDecision(article._id, 'reject')}
                  disabled={busyId === article._id}
                  className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {busyId === article._id ? 'Working…' : 'Reject'}
                </button>
              </div>
            </div>
            <p className="mt-4 text-slate-600 dark:text-slate-400">{article.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
