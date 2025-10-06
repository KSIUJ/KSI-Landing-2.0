import Navbar from "./components/common/Navbar";
import AboutPage from "./pages/About/AboutPage";
import LandingPage from "./pages/Landing/LandingPage";
import NewsPage from "./pages/News/NewsPage";

function App() {
  return (
    <>
      <div className="bg-[#EDF2F4]">
         <Navbar /> 
         {/* <LandingPage/> */}
        {/* <AboutPage /> */}
        <NewsPage />
      </div>
    </>
  );
}

export default App;
