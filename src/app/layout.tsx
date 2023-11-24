import type { Metadata } from "next";
import { Cairo, Open_Sans } from "next/font/google";

import "./global.css";
import { Toaster } from "sonner";

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
    return (
        <html lang="en">
            <body className={font1.variable + " " + font2.variable}>
                <Toaster richColors />
                {children}
            </body>
        </html>
    );
}
