import Layout from '../../components/Layout/Layout'
import ProtectedPage from '../../components/Auth/ProtectedPage'
import ApprovalsPanel from '../../components/Admin/ApprovalsPanel'

export default function ApprovalsPage() {
  return (
    <Layout>
      <ProtectedPage requiredRole="admin" title="Sign in to review submissions" description="Admins can approve or reject stories before they are published to the homepage and article sections.">
        <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">Approval queue</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">Review reporter submissions</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Admins can approve or reject stories before they are published to the homepage and article sections.</p>
        </div>
        <ApprovalsPanel />
      </ProtectedPage>
    </Layout>
  )
}
