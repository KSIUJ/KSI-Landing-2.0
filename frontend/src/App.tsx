import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop /> 

      <div className="bg-[#EDF2F4]">
        <Navbar />
        
        <AnimatePresence>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4,
              ease: "easeInOut"
            }}
          >
            <Outlet /> 
          </motion.div>
        </AnimatePresence>
        
        <Footer />
      </div>
    </>
  );
}

export default App;