import HeroBanner from "./HeroBanner";
import LeftSideBorderedCard from "../../components/LeftSideBorderedCard";
import Card from "../../components/Card";
import {infoKSI} from "./data"

const LandingPage = () => {

    return(
        <>
            <HeroBanner/>
            <div className="flex flex-col items-center max-w-4xl mt-4 mx-auto px-4 md:px-8">
                <LeftSideBorderedCard title={infoKSI[0].title} titleClasses="text-4xl font-inter">
                    {infoKSI[0].paragraph}
                </LeftSideBorderedCard>
            </div>
        </>
    )
}

export default LandingPage;