import { useEffect, useState } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export default function ProtectedPage({ children, requiredRole = 'reporter', title, description }) {
  const [auth, setAuth] = useState(null)
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const stored = window.localStorage.getItem('topAfricaAuth')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed?.token && parsed?.user) {
          setAuth(parsed)
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register'
    const payload =
      mode === 'login'
        ? { email: form.email, password: form.password }
        : {
            name: form.name,
            email: form.email,
            password: form.password,
            role: requiredRole === 'admin' ? 'admin' : 'reporter',
          }

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Unable to sign in right now.')
      }

      const nextAuth = { token: result.token, user: result.user }
      window.localStorage.setItem('topAfricaAuth', JSON.stringify(nextAuth))
      setAuth(nextAuth)
      setForm({ name: '', email: '', password: '' })
    } catch (error) {
      setMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('topAfricaAuth')
    }
    setAuth(null)
    setForm({ name: '', email: '', password: '' })
    setMessage('You have been signed out.')
  }

  const canAccess = auth?.user && (requiredRole === 'admin' ? auth.user.role === 'admin' : ['reporter', 'editor', 'admin'].includes(auth.user.role))

  if (isLoading) {
    return <div className="rounded-3xl bg-white p-8 text-sm text-slate-600 shadow-sm dark:bg-slate-900 dark:text-slate-300">Loading your workspace…</div>
  }

  if (!canAccess) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">{requiredRole === 'admin' ? 'Admin access' : 'Reporter access'}</p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">{title || 'Sign in to continue'}</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          {description || 'Use your newsroom account to continue. Reporters can submit stories, and admins can review and publish them.'}
        </p>
        {message && <p className="mt-4 text-sm text-red-600">{message}</p>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
              <input
                value={form.name}
                onChange={handleChange('name')}
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
                placeholder="Your full name"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
              placeholder="you@topafrica.news"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={handleChange('password')}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
              placeholder="Create or enter your password"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" disabled={isSubmitting} className="btn-primary disabled:cursor-not-allowed disabled:opacity-70">
              {isSubmitting ? 'Working…' : mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
            <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-sm font-semibold text-red-600">
              {mode === 'login' ? 'Create an account' : 'Use existing account'}
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">Signed in as {auth.user.role}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">{auth.user.name} • {auth.user.email}</p>
        </div>
        <button onClick={handleLogout} className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
          Sign out
        </button>
      </div>
      {children}
    </div>
  )
}
