import { Outlet, createRootRoute } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import { queryClient } from '@/api/query-client'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Sidebar />
      <main className="bg-[#475263]">
        <Outlet />
      </main>
      <Toaster />
    </QueryClientProvider>
  ),
})
