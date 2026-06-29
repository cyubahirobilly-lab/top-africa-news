export default function ArticleFull({ article }) {
  const title = article?.title || 'Sample article'
  const content = article?.content || 'Full article content will appear here.'
  const excerpt = article?.excerpt || 'A compelling story from across Africa.'
  const category = article?.category || 'News'

  return (
    <article className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#007A5E]">{category}</p>
      <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">{title}</h1>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">{excerpt}</p>
      <div className="prose prose-slate mt-8 max-w-none dark:prose-invert">
        <p>{content}</p>
      </div>
    </article>
  )
}
