"use client";

import "../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <title>私人组件库</title>
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}