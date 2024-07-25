import "./ServerScreen.css";

import flags from "../FlagDisplay";
import { useState } from "react";

function ServerScreen() {
    const [activeSection, setActiveSection] = useState("");

    return (
        <div>
            <div className="section-container">
                <section onClick={() => setActiveSection("traffic")}>
                    <h3>Traffic</h3>
                </section>
                <section onClick={() => setActiveSection("streaming")}>
                    <h3>Streaming</h3>
                </section>
                <section onClick={() => setActiveSection("torrent")}>
                    <h3>Torrent</h3>
                </section>
            </div>
            <h1>Test</h1>
        </div>
    );
}

export default ServerScreen;