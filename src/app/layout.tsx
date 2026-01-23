// Root layout - minimal, just defines html structure
// Actual layout is handled by [locale]/layout.tsx

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
