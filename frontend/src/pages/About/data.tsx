import DotList from "../../components/DotList";
export const structureItems = [
  "Walne zebranie członków – gdzie każdy z członków Koła ma prawo głosu nad najważniejszymi decyzjami dla KSI,",
  "Zarząd – wykonawcze ramię KSI,",
  "Komisja rewizyjna – kontroluje działanie organizacji.",
];

export const infoSections = [
  {
    header: "O KSI",
    paragraph:
      "Od 1976 roku Koło Studentów Informatyki zrzesza studentów zainteresowanych rozwojem swojej wiedzy i umiejętności z zakresu  szeroko pojętej informatyki na jednym z najstarszych i najlepszych uniwersytetów w Europie.",
  },
  {
    header: "Struktura Organizacji",
    paragraph:
      'KSI jest organizacją "dla studentów, przez studentów" i jest zarządzana w ten sam sposób. Organami kierującymi KSI są:',
    customContent: <DotList items={structureItems} />,
  },
  {
    header: "Zarząd",
    paragraph:
      "Wybierany przez Walne Zgromadzenie członków Koła na roczną kadencję reprezentuje Koło oraz kieruje jego rozwojem.",
  },
];

export const auditCommittee = [
  "Franciszek Stachura",
  "Tomasz Miśkowicz",
  "Krzysztof Gębka",
];
export const admins = [
  "Franciszek Stachura",
  "Tomasz Kulis",
  "Łukasz Drukała",
  "Michał Latra",
  "Ignacy Alwasiak",
  "Mikołaj Janusz",
  "Piotr Zieliński",
];

export const houseKeepers = ["Filip Jasionowicz", "Krzysztof Gębka"];

export const honoraryMembers = [
  "Piotr Zieliński",
  "Franciszek Stachura",
  "Filip Szymeczko",
  "Paweł Ryś",
  "Mateusz Maćkowski",
  "Adam Pardyl",
  "Kamil Drobniak",
  "Michał Herda",
  "Piotr Maliszewski",
  "Adam Piekarczyk",
  "Wojciech Sabała",
  "Dorota Sadza",
  "Dominik Wołek",
  "Dominika Zając",
  "Adam Zydroń",
  "prof. dr hab. inż. Marek Skomorowski",
];

export const infoAboutKsiPeople = [
  {
    header: "Opiekun Naukowy Koła",
    text: "Dr hab. Adam Roman, prof. UJ jest opiekunem naukowym naszego Koła.",
  },
  {
    header: "Administratorzy",
    text: admins.join(", "),
  },
  {
    header: "Gospodarze",
    text: houseKeepers.join(", "),
  },
  {
    header: "Komisja Rewizyjna",
    text: auditCommittee.join(", "),
  },
  {
    header: "Członkowie Honorowi",
    text: honoraryMembers.join(", "),
  },
];
