import Script from "next/script";
import "./globals.css";
import { Inter } from "next/font/google";
// import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wrapped for TikTok",
  description: "Get insights into your time on TikTok 🚀",
};

const PLAUSIBLE_EVENTS =
  "window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>

      <body className={`${inter.className} w-screen min-h-screen`}>
        {children}

        {/* <Script
          data-domain="wrapped.vantezzen.io"
          src="https://a.vantezzen.io/js/script.tagged-events.js"
        /> */}

        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2897522586959089"
          crossOrigin="anonymous"
        ></Script>

        {/* <GoogleAnalytics gaId="G-9C99MWZ0PM" /> */}

        <script dangerouslySetInnerHTML={{ __html: PLAUSIBLE_EVENTS }}></script>
      </body>
    </html>
  );
}
