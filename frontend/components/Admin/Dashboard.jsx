import Link from 'next/link'

export default function Dashboard() {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">Admin control center</p>
      <h1 className="mt-3 text-4xl font-semibold text-slate-900 dark:text-slate-100">Approve stories and manage newsroom workflows</h1>
      <p className="mt-4 text-slate-600 dark:text-slate-400">
        Review submitted articles, approve new content, manage reporters, and keep the site updated with the latest coverage. Admin approval is required before any reporter story goes live.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Link href="/admin/approvals" className="block rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center dark:border-slate-800 dark:bg-slate-950">
          <p className="text-sm uppercase tracking-[0.3em] text-red-600">Approvals</p>
          <h2 className="mt-4 text-xl font-semibold">Pending stories</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Review all submitted content awaiting publication.</p>
        </Link>

        <Link href="/admin/create" className="block rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center dark:border-slate-800 dark:bg-slate-950">
          <p className="text-sm uppercase tracking-[0.3em] text-red-600">Create</p>
          <h2 className="mt-4 text-xl font-semibold">Publish content</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Add a new article directly as an admin author.</p>
        </Link>

        <Link href="/admin/articles" className="block rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center dark:border-slate-800 dark:bg-slate-950">
          <p className="text-sm uppercase tracking-[0.3em] text-red-600">Manage</p>
          <h2 className="mt-4 text-xl font-semibold">Edit and search</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Search all stories, update them, and remove outdated coverage.</p>
        </Link>

        <Link href="/admin/users" className="block rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center dark:border-slate-800 dark:bg-slate-950">
          <p className="text-sm uppercase tracking-[0.3em] text-red-600">Reporters</p>
          <h2 className="mt-4 text-xl font-semibold">Team management</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Manage reporter access and newsroom permissions.</p>
        </Link>
      </div>
    </section>
  )
}
