import { useEffect, useState } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000'

const EMPTY_FORM = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: '',
  imageUrl: '',
  imageAlt: '',
  status: 'published',
  seoTitle: '',
  seoDescription: '',
  seoKeywords: '',
}

export default function ArticleForm({ isAdmin = false, initialValues = null, mode = 'create' }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (initialValues) {
      setForm({
        title: initialValues.title || '',
        slug: initialValues.slug || '',
        excerpt: initialValues.excerpt || '',
        content: initialValues.content || '',
        category: initialValues.category || '',
        imageUrl: initialValues.image?.url || '',
        imageAlt: initialValues.image?.alt || '',
        status: initialValues.status || 'published',
        seoTitle: initialValues.seo?.title || '',
        seoDescription: initialValues.seo?.description || '',
        seoKeywords: (initialValues.seo?.keywords || []).join(', '),
      })
    }
  }, [initialValues])

  const handleChange = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value })
  }

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setForm((current) => ({ ...current, imageUrl: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const token = typeof window !== 'undefined' ? window.localStorage.getItem('topAfricaAuth') : null
      const parsedToken = token ? JSON.parse(token).token : null

      if (!parsedToken) {
        throw new Error('Please sign in before publishing content.')
      }

      const payload = {
        title: form.title,
        slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        excerpt: form.excerpt,
        content: form.content,
        category: form.category,
        image: form.imageUrl ? { url: form.imageUrl, alt: form.imageAlt || form.title } : undefined,
        status: form.status || (isAdmin ? 'published' : 'pending'),
        seo: {
          title: form.seoTitle || form.title,
          description: form.seoDescription || form.excerpt,
          keywords: form.seoKeywords.split(',').map((item) => item.trim()).filter(Boolean),
        },
      }

      const response = await fetch(`${API_BASE}/api/articles${mode === 'edit' ? `/${initialValues._id}` : ''}`, {
        method: mode === 'edit' ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${parsedToken}`,
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Unable to save the article.')
      }

      setSaved(true)
      if (mode !== 'edit') {
        setForm(EMPTY_FORM)
      }
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
        {mode === 'edit' ? 'Update article' : isAdmin ? 'Publish a new article' : 'Submit article for approval'}
      </h2>
      <p className="mt-3 text-slate-600 dark:text-slate-400">
        {mode === 'edit'
          ? 'Refine the article, refresh its SEO details, and keep the newsroom archive current.'
          : isAdmin
            ? 'As an admin, you can publish content directly or save drafts for later review.'
            : 'Reporters should submit accurate stories here; admins will review and approve them before publishing.'}
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Title</label>
            <input
              value={form.title}
              onChange={handleChange('title')}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
              placeholder="Enter the story headline"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Slug</label>
            <input
              value={form.slug}
              onChange={handleChange('slug')}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
              placeholder="custom-slug"
            />
          </div>
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
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
            <input
              value={form.category}
              onChange={handleChange('category')}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
              placeholder="Politics, Business, Technology, Sports..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Status</label>
            <select
              value={form.status}
              onChange={handleChange('status')}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
            >
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Upload image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Image URL or data URL</label>
            <input
              value={form.imageUrl}
              onChange={handleChange('imageUrl')}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
              placeholder="https://example.com/photo.jpg"
            />
          </div>
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
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Content</label>
          <textarea
            value={form.content}
            onChange={handleChange('content')}
            rows={8}
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
            placeholder="Write the full article body here"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">SEO title</label>
            <input
              value={form.seoTitle}
              onChange={handleChange('seoTitle')}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
              placeholder="Search title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">SEO description</label>
            <input
              value={form.seoDescription}
              onChange={handleChange('seoDescription')}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
              placeholder="Meta description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">SEO keywords</label>
            <input
              value={form.seoKeywords}
              onChange={handleChange('seoKeywords')}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
              placeholder="keyword1, keyword2"
            />
          </div>
        </div>
        <button type="submit" disabled={isSubmitting} className="btn-primary disabled:cursor-not-allowed disabled:opacity-70">
          {isSubmitting ? 'Saving…' : mode === 'edit' ? 'Save changes' : isAdmin ? 'Publish article' : 'Submit for admin review'}
        </button>
        {saved && (
          <p className="mt-3 text-sm text-green-600 dark:text-green-400">
            {mode === 'edit' ? 'Article updated successfully.' : isAdmin ? 'Article saved successfully.' : 'Your story has been submitted and is awaiting admin approval.'}
          </p>
        )}
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      </form>
    </div>
  )
}
