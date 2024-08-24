import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavbarProvider } from "./contexts/NavBarContext.jsx";
import "./index.css";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NavbarProvider>
        <App />
      </NavbarProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
