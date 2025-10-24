import arrowRightIcon from "../assets/images/base/icons/arrow-right.svg";
import type { ReactNode, ReactElement } from "react";

const ArrowList = (props: { items: ReactElement[]; children?: ReactNode }) => {
  return (
    <ul className="list-none">
      {props.items.map((element, idx) => (
        <li
          key={idx}
          className="flex gap-1 items-center font-ssp text-xl font-light"
        >
          <span
            className="font-light font-openSans relative cursor-pointer
             after:content-[''] after:absolute after:left-0 after:bottom-0 
             after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 
             hover:after:w-full"
          >
            {element}
          </span>
          <img
            src={arrowRightIcon}
            alt="arrow-right icon"
            className="w-4 h-4"
          />
        </li>
      ))}
      {props.children}
    </ul>
  );
};

export default ArrowList;
