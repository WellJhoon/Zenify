import Provider from "@/context/SessionProvider";
import "./globals.css";
import type { Metadata } from "next";
import {Montserrat} from "next/font/google"
import "tw-elements/dist/css/tw-elements.min.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zenify",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
