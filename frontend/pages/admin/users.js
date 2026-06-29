import Layout from '../../components/Layout/Layout'

const sampleUsers = [
  { name: 'Amina K.', role: 'Admin' },
  { name: 'Musa T.', role: 'Reporter' },
  { name: 'Jane M.', role: 'Reporter' },
]

export default function UsersPage() {
  return (
    <Layout>
      <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">Team management</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">Reporter roster</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Review the newsroom team and manage who can submit stories for admin review.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {sampleUsers.map((user) => (
          <div key={user.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{user.role}</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">{user.name}</h2>
          </div>
        ))}
      </div>
    </Layout>
  )
}
