import Navbar from "./components/common/Navbar";
import AboutPage from "./pages/About/AboutPage";
import EventsPage from "./pages/Events/EventsPage";

function App() {
  return (
    <>
      <div className="bg-[#EDF2F4]">
        <Navbar />
        <EventsPage />
        {/* <AboutPage /> */}
      </div>
    </>
  );
}

export default App;
