import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-xl font-semibold">Stay in the loop</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Get curated news briefs delivered to your inbox every morning.</p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          className="flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-red-500 dark:border-slate-700 dark:bg-slate-950"
        />
        <button type="submit" className="btn-primary">
          Subscribe
        </button>
      </form>
      {submitted && <p className="mt-3 text-sm text-green-600">Thanks for subscribing.</p>}
    </section>
  )
}
