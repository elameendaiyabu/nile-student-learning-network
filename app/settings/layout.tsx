import ProfileNavBar from "@/components/ProfileNavBar"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main>
      <div className="flex">
        <ProfileNavBar />
        {children}
      </div>
    </main>
  )
}
