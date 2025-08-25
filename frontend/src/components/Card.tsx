import type { ReactNode } from "react";
const Card = (props: {
  title?: string;
  className?: string;
  titleClasses?: string;
  children?: ReactNode;
}) => {
  return (
    <div className={`${props.className} `}>
      <div className="flex flex-col">
        {props.title && (
          <h2 className={`${props.titleClasses}`}>{props.title}</h2>
        )}
        {props.children && <div className="mt-2">{props.children}</div>}
      </div>
    </div>
  );
};

export default Card;
