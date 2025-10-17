const BoardLeaderCard = (props: {
  image: string;
  name: string;
  role: string;
  className?: string;
}) => {
  return (
    <div className={`relative  ${props.className}`}>
      <img
        src={props.image}
        alt={props.name}
        className="w-full h-full object-cover rounded-4xl"
      />
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-300 rounded-4xl bg-blue-950/65 flex flex-col justify-center items-center">
        <p className="font-inter font-light text-xl text-white text-center">
          {props.name} – {props.role}
        </p>
      </div>
    </div>
  );
};

export default BoardLeaderCard;
