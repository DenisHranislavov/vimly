import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Provider from "./provider";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vimly",
  description:
    "Vimly - A platform for discovering and sharing videos, articles, and helpful tools.",
  keywords:
    "Vimly, videos, articles, tools, sharing, platform, education, resources",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider session={null}>
      <html lang="en">
        <body className={`${inter.className} antialiased `}>
          <div className="relative w-full h-full bg-white">
            <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] z-0"></div>
            <div className="relative z-10">{children}</div>
          </div>
        </body>
      </html>
    </Provider>
  );
}
