import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi'
import BreakingNews from '../Common/BreakingNews'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Politics', href: '/articles/category/politics' },
    { name: 'Business', href: '/articles/category/business' },
    { name: 'Technology', href: '/articles/category/technology' },
    { name: 'Sports', href: '/articles/category/sports' },
    { name: 'Entertainment', href: '/articles/category/entertainment' },
    { name: 'Africa', href: '/articles/category/africa' },
    { name: 'Rwanda', href: '/articles/category/rwanda' },
  ]

  const rssItem = { name: 'RSS', href: `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000'}/api/articles/rss` }

  return (
    <header className="sticky top-0 z-50 border-b border-[#007A5E]/30 bg-[#2563EB] shadow-sm">
      <BreakingNews text="Breaking: African Union Summit 2024 - Key decisions announced" />

      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">Top Africa</span>
            <span className="text-xl font-light text-slate-200">News</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-6 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white transition hover:text-[#A7F3D0]"
              >
                {item.name}
              </Link>
            ))}
            <a
              href={rssItem.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition hover:text-[#A7F3D0]"
            >
              {rssItem.name}
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-lg p-2 text-white hover:bg-white/10"
              >
                {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
            )}

            <Link
              href="/reporter/dashboard"
              className="hidden rounded-lg border border-[#007A5E] bg-[#007A5E] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#00684E] md:block"
            >
              Reporter
            </Link>

            <Link
              href="/admin/dashboard"
              className="hidden rounded-lg bg-white px-3 py-2 text-sm font-semibold text-[#2563EB] transition hover:bg-slate-100 md:block"
            >
              Admin
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 text-white hover:bg-white/10 lg:hidden"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-t border-white/20 py-4 lg:hidden">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white transition hover:text-[#A7F3D0]"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href={rssItem.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition hover:text-[#A7F3D0]"
                onClick={() => setIsOpen(false)}
              >
                {rssItem.name}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}