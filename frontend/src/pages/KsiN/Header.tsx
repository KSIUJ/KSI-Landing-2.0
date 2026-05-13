import ksinImg from "../../assets/images/events/ksin.jpg";

const Header = () => {
  return (
    <header className="relative pt-20 h-[420px] overflow-hidden">
      <img
        src={ksinImg}
        className="absolute inset-0 w-full h-full object-cover"
        alt="KSI^n"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#121063]/80 to-[#121063]/30" />
      <div className="relative h-full flex items-center px-[clamp(16px,10%,200px)]">
        <div>
          <h1 className="font-inter text-white font-semibold text-[clamp(2rem,6vw,5rem)] leading-tight">
            KSI<sup className="text-[0.6em]">n</sup>
          </h1>
          <p className="font-ssp text-white/80 text-lg mt-2">
            Konferencja Studencka KSI
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
