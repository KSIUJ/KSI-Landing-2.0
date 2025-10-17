import Navbar from "./components/common/Navbar";
import AboutPage from "./pages/About/AboutPage";
import LandingPage from "./pages/Landing/LandingPage";
import Footer from "./components/common/Footer";
import ProjectsPage from "./pages/Projects/ProjectsPage";
import EventsPage from "./pages/Events/EventsPage";
import NewsPage from "./pages/News/NewsPage";

function App() {
  return (
    <>
      <div className="bg-[#EDF2F4]">
         <Navbar />
         <LandingPage />
        {/* <AboutPage /> */}
        {/* <EventsPage/> */}
        {/* <ProjectsPage/> */}
        {/* <NewsPage/> */}
        <Footer/>
      </div>
    </>
  );
}

export default App;
