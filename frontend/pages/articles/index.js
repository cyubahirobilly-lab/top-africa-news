import Layout from '../../components/Layout/Layout'
import ArticleList from '../../components/Articles/ArticleList'

const articles = [
  {
    title: 'A new era of African innovation is reshaping the continent',
    excerpt: 'Governments and startups are turning climate and infrastructure investment into long-term growth.',
    slug: 'african-innovation-reshaping-the-continent',
    category: 'Technology',
  },
  {
    title: 'Regional summit highlights new trade opportunities',
    excerpt: 'Leaders are aligning around cross-border investment and logistics growth.',
    slug: 'regional-summit-highlights-new-trade-opportunities',
    category: 'Business',
  },
]

export default function ArticlesPage() {
  return (
    <Layout>
      <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">Latest stories</p>
        <h1 className="mt-3 text-3xl font-semibold">Explore our reporters' coverage</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">Browse the latest approved news articles from our editor-reviewed newsroom.</p>
      </div>
      <ArticleList articles={articles} />
    </Layout>
  )
}
