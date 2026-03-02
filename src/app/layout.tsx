import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A Rúa Restaurante | Restaurante Gallego y Canalla en Madrid",
  description: "A Rúa Restaurante - Auténtica cocina gallega en Hortaleza, Madrid. Especialidades: Pulpo Rockero, Callos a la Gallega, Cachopo. Reserva tu mesa al 911 66 16 41. Abierto todos los días.",
  keywords: [
    "restaurante gallego Madrid",
    "A Rúa restaurante",
    "comida gallega Madrid",
    "pulpo a la brasa Madrid",
    "callos gallegos",
    "cachopo Madrid",
    "restaurante Hortaleza",
    "tapas gallegas",
    "marisco gallego",
    "restaurante tradicional Madrid",
    "comida española Madrid",
    "reservar restaurante Madrid",
    "mejor pulpo Madrid",
    "restaurante con encanto Madrid"
  ],
  authors: [{ name: "A Rúa Restaurante - Grupo Do Meigo" }],
  icons: {
    icon: "https://aruarestaurantes.com/wp-content/uploads/2025/07/logoo.png",
  },
  openGraph: {
    title: "A Rúa Restaurante | Cocina Gallega y Canalla en Madrid",
    description: "Un trocito de Galicia en Madrid. Comida de la costa noroeste con un punto canalla. Pulpo Rockero, Callos, Cachopo y más.",
    url: "https://aruarestaurantes.com",
    siteName: "A Rúa Restaurante",
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: "/download/IMG_1541.jpeg",
        width: 1200,
        height: 630,
        alt: "A Rúa Restaurante - Cocina Gallega en Madrid",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A Rúa Restaurante | Restaurante Gallego en Madrid",
    description: "Auténtica cocina gallega con un punto canalla. Pulpo, callos, cachopo y más. C. del Príncipe Carlos, 50, Hortaleza.",
    images: ["/download/IMG_1541.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://aruarestaurantes.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="geo.region" content="ES-MD" />
        <meta name="geo.placename" content="Madrid, Hortaleza" />
        <meta name="geo.position" content="40.4923;-3.6652" />
        <meta name="ICBM" content="40.4923, -3.6652" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
