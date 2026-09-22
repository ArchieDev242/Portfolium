import { Press_Start_2P } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { ThemeProvider } from "./theme-provider";

// our gaming font
const press = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: '--font-press-start'
});

export const metadata = {
  title: {
    default: "Maksym Kopychko | Game & Software Developer",
    template: "%s | Maksym Kopychko",
  },
  description: "Game and software developer skilled in Unreal Engine, C++, Lua, Python, and modern web technologies. Portfolio showcasing projects in game development, modding, and web applications.",
  authors: [{ name: "Maksym Kopychko", url: "https://github.com/ArchieDev242" }],
  creator: "Maksym Kopychko",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Maksym Kopychko Portfolio",
    title: "Maksym Kopychko | Game & Software Developer",
    description: "Game and software developer skilled in Unreal Engine, C++, Lua, Python, and modern web technologies.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang = "en" suppressHydrationWarning={true}>
      <body className = {press.variable}>
        <ThemeProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
