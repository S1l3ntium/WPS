import { createRoot } from "react-dom/client";
import "./styles/index.css";

console.log("✓ main-debug.tsx loaded");

// Test API import
try {
  const api = import("./services/api.ts");
  console.log("✓ api.ts can be imported");
} catch (e) {
  console.error("✗ api.ts import failed:", e);
}

// Test App import
try {
  const App = import("./app/App.tsx");
  console.log("✓ App.tsx can be imported");
} catch (e) {
  console.error("✗ App.tsx import failed:", e);
}

// Try to render a simple component
const root = createRoot(document.getElementById("root")!);

root.render(
  <div>
    <h1>Debug Mode</h1>
    <p>Check the browser console for more info</p>
  </div>
);
