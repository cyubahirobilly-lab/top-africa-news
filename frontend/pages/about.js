import Layout from '../components/Layout/Layout'

export default function AboutPage() {
  return (
    <Layout>
      <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">About us</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900 dark:text-slate-100">Top Africa News</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Top Africa News delivers fast, accurate stories from every region of the continent. Our mission is to elevate African voices with trustworthy journalism and a digital-first publishing platform.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <section className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">What we cover</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">Politics, business, technology, culture, sports, and regional innovation — all from an African perspective.</p>
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Our editorial process</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">Reporters submit stories through the reporter panel, and all content is reviewed by admins before publication to ensure quality and accuracy.</p>
        </section>
      </div>
    </Layout>
  )
}
