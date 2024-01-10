import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils";
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata = {
  title: "Use Telegraph Image",
  description: "Use Telegraph Image, Max Size 5mb",
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
