import HeroBanner from "./HeroBanner";
import LeftSideBorderedCard from "../../components/LeftSideBorderedCard";
import Card from "../../components/Card";
import {infoKSI} from "./data";
import { listItems } from "./data";
import { carouselImages } from "./data";
import { EventList } from "./EventList";
import BoardLeaderCard from "../../components/BoardLeaderCard";
import InfoSection from "../../components/InfoSection";
import ButtonWithArrowDown from "../../components/ButtonWithArrowDown";
import { BigListWithParagraphs } from "./BigListWithParagraphs";
import AutoCarousel from "./ImgCarousel";

const LandingPage = () => {

    return(
        <>
            <HeroBanner/>
            
            <div className="bg-[#2B2D42] justify-items-center px-3 py-3">
                <div className="flex flex-row max-w-4xl items-center text-white">
                    <Card
                        title={infoKSI[1].title}
                        //className={props.className}
                        titleClasses="text-4xl text-white font-inter text-[clamp(1rem,4vw,2rem)]"
                        >
                        <div className="flex flex-col gap-1 p-3 border-l-2 border-white">
                            {infoKSI[1].paragraph}
                        </div>
                    </Card>
                    <img className="hidden md:block w-50 h-auto invert" src="/src/assets/images/base/logo-ksi.svg" alt="KSI Logo" />
                </div>

            </div>
            
            <div className="flex flex-col mt-35 md:mt-0 max-w-4xl w-full mx-auto mt-5  md:flex-row gap-10">
                

                <div className="relative w-64 md:w-120 md:px-2 mx-auto content-center">
                        <img
                            src={"/src/assets/images/events/53229668_2380325235334565_8317455106463236096_o.jpg"}
                            className="absolute w-7/8 -right-1/5 bottom-3/4 md:w-5/8 md:-right-1/10 md:bottom-9/16 h-auto object-cover rounded-4xl z-10"
                        />
                        <img
                            src={"/src/assets/images/events/aboutKsi1.jpg"}
                            className="relative bottom-1/10 -left-1/5 md:left-0 md:-bottom-1/10 w-full h-auto object-cover rounded-4xl"
                        />
                    
                </div>

            <div className="flex flex-col w-full mb-4 px-8 md:mt-8 md:w-[480px]">
                <h1 className="text-4xl font-semibold font-inter">Co nas wyróżnia?</h1>

                <BigListWithParagraphs items={listItems}/>
            </div>
            </div>
            
            <AutoCarousel images={carouselImages}/>
            <EventList/>
        </>
    )
}

export default LandingPage; 