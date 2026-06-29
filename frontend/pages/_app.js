import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system">
        <Component {...pageProps} />
        <Toaster position="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
  )
}