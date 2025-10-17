import InfoSection from "../../components/InfoSection";
import InformatorImg from "../../assets/images/projects/informator.png";
import MordorImg from "../../assets/images/projects/mordor.png";
import ErcImg from "../../assets/images/projects/erc.png";
import GutenbergImg from "../../assets/images/projects/gutenberg.png";
import KSILockImg from "../../assets/images/projects/lock.jpg";
import KSIAuthImg from "../../assets/images/projects/cas.png";
import ArdaImg from "../../assets/images/projects/arda.jpg";
import PrinterImg from "../../assets/images/projects/3d.jpg";
import KlasterImg from "../../assets/images/projects/wieza-900x1428.png";
import KSIRciankaImg from "../../assets/images/projects/ksircianka.jpg";
import ProjectCard from "./ProjectCard";
interface Project {
  imgSrc: string;
  alt: string;
  projectName: string;
  projectDescription: string;
  objectCrop?: string;
  button?: boolean;
  githubLink?: string;
}
export const WORK_IN_PROGRESS: Project[] = [
  {
    imgSrc: InformatorImg,
    objectCrop: "20%-50%",
    projectName: "INFORMATOR",
    alt: "KSI Informator Landing page",
    projectDescription:
      "Poradnik pomagający pierwszorocznym studentom zgłębić tajniki studiowania na naszym wydziale.",
    githubLink: "https://github.com/KSIUJ/informator",
  },
  {
    imgSrc: MordorImg,
    alt: "KSI MORDOR LOGO",
    projectName: "MORDOR",
    projectDescription:
      "Aplikacja obsługująca repozytorium materiałów naukowych KSI. Bazuje na Spring Boot, napisana w Kotlinie.",
    githubLink: "https://github.com/KSIUJ/mordor",
  },
];
export const ARCHIVE: Project[] = [
  {
    imgSrc: PrinterImg,
    alt: "KSI 3D printer",
    projectName: "3D PRINTER",
    projectDescription:
      "Co można zrobić z kilkoma starymi komputerami? Zbudować eksperymentalny klaster obliczeniowy!",
    button: false,
  },
  {
    imgSrc: KlasterImg,
    alt: "KLASTER OBLICZENIOWY",
    projectName: "KLASTER OBLICZENIOWY",
    projectDescription:
      "Prusa i3 zbudowana przez KSI. Niestety zepsuła się jakiś czas temu. UPDATE: W październiku 2023 dostaliśmy nową od Wydziału! Dziękujemy!",
    button: false,
  },
  {
    imgSrc: KSIRciankaImg,
    alt: "KSIRCIANKA",
    projectName: "KSIRCIANKA",
    projectDescription:
      "Legendy mówią, że nadal można ją znaleźć gdzieś w siedzibie Koła - oficjalna gra karciana KSI - zaczęta, lecz nigdy nie dokończona.",
    button: false,
  },
];

export const FINISHED: Project[] = [
  {
    imgSrc: ErcImg,
    alt: "KSI ERC photo",
    projectName: "ERC",
    projectDescription:
      "Elektroniczny Rejestr Członków, zarządzający uprawnieniami i statusem członków Koła. Napisany przy użyciu Django oraz Vue.js.",
    githubLink: "https://github.com/KSIUJ/erc-backend",
  },
  {
    objectCrop: "20%-50%",
    imgSrc: GutenbergImg,
    alt: "Gutenberg landing page",
    projectName: "GUTENBERG",
    projectDescription:
      "Internetowa aplikacja bazująca na Django pozwalająca szybko i bezpiecznie drukować dokumenty z przeglądarki. Dostępna do użycia w KSI.",
    githubLink: "https://github.com/KSIUJ/gutenberg",
  },
  {
    imgSrc: KSILockImg,
    alt: "Ksi card near the card reader lock",
    projectName: "KSI LOCK",
    projectDescription:
      "System zamków elektronicznych do pomieszczeń naszego Koła - otwórz drzwi legitymacją studencką.",
    githubLink: "https://github.com/KSIUJ/ksilock",
  },
  {
    imgSrc: KSIAuthImg,
    alt: "KSI auth logging page",
    projectName: "KSIAUTH",
    projectDescription:
      "Centralne uwierzytelnienie do wszystkich usług internetowych KSI UJ.",
    button: false,
  },
  {
    imgSrc: ArdaImg,
    alt: "KSI Arda server",
    projectName: "ARDA",
    projectDescription: "Nasz główny serwer i baza dla innych projektów.",
    button: false,
  },
];
