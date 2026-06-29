import Layout from '../../components/Layout/Layout';
import ProtectedPage from '../../components/Auth/ProtectedPage';
import Dashboard from '../../components/Admin/Dashboard';

export default function AdminDashboardPage() {
  return (
    <Layout>
      <ProtectedPage requiredRole="admin" title="Sign in to access the newsroom dashboard" description="Admins can review submissions, publish content, and manage workflow access.">
        <Dashboard />
      </ProtectedPage>
    </Layout>
  );
}
