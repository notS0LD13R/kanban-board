import "./page.scss";

import TopBoard from "./Components/TopBoard/TopBoard";
import KanbanBoard from "./Components/KanbanBoard/KanbanBoard";

export default function Home() {
    return (
        <main className="dashboard">
            <TopBoard />
            <KanbanBoard />
        </main>
    );
}
