import Layout from '../../components/Layout/Layout'
import ProtectedPage from '../../components/Auth/ProtectedPage'
import ArticleForm from '../../components/Admin/ArticleForm'

export default function CreateArticlePage() {
  return (
    <Layout>
      <ProtectedPage requiredRole="admin" title="Sign in to publish content" description="Admins can publish stories immediately or save drafts for review.">
        <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">Admin authoring</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">Create news directly</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Admins can publish stories immediately or save drafts for review. Use this form to create site-wide content and manage editorial consistency.
          </p>
        </div>
        <ArticleForm isAdmin />
      </ProtectedPage>
    </Layout>
  )
}
