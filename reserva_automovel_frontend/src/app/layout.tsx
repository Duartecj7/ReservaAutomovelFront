// app/layout.tsx
import Navbar from "../components/NavBar";
import "../app/globals.css";
import React from "react";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Navbar visível em todas as páginas */}
        <Navbar />
        {/* Conteúdo principal da aplicação */}
        <main>{children}</main>
      </body>
    </html>
  );
}
