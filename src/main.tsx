import "./index.css";
import App from "./App.tsx";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import Spinner from "./components/Spinner.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Suspense fallback={<Spinner />}>
            <App />
        </Suspense>
    </React.StrictMode>
);
