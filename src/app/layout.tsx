import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "rugged. | custom rugs, made with love", description: "Hand-tufted custom rugs with personality. Dream it, and Esh will tuft it." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
