import "./index.css";
import App from "./App.tsx";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import Spinner from "./components/Spinner.tsx";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Suspense fallback={<Spinner />}>
            <App />
            <Toaster
                position="top-right"
                richColors
                closeButton
                toastOptions={{
                    className: "z-[1000]",
                }}
            />
        </Suspense>
    </React.StrictMode>
);
