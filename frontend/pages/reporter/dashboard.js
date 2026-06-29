import Layout from '../../components/Layout/Layout'
import ProtectedPage from '../../components/Auth/ProtectedPage'
import JournalistDashboard from '../../components/Admin/JournalistDashboard'

export default function ReporterDashboardPage() {
  return (
    <Layout>
      <ProtectedPage
        requiredRole="reporter"
        title="Sign in to manage newsroom stories"
        description="Reporters can create, edit, delete, and upload images for stories from this dashboard."
      >
        <JournalistDashboard />
      </ProtectedPage>
    </Layout>
  )
}
