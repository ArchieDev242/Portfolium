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
  title: "Portfolio",
  description: "My portfolio website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={press.variable}>
        <ThemeProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
