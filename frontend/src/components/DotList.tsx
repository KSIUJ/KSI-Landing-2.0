const DotList = (props: { items: string[] }) => {
  return (
    <ul className="font-ssp list-none pl-5 font-extralight">
      {props.items.map((text, idx) => (
        <li key={idx} className="before:content-['◦'] before:mr-2">
          {text}
        </li>
      ))}
    </ul>
  );
};
export default DotList;
