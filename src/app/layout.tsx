import SessionWrapper from "@/components/sessionwrapper";
import { ReactNode } from "react";
import Navbar from "@/components/navbar";
export const metadata = {
  title: "My App",
  icons: {
    icon: "/favicon-32x32.png",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Navbar/>
      <body>

        {/* SessionWrapper is a client component, but it's fine here */}
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}