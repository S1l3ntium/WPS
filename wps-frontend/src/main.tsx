import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./app/App.tsx";
import { ErrorBoundary } from "./app/ErrorBoundary.tsx";
import { LocaleProvider } from "./context/LocaleContext.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <HelmetProvider>
      <BrowserRouter>
        <LocaleProvider>
          <App />
        </LocaleProvider>
      </BrowserRouter>
    </HelmetProvider>
  </ErrorBoundary>
);
