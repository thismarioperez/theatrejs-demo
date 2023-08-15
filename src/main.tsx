import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import App from "./App";
import "./main.css";

if (import.meta.env.MODE === "development") {
    studio.extend(extension);
    studio.initialize();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Suspense fallback={null}>
            <App />
        </Suspense>
    </React.StrictMode>
);