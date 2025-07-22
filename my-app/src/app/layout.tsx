import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Contact App",
  description: "Contact application used for save your contacts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
