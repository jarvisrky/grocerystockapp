import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

// Update the metadata object to include the icon
export const metadata = {
  title: "GroceryStocks - Track Grocery Prices Like Stocks",
  description:
    "Think like Wallstreet before your trip to Wally world, a free, interactive way to save on the items you want!",
  icons: {
    icon: "/images/grocery-stock-logo.jpg",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'