import "./page.scss";
import TopNav from "./Components/TopNav/TopNav";
import SideNav from "./Components/SideNav/SideNav";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <SideNav />
            <section className="dashboard-layout">
                <TopNav />
                {children}
            </section>
        </>
    );
}
