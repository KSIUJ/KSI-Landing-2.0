import Navbar from "./components/common/Navbar";
import AboutPage from "./pages/About/AboutPage";
import ProjectsPage from "./pages/Projects/ProjectsPage";
function App() {
  return (
    <>
      <div className="bg-[#EDF2F4]">
        <Navbar />
        {/* <AboutPage /> */}
        <ProjectsPage />
      </div>
    </>
  );
}

export default App;
