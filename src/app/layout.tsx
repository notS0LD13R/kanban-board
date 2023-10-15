import type { Metadata } from "next";
import { Cairo, Open_Sans } from "next/font/google";

import "./globals.scss";

const font1 = Cairo({ subsets: ["latin"], variable: "--major-font" });
const font2 = Open_Sans({ subsets: ["cyrillic"], variable: "--minor-font" });

export const metadata: Metadata = {
    title: "Kanban Board",
    description: "Kanban Board for tracking tasks",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    console.log("hello");
    console.log(font1, font2);
    return (
        <html lang="en">
            <body className={font1.variable + " " + font2.variable}>
                {children}
            </body>
        </html>
    );
}
