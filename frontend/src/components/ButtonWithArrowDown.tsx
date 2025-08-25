import arrowDown from "../assets/images/base/icons/arrow-down.svg";

const ButtonWithArrowDown = (props: { text: string }) => {
  return (
    <button className="cursor-pointer flex gap-1 items-center">
      <span className="relative after:left-0 after:-bottom-1 after:content-[''] after:absolute after:w-0 after:h-[2px] after:transition-all after:duration-300 hover:after:w-full after:bg-black font-medium">
        {props.text}
      </span>
      <img src={arrowDown} alt="arrow-down icon" className="w-4 h-4" />
    </button>
  );
};
export default ButtonWithArrowDown;
