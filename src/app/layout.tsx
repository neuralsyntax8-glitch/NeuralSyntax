import type { Metadata } from "next"
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageTransition } from "@/components/page-transition"
import { WebsiteSchema } from "@/components/jsonld"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://neuralsyntax.dev"),
  title: "NeuralSyntax – Master AI and Coding Before AnyOne Else",
  description:
    "Learn AI, Python, and Software Engineering through premium reading-style tutorials. Master AI and Coding Before AnyOne Else with NeuralSyntax.",
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "NeuralSyntax – Master AI and Coding Before AnyOne Else",
    description:
      "Learn AI, Python, and Software Engineering through premium reading-style tutorials. Master AI and Coding Before AnyOne Else with NeuralSyntax.",
    type: "website",
    images: ["/logo.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-primary">
        <WebsiteSchema />
        <Navbar />
        <main className="flex-1 pt-16">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  )
}
