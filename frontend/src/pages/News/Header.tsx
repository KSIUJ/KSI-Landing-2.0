import facade from "../../assets/images/base/facade_4v3.svg";

const Header = () => {
    return (
        <header className="relative pt-20">
            <img src={facade} className="relative w-full h-auto"/>
            <div className="absolute w-3/8 h-1/4 bottom-1/4 left-0 flex items-start justify-center">
                <h1 className="font-inter text-[#2B2D42] font-semibold text-[clamp(1rem,5vw,8rem)]">
                    Aktualności<br/>i wydarzenia
                </h1>
            </div>
        </header>
    );
}
export default Header;