import { useState } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export default function ReporterForm() {
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', category: '', imageUrl: '', imageAlt: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (key) => (event) => {
    setForm({ ...form, [key]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const token = typeof window !== 'undefined' ? window.localStorage.getItem('topAfricaAuth') : null
      const parsedToken = token ? JSON.parse(token).token : null

      if (!parsedToken) {
        throw new Error('Please sign in before submitting a story.')
      }

      const response = await fetch(`${API_BASE}/api/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${parsedToken}`,
        },
        body: JSON.stringify({
          title: form.title,
          excerpt: form.excerpt,
          content: form.content,
          category: form.category,
          image: form.imageUrl ? { url: form.imageUrl, alt: form.imageAlt || form.title } : undefined,
        }),
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Unable to submit the article right now.')
      }

      setSubmitted(true)
      setForm({ title: '', excerpt: '', content: '', category: '', imageUrl: '', imageAlt: '' })
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-2xl font-semibold">Submit a news story</h2>
      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Title</label>
          <input
            value={form.title}
            onChange={handleChange('title')}
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
            placeholder="Enter the headline"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Excerpt</label>
          <textarea
            value={form.excerpt}
            onChange={handleChange('excerpt')}
            rows={3}
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
            placeholder="Write a short summary of the story"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
          <input
            value={form.category}
            onChange={handleChange('category')}
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
            placeholder="Politics, Business, Technology, Sports..."
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Photo URL</label>
            <input
              value={form.imageUrl}
              onChange={handleChange('imageUrl')}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
              placeholder="https://example.com/photo.jpg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Photo Alt Text</label>
            <input
              value={form.imageAlt}
              onChange={handleChange('imageAlt')}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
              placeholder="Short caption for the image"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Content</label>
          <textarea
            value={form.content}
            onChange={handleChange('content')}
            rows={8}
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
            placeholder="Write the full story here"
          />
        </div>
        <button type="submit" disabled={isSubmitting} className="btn-primary disabled:cursor-not-allowed disabled:opacity-70">
          {isSubmitting ? 'Submitting…' : 'Submit for approval'}
        </button>
        {submitted && (
          <p className="text-sm text-green-600 dark:text-green-400">Your article has been submitted and is awaiting admin approval.</p>
        )}
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      </form>
    </div>
  )
}
