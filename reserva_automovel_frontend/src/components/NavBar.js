import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar-container">
      <article className="nav-content">
        {/* Home */}
        <Link href="/">
          <label className="nav-link">
            <svg
              className="nav-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </label>
        </Link>

        {/* Carros */}
        <Link href="/carros">
          <label className="nav-link">
            <svg
              className="nav-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M13.91,5.32H8.18a1.93,1.93,0,0,0-1.53.76L4.36,9.14l-2.86.95v6.68H4.36a1.91,1.91,0,0,1,3.82,0h6.68a1.91,1.91,0,0,1,3.82,0H22.5V12.34a1.91,1.91,0,0,0-1.2-1.77L17.73,9.14,15.44,6.08A1.91,1.91,0,0,0,13.91,5.32Z" />
            </svg>
          </label>
        </Link>

        {/* Clientes */}
        <Link href="/clientes">
          <label className="nav-link">
            <svg
              className="nav-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </label>
        </Link>

        {/* Reservas */}
        <Link href="/reservas">
          <label className="nav-link">
            <svg
              className="nav-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M20 4h-3V2h-2v2H9V2H7v2H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM4 20c-1.103 0-2-.897-2-2v-9h18v9c0 1.103-.897 2-2 2H4z" />
            </svg>
          </label>
        </Link>
      </article>
    </div>
  );
}
