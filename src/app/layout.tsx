import type { Metadata } from "next";
import { Cairo, Open_Sans } from "next/font/google";

import "./global.css";

const font1 = Cairo({
    subsets: ["latin"],
    variable: "--major-font",
    weight: ["400", "500", "600", "700", "800", "900"],
});
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
    console.log(font1, font2);
    return (
        <html lang="en">
            <body
                className={
                    font1.variable +
                    " " +
                    font2.variable +
                    " __variable_ec6999" +
                    " __variable_4297f9"
                }
            >
                {children}
            </body>
        </html>
    );
}
