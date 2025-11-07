import InfoSection from "../../components/InfoSection";
import ButtonWithArrowDown from "../../components/ButtonWithArrow";
export interface ProjectCardProps {
  imgSrc: string;
  alt: string;
  projectName: string;
  projectDescription: string;
  objectCrop?: string;
  button?: boolean;
  githubLink?: string;
}
const ProjectCard = ({
  imgSrc,
  alt,
  projectName,
  projectDescription,
  objectCrop,
  button = true,
  githubLink,
}: ProjectCardProps) => {
  return (
    <div className="flex flex-col gap-2 bg-white shadow-md p-4 mb-2 rounded-2xl max-w-xs">
      <img
        src={imgSrc}
        alt={alt}
        className={`object-cover object-[${objectCrop}] w-full aspect-square rounded-md`}
      />
      <InfoSection
        headerText={projectName}
        headerClasses="text-lg"
        paragraphText={projectDescription}
      />
      {button && (
        <a href={githubLink} target="_blank" rel="noopener noreferrer">
          <ButtonWithArrowDown
            down={false}
            onClick={() => {}}
            text="Zobacz na Github"
            className="text-md"
          ></ButtonWithArrowDown>
        </a>
      )}
    </div>
  );
};
export default ProjectCard;
