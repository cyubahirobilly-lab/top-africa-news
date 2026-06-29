import ArticleCard from './ArticleCard'

const sampleArticles = [
  { title: 'New rail project opens trade routes', excerpt: 'A new line is expected to accelerate regional commerce.', slug: 'new-rail-project-opens-trade-routes', category: 'Business' },
  { title: 'Startups attract fresh funding', excerpt: 'Venture capital looks to technology opportunities across the continent.', slug: 'startups-attract-fresh-funding', category: 'Technology' },
]

export default function ArticleList({ articles = [] }) {
  const list = articles.length ? articles : sampleArticles

  return (
    <section className="mt-8 grid gap-4 md:grid-cols-2">
      {list.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </section>
  )
}
