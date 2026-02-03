import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Demande de Devis | CF Evolution",
  description:
    "Obtenez un devis personnalisé pour votre projet web, mobile, design ou marketing digital. CF Evolution, votre partenaire numérique.",
  keywords: [
    "devis",
    "site web",
    "application mobile",
    "design",
    "marketing digital",
    "CF Evolution",
  ],
  authors: [{ name: "CF Evolution" }],
  openGraph: {
    title: "Demande de Devis | CF Evolution",
    description:
      "Obtenez un devis personnalisé pour votre projet numérique avec CF Evolution.",
    type: "website",
    locale: "fr_FR",
    siteName: "CF Evolution",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
