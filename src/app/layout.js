import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Premium E-Commerce",
  description: "Next.js E-Commerce built with Supabase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
