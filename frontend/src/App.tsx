import Navbar from "./components/common/Navbar";
import AboutPage from "./pages/About/AboutPage";
import LandingPage from "./pages/Landing/LandingPage";
import Footer from "./components/common/Footer";
import ProjectsPage from "./pages/Projects/ProjectsPage";
import EventsPage from "./pages/Events/EventsPage";
function App() {
  return (
    <>
      <div className="bg-[#EDF2F4]">
        <Navbar />
        {/* <LandingPage /> */}
        {/* <AboutPage /> */}
        {/* <EventsPage /> */}
        <ProjectsPage />
        <Footer />
      </div>
    </>
  );
}

export default App;
