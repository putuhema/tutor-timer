import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Metadata } from "next"
import { Toaster } from "sonner"

export const metadata: Metadata = {
  title: 'Dashboard'
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
        <Toaster />
      </main>
    </SidebarProvider>
  )
}
