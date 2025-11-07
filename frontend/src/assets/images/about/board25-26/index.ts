import kulas from "./kulas.jpg";
import kulis from "./kulis.jpg";
import drukala from "./drukala.jpg";
import manijak from "./manijak.jpg";
import pautarak from "./pautarak.jpg";
import poneta from "./poneta.jpg";
import zmuda from "./zmuda.jpg";
export interface BoardMember {
  image: string;
  memberName: string;
  role: string;
}
export const boardMembers: ReadonlyArray<BoardMember> = [
  {
    image: kulis,
    memberName: "Tomasz Kulis",
    role: "Prezes",
  },
  {
    image: kulas,
    memberName: "Karolina Kulas",
    role: "Wiceprezes",
  },
  {
    image: drukala,
    memberName: "Łukasz Drukała",
    role: "Skarbnik",
  },
  {
    image: zmuda,
    memberName: "Kinga Żmuda",
    role: "Członek zarządu",
  },
  {
    image: pautarak,
    memberName: "Anastasiya Pautarak",
    role: "Członek zarządu",
  },
  {
    image: manijak,
    memberName: "Filip Manijak",
    role: "Członek zarządu",
  },
  {
    image: poneta,
    memberName: "Kacper Poneta",
    role: "Członek Zarządu",
  },
];
export const boardMembersWithoutLeaders = [
  {
    image: drukala,
    memberName: "Łukasz Drukała",
    role: "Skarbnik",
  },
  {
    image: zmuda,
    memberName: "Kinga Żmuda",
    role: "Członek zarządu",
  },
  {
    image: pautarak,
    memberName: "Anastasiya Pautarak",
    role: "Członek zarządu",
  },

  {
    image: manijak,
    memberName: "Filip Manijak",
    role: "Członek zarządu",
  },
  {
    image: poneta,
    memberName: "Kacper Poneta",
    role: "Członek Zarządu",
  },
];
