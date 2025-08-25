import Card from "./Card";
import type { ReactNode } from "react";
const LeftSideBorderedCard = (props: {
  title: string;
  titleClasses?: string;
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <Card
      title={props.title}
      className={props.className}
      titleClasses={props.titleClasses}
    >
      <div className="flex flex-col gap-1 p-3 border-l-2 border-gray-900">
        {props.children}
      </div>
    </Card>
  );
};

export default LeftSideBorderedCard;
