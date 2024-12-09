// app/layout.tsx
import RootLayout from "@/app/layout/RootLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout>{children}</RootLayout>;
}
