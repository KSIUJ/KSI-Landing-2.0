const BoardMemberCard = (props: {
  imageSrc: string;
  name: string;
  role: string;
  className?: string;
}) => {
  return (
    <div
      className={`flex flex-col overflow-hidden justify-center items-center bg-white rounded-2xl shadow-md ${props.className}`}
    >
      <img
        src={props.imageSrc}
        alt={props.name}
        className="object-cover w-full aspect-square  rounded-lg mt-2"
      />
      <p className="font-medium  font-inter text-center mt-3">{props.name}</p>
      <p className="text-sm text-gray-600 font-light font-ssp">{props.role}</p>
    </div>
  );
};

export default BoardMemberCard;
