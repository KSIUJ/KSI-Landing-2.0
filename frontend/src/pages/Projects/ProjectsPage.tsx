import InfoSection from "../../components/InfoSection";
import PrinterImg from "../../assets/images/projects/3d.jpg";
import ProjectCard from "./ProjectCard";
import { WORK_IN_PROGRESS, FINISHED, ARCHIVE } from "./data";
const ProjectsPage = () => {
  const projectsCardWrapper =
    "flex md:flex-row flex-col gap-4 md:gap-12 flex-wrap justify-center";
  return (
    <div className="pt-24  flex flex-col gap-4 items-center justify-center">
      <InfoSection
        className="text-center"
        headerText="Poznaj nasze projekty, tworzone z pasją przez studentów"
        headerClasses="text-4xl"
      />
      <InfoSection
        headerText="WORK IN PROGRESS"
        headerClasses="font-light text-3xl"
      />
      {WORK_IN_PROGRESS.map((p, i) =>
        i % 2 === 0 ? (
          <div key={p.projectName} className={projectsCardWrapper}>
            <ProjectCard {...p} />
            {WORK_IN_PROGRESS[i + 1] && (
              <ProjectCard {...WORK_IN_PROGRESS[i + 1]} />
            )}
          </div>
        ) : null
      )}

      <InfoSection
        className="mb-2"
        headerText="ZAKOŃCZONE"
        headerClasses="text-3xl font-light"
      />
      {FINISHED.map((p, i) =>
        i % 2 === 0 ? (
          <div key={p.projectName} className={projectsCardWrapper}>
            <ProjectCard {...p} />
            {FINISHED[i + 1] && <ProjectCard {...FINISHED[i + 1]} />}
          </div>
        ) : null
      )}
      <InfoSection
        headerText="ARCHIWALNE"
        headerClasses="font-light text-3xl"
      />
      {ARCHIVE.map((p, i) =>
        i % 2 === 0 ? (
          <div key={p.projectName} className={projectsCardWrapper}>
            <ProjectCard {...p} />
            {ARCHIVE[i + 1] && <ProjectCard {...ARCHIVE[i + 1]} />}
          </div>
        ) : null
      )}
    </div>
  );
};
export default ProjectsPage;
