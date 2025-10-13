import { DashboardNavbar } from '@/components/DashboardNavbar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#030712]">
      <DashboardNavbar />
      <main className="bg-[#0f172a] min-h-screen">
        {children}
      </main>
    </div>
  )
}