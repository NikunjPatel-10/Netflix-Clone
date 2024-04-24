"use client";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "./globals.css";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body>
          <div className="h-100 flex flex-col">
            <div className="w-full flex  items-center fixed z-10 bg-black h-16">
              <Header />
            </div>
            <div className=" flex-grow mt-16">{children}</div>
          </div>
        </body>
      </UserProvider>
    </html>
  );
}
