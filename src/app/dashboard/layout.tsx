import { CurrentUserProvider } from "@/providers/current-user-provider"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <CurrentUserProvider>{children}</CurrentUserProvider>
}
