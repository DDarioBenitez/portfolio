import "./index.css";
import { usePathname } from "./hooks/usePathname";
import { parseProjectPath } from "./lib/routes";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";

function App() {
  const pathname = usePathname();
  const project = parseProjectPath(pathname);

  if (project) return <ProjectDetail slug={project.slug} lang={project.lang} />;
  return <Home />;
}

export default App;
