import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LUẬT AI – Trợ lý pháp luật Việt Nam",
  description: "AI Legal Assistant cho pháp luật Việt Nam",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
