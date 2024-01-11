import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils";
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata = {
  title: "Telegraph 图床",
  description: "图床,免费图床,在线图床,图片上传,图片托管,图片分享,图片外链,开发者图床,博客图床,网站图床,社交媒体图床,图片压缩,国内图床",
  keywords:"图床,免费图床,在线图床,图片上传,图片托管,图片分享,图片外链,开发者图床,博客图床,网站图床,社交媒体图床,图片压缩,国内图床"
};
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: 1,
}
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased font-cn",
          fontSans.variable
        )}
      >
        {children}
        <Toaster richColors/>
      </body>
    </html>
  );
}
