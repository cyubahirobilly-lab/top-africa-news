import Layout from '../../components/Layout/Layout'
import ProtectedPage from '../../components/Auth/ProtectedPage'
import ReporterForm from '../../components/Admin/ReporterForm'

export default function ReporterDashboardPage() {
  return (
    <Layout>
      <ProtectedPage
        requiredRole="reporter"
        title="Sign in to submit a story"
        description="Reporters can draft and submit news items here. All submissions require admin approval before publishing."
      >
        <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">Reporter panel</p>
          <h1 className="mt-3 text-3xl font-semibold">Submit a story for review</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Reporters can draft and submit news items here. All submissions require admin approval before publishing.
          </p>
        </div>
        <ReporterForm />
      </ProtectedPage>
    </Layout>
  )
}
