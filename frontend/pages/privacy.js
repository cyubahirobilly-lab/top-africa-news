import Layout from '../components/Layout/Layout'

export default function PrivacyPage() {
  return (
    <Layout>
      <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">Privacy policy</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900 dark:text-slate-100">Your data is protected</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">We collect only the information needed to improve your experience and keep you informed. Personal data is never sold or shared outside of our editorial and newsletter systems.</p>
      </div>

      <div className="mt-8 space-y-6">
        <section className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">What we collect</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">Email addresses for newsletters, feedback submissions, and optional account registration details for reporters and admins.</p>
        </section>
        <section className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">How it is used</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">We use collected data to deliver updates, manage user roles, and ensure quality editorial workflows.</p>
        </section>
      </div>
    </Layout>
  )
}
