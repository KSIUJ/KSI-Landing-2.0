import type { ReactNode } from "react";
const InfoSection = (props: {
  className?: string;
  headerText: string;
  headerClasses?: string;
  paragraphText?: string;
  paragraphClasses?: string;
  children?: ReactNode;
}) => {
  return (
    <section className={props.className}>
      <h2 className={`${props.headerClasses}  font-inter`}>
        {props.headerText}
      </h2>
      {props.paragraphText && (
        <p className={`${props.paragraphClasses}  font-ssp font-light`}>
          {props.paragraphText}
        </p>
      )}
      {props.children}
    </section>
  );
};

export default InfoSection;
