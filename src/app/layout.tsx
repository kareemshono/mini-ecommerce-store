import type { Metadata } from "next";
import { Noto_Sans_Arabic} from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Providers from "./providers";
const noto_sans_arabic = Noto_Sans_Arabic({
  subsets:["arabic"],
  weight:["300","400","500","700"],
  display: "swap",
  preload: true,
})
export const metadata: Metadata = {
  title: {
    default: "R-link fashion store",
    template: "%s | R-Link",
  },
  description:
    "اكتشف أحدث صيحات الموضة للرجال والنساء والأطفال والرياضة في متجر R-Link. تسوق بأفضل الأسعار مع توصيل سريع.",

  // Open Graph – will use current origin
  openGraph: {
    title: "R-link fashion store",
    description: "تسوق أحدث صيحات الموضة للجميع في R-Link",
    siteName: "R-Link",
    images: [
      {
        url: "/og-image.jpg", // Relative — works on any domain
        width: 1200,
        height: 630,
        alt: "R-Link Fashion Store",
      },
    ],
    locale: "ar_AE",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "R-Link | متجر الأزياء",
    description: "تسوق الموضة بأفضل الأسعار",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
  },


};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${noto_sans_arabic.className} antialiased max-w-screen overflow-x-hidden`}
      >
        <Navbar />
   <Providers>{children}</Providers> 
      </body>
    </html>
  );
}