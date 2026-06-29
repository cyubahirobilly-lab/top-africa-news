import Link from 'next/link'

export default function ArticleCard({ article }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-red-600">{article.category || 'News'}</p>
      <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">{article.title}</h3>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{article.excerpt}</p>
      <Link href={`/articles/${article.slug}`} className="mt-4 inline-flex text-sm font-semibold text-red-600">
        Read story →
      </Link>
    </article>
  )
}
