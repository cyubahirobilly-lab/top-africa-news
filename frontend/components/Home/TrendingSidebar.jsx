import Link from 'next/link'

const fallbackTopics = [
  { title: 'Election updates', slug: 'election-updates' },
  { title: 'Climate action', slug: 'climate-action' },
  { title: 'Sports highlights', slug: 'sports-highlights' },
]

export default function TrendingSidebar({ trending = [] }) {
  const topics = trending.length ? trending : fallbackTopics

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-xl font-semibold">Trending now</h3>
      <ul className="mt-4 space-y-3">
        {topics.slice(0, 6).map((item) => (
          <li key={item.slug} className="border-b border-slate-100 pb-2 last:border-b-0 dark:border-slate-800">
            <Link href={`/articles/${item.slug}`} className="text-sm text-slate-700 hover:text-red-600 dark:text-slate-300">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
