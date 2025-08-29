import Navbar from "./components/common/Navbar";
import AboutPage from "./pages/About/AboutPage";
import LandingPage from "./pages/Landing/LandingPage";

function App() {
  return (
    <>
      <div className="bg-[#EDF2F4]">
         <Navbar /> 
         <LandingPage/>
        <AboutPage />
      </div>
    </>
  );
}

export default App;
