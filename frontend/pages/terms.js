import Layout from '../components/Layout/Layout'

export default function TermsPage() {
  return (
    <Layout>
      <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">Terms of service</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900 dark:text-slate-100">Use Top Africa News responsibly</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">By using our site, you agree to respect our editorial standards, avoid sharing harmful content, and follow the approval workflow for newsroom submissions.</p>
      </div>

      <div className="mt-8 space-y-6">
        <section className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Reporting requirements</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">Reporters must submit accurate content and provide sources when needed. Admin users must review and approve all reporter submissions.</p>
        </section>
        <section className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Content ownership</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">All published stories are owned by Top Africa News with proper credit given to authors and reporters.</p>
        </section>
      </div>
    </Layout>
  )
}
