import Link from 'next/link'

const fallbackArticles = [
  { title: 'Regional summit highlights new trade opportunities', slug: 'regional-summit-highlights-new-trade-opportunities', excerpt: 'Governments and businesses are aligning around shared infrastructure and digital priorities.' },
  { title: 'Technology hubs grow across East Africa', slug: 'technology-hubs-grow-across-east-africa', excerpt: 'New incubators and funding channels are bringing fresh momentum to local startups.' },
]

export default function FeaturedNews({ articles = [] }) {
  const list = articles.length ? articles : fallbackArticles

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Featured stories</h2>
        <Link href="/articles" className="text-sm font-medium text-red-600">View all</Link>
      </div>
      <div className="space-y-4">
        {list.slice(0, 4).map((article) => (
          <div key={article.slug} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">{article.title}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{article.excerpt}</p>
            <Link href={`/articles/${article.slug}`} className="mt-3 inline-flex text-sm font-medium text-red-600">
              Read more →
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
