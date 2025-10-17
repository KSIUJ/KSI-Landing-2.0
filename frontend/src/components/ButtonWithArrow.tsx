import arrowDown from "../assets/images/base/icons/arrow-down.svg";
import arrowRight from "../assets/images/base/icons/arrow-right.svg";
const ButtonWithArrowDown = (props: {
  down?: boolean;
  text: string;
  className?: string;
  onClick: () => any;
}) => {
  const buttonIcon = props.down ? arrowDown : arrowRight;
  return (
    <button
      className={`cursor-pointer flex gap-1 items-center font-light ${props.className}`}
      onClick={props.onClick}
    >
      <span className="relative after:left-0 after:-bottom-1 after:content-[''] after:absolute after:w-0 after:h-[2px] after:transition-all after:duration-300 hover:after:w-full after:bg-black font-medium">
        {props.text}
      </span>
      <img src={buttonIcon} alt="arrow icon" className="w-4 h-4" />
    </button>
  );
};
export default ButtonWithArrowDown;
