// layout/RootLayout.tsx
import Navbar from "../../components/NavBar";
import "../../app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Navbar visível em todas as páginas */}
        <Navbar />
        {/* Conteúdo principal da página */}
        <main>{children}</main>
      </body>
    </html>
  );
}
