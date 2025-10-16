import Navbar from "./components/common/Navbar";
import AboutPage from "./pages/About/AboutPage";
import LandingPage from "./pages/Landing/LandingPage";
import Footer from "./components/common/Footer";


function App() {
  return (
    <>
      <div className="bg-[#EDF2F4]">
         <Navbar /> 
         <LandingPage/>
        {/* <AboutPage /> */}
        <Footer/>
      </div>
    </>
  );
}

export default App;
