import InfoSection from "../../components/InfoSection";
import ProjectCard from "./ProjectCard";
import { useState, useEffect, useMemo } from "react";
import type { Project, StatusType } from "../http";
import { fetchProjects } from "../http";
import type { ProjectCardProps } from "./ProjectCard";
const sectionMap: { key: StatusType; title: string }[] = [
  { key: "ongoing", title: "WORK IN PROGRESS" },
  { key: "completed", title: "ZAKOŃCZONE" },
  { key: "archived", title: "ARCHIWALNE" },
];

const toCardProps = (p: Project): ProjectCardProps => ({
  imgSrc: p.image_url,
  alt: p.name,
  projectName: p.name,
  projectDescription: p.description,
  githubLink: p.link || undefined,
  button: !!p.link,
});
const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const fetchedProjects = await fetchProjects();
        setProjects([...fetchedProjects]);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const sections = useMemo(() => {
    const grouped: Record<StatusType, Project[]> = {
      ongoing: [],
      completed: [],
      archived: [],
    };
    for (const p of projects) grouped[p.status].push(p);

    return sectionMap.map(({ key, title }) => ({
      key,
      title,
      items: grouped[key],
    }));
  }, [projects]);

  const projectsCardWrapper =
    "flex md:flex-row flex-col gap-4 md:gap-12 flex-wrap justify-center";
  return (
    <main className="bg-slate-50/75">
      <header className="bg-slate-800 pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white font-inter">
            Projekty
          </h1>
          <p className="text-slate-200 text-lg md:text-xl mt-3 max-w-3xl mx-auto font-ssp font-light">
            Poznaj nasze projekty, tworzone z pasją przez studentów
          </p>
        </div>
      </header>
      <div className="pt-24  flex flex-col gap-4 items-center justify-center">
        {sections.map(({ key, title, items }) => (
          <section key={key} className="px-4 sm:px-6 lg:px-8">
            <InfoSection
              headerText={title}
              headerClasses="font-light text-3xl text-center"
            />
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 mt-2">
              {items.map((p) => (
                <ProjectCard key={p.name} {...toCardProps(p)} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
};
export default ProjectsPage;
