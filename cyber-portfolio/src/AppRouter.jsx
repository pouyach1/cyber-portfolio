import { useEffect, useState } from "react";
import App from "./App";
import About from "./pages/About/About";
import InteractionLayer from "./components/interaction/InteractionLayer";
import { MotionFoundation } from "./motion";

function resolvePage(pathname) {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  if (normalized === "/about") return "about";
  return "home";
}

export default function AppRouter() {
  const [page, setPage] = useState(() => resolvePage(window.location.pathname));

  useEffect(() => {
    const onNavigate = () => setPage(resolvePage(window.location.pathname));
    window.addEventListener("popstate", onNavigate);
    return () => window.removeEventListener("popstate", onNavigate);
  }, []);

  return (
    <>
      <MotionFoundation />
      <InteractionLayer />
      {page === "about" ? <About /> : <App />}
    </>
  );
}
