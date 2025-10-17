import InfoSection from "../../components/InfoSection";
import PrinterImg from "../../assets/images/projects/3d.jpg";
import ProjectCard from "./ProjectCard";
import { WORK_IN_PROGRESS, FINISHED, ARCHIVE } from "./data";
const ProjectsPage = () => {
  const projectsCardWrapper =
    "flex md:flex-row flex-col gap-4 md:gap-12 flex-wrap justify-center";
  return (
    <main className="bg-slate-50/75">
      <header className="bg-slate-800 pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white font-inter">Projekty</h1>
          <p className="text-slate-200 text-lg md:text-xl mt-3 max-w-3xl mx-auto font-ssp font-light">
            Poznaj nasze projekty, tworzone z pasją przez studentów
          </p>
        </div>
      </header>
    <div className="pt-24  flex flex-col gap-4 items-center justify-center">
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
    </main>
  );
};
export default ProjectsPage;
