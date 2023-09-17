import "./globals.scss";
import type { Metadata } from "next";
import { Cairo, Open_Sans } from "next/font/google";

import SideNav from "./Components/SideNav/SideNav";

const font1 = Cairo({ subsets: ["latin"], variable: "--major-font" });
const font2 = Open_Sans({ subsets: ["cyrillic"], variable: "--minor-font" });

export const metadata: Metadata = {
    title: "Weframe-NextJS",
    description: "Internship assignment",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={font1.variable + " " + font2.variable}>
                {" "}
                <SideNav /> {children}
            </body>
        </html>
    );
}