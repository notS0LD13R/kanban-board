import "./page.scss";

import TopNav from "./Components/TopNav/TopNav";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="dashboard-layout">
            <TopNav />
            {children}
        </section>
    );
}
