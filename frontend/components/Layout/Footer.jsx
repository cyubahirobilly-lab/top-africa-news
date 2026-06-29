import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/80 py-8 dark:border-slate-800 dark:bg-slate-900/80">
      <div className="container-custom flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-slate-800 dark:text-slate-100">Top Africa News</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">Independent reporting for a connected continent.</p>
        </div>
        <div className="flex gap-4 text-sm text-slate-600 dark:text-slate-400">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  )
}
