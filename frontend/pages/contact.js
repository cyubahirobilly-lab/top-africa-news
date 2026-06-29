import Layout from '../components/Layout/Layout'

export default function ContactPage() {
  return (
    <Layout>
      <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">Get in touch</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900 dark:text-slate-100">Contact Top Africa News</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">Have a news tip, editorial inquiry, or partnership request? Reach our newsroom team using the details below.</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Editorial office</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">hello@topafricanews.com</p>
            <p className="mt-2 text-slate-600 dark:text-slate-400">+250 788 123 456</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Report a story</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">Reporters can submit story drafts in the reporter panel for review and approval.</p>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Admins manage approvals from the admin dashboard.</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
