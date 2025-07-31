import { primaryFont, secondaryFont } from "@/others/fonts";
import "../globals.css";
// Layout Components
import Header from "@/components/main/Header";
import SideMenu from "@/components/main/SideMenu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${primaryFont.variable} ${secondaryFont.variable} antialiased h-screen`}
      >
        <Header />
        <main className="flex gap-2.5 h-full pr-2.5">
          <SideMenu />
          <div className="relative pt-20 w-full">{children}</div>
        </main>
      </body>
    </html>
  );
}
