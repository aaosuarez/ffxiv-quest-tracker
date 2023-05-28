import "./globals.css";
import { Inconsolata } from "next/font/google";
import Navigation from "@/app/Navigation";
import classNames from "classnames";
const inter = Inconsolata({ subsets: ["latin"] });

export const metadata = {
  title: "FFXIV Side Quest Tracker",
  description: "A tracker for side quests in FFXIV.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={classNames(
          inter.className,
          "m-2 bg-stone-800 text-stone-300"
        )}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
