import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <main className="container-custom py-8">{children}</main>
      <Footer />
    </div>
  )
}
