import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from 'next/font/google'
import "./globals.css";
import { UserProvider } from '../context/UserContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata:Metadata = {
  title: 'URL Scraper',
  description: 'URL scraping and history tracking application',
}


// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
