import Link from 'next/link'

const fallbackHero = {
  title: 'A new era of African innovation is reshaping the continent',
  excerpt: 'From fintech to renewable energy, the stories driving the continent forward are changing the global conversation.',
  slug: 'african-innovation-reshaping-the-continent',
}

export default function HeroCarousel({ articles = [] }) {
  const article = articles[0] || fallbackHero

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-white via-slate-50 to-red-50 p-8 text-slate-900 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-red-600">Featured story</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">{article.title}</h1>
          <p className="mt-4 text-lg text-slate-600">{article.excerpt}</p>
        </div>
        <Link href={`/articles/${article.slug}`} className="btn-primary w-fit">
          Read article
        </Link>
      </div>
    </section>
  )
}
