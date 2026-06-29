import Layout from '@/components/Layout/Layout'
import HeroCarousel from '@/components/Home/HeroCarousel'
import FeaturedNews from '@/components/Home/FeaturedNews'
import TrendingSidebar from '@/components/Home/TrendingSidebar'
import Newsletter from '@/components/Common/Newsletter'
import { NextSeo } from 'next-seo'

const sampleArticles = [
  { title: 'A new era of African innovation is reshaping the continent', excerpt: 'Governments and startups are turning climate and infrastructure investment into long-term growth.', slug: 'african-innovation-reshaping-the-continent', category: 'Technology' },
  { title: 'Regional summit highlights new trade opportunities', excerpt: 'Leaders are aligning around cross-border investment and logistics growth.', slug: 'regional-summit-highlights-new-trade-opportunities', category: 'Business' },
  { title: 'Rising health programs bring care closer to communities', excerpt: 'Mobile clinics and digital tools are expanding access in underserved regions.', slug: 'rising-health-programs-bring-care-closer-to-communities', category: 'Health' },
]

const sampleTrending = [
  { title: 'Election updates', slug: 'election-updates' },
  { title: 'Climate action', slug: 'climate-action' },
  { title: 'Sports highlights', slug: 'sports-highlights' },
]

export default function Home({ articles, trending }) {
  return (
    <Layout>
      <NextSeo
        title="Top Africa News - Latest News from Africa"
        description="Breaking news, politics, business, technology and sports from across Africa"
        openGraph={{
          title: 'Top Africa News',
          description: 'Latest news from across Africa',
          images: [{ url: 'https://topafricanews.com/og-image.jpg' }],
        }}
      />

      <HeroCarousel articles={articles.slice(0, 3)} />

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <FeaturedNews articles={articles.slice(0, 6)} />
        </div>
        <div className="lg:col-span-1">
          <TrendingSidebar trending={trending} />
          <Newsletter />
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  try {
    const [articlesRes, trendingRes] = await Promise.all([
      fetch('http://127.0.0.1:5000/api/articles?limit=20'),
      fetch('http://127.0.0.1:5000/api/trending?limit=10'),
    ])

    const articlesPayload = await articlesRes.json()
    const trendingPayload = await trendingRes.json()

    return {
      props: {
        articles: articlesPayload.data || sampleArticles,
        trending: trendingPayload.data || sampleTrending,
      },
    }
  } catch (error) {
    return {
      props: {
        articles: sampleArticles,
        trending: sampleTrending,
      },
    }
  }
}
