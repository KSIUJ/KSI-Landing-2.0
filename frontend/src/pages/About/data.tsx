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

type management = {
  president?: string;
  vicePresidents?: string;
  boardMembers?: string;
  admins?: string;
  housekeepers?: string;
  auditcomitee?: string;
  plenipotentiaries?: string;
  treasurer?: string;
  librarians?: string;
  secretary?: string;
};
export type Decade = "2020" | "2010" | "2000" | "1990" | "1980" | "1970";
type Entry = { year: string; text: string; management: management };
export const historyContent: Record<Decade, Entry[]> = {
  "2020": [
    {
      year: "2024/2025",
      text: "",
      management: {
        president: "Patryk Rogalski",
        vicePresidents: "Weronika Żygis",
        treasurer: "Tomasz Kulis",
        boardMembers:
          "Karolina Kulas, Aleksander Wiśniewski, Adam Tytoń, Łukasz Drukała",
        admins:
          "Franciszek Stachura, Tomasz Kulis, Łukasz Drukała, Michał Latra, Ignacy Alwasiak, Mikołaj Janusz, Piotr Zieliński",
        housekeepers: "Krzystof Gębka, Filip Jasionowicz",
        auditcomitee: "Franciszek Stachura, Tomasz Miśkowicz, Krzysztof Gębka",
      },
    },
    {
      year: "2023/2024",
      text: "",
      management: {
        president: "Franciszek Stachura",
        vicePresidents: "Patryk Rogalski",
        treasurer: "Konrad Baran",
        boardMembers:
          "Agata Brachmańska, Piotr Berestka, Michał Hoffmann, Tomasz Dądela",
        admins: "Tomasz Kulis, Łukasz Drukała, Michał Latra",
        housekeepers: "Filip Jasionowicz, Krzysztof Gębka",
        auditcomitee: "Filip Szymeczko, Jakub Parapura, Dorian Duda",
      },
    },
    {
      year: "2022/2023",
      text: "",
      management: {
        president: "Filip Szymeczko",
        vicePresidents: "Dominik Duda",
        treasurer: "Paweł Ryś",
        boardMembers:
          "Tomasz Miśkowicz, Agata Brachmańska, Franciszek Stachura",
        admins: "Mikołaj Janusz, Jakub Parapura, Piotr Zieliński",
        housekeepers: "Monika Mikuła, Jakub Parapura",
        auditcomitee: "Daniel Barczyk, Tomasz Dądela, Mikołaj Janusz",
      },
    },

    {
      year: "2021/2022",
      text: "",
      management: {
        president: "Daniel Barczyk",
        vicePresidents: "Wiktor Prządka",
        treasurer: "Paweł Ryś",
        boardMembers: "Paweł Gmerek, Karol Sygiet, Filip Szymeczko",
        admins: "Mikołaj Janusz, Jakub Parapura, Piotr Zieliński",
        housekeepers: "Monika Mikuła",
        auditcomitee: "Mateusz Maćkowski, Adam Pardyl, Łukasz Sereda",
      },
    },
    {
      year: "2020/2021",
      text: "",
      management: {
        president: "Łukasz Sereda",
        vicePresidents: "Daniel Barczyk",
        treasurer: "Mateusz Maćkowski",
        boardMembers: "Adam Pardyl, Katarzyna Płoskonka, Wiktor Prządka",
        admins:
          "Adam Pardyl, Mateusz Maćkowski, Adam Piekarczyk, Michał Piotrowski, Rafał Burczyński, Katarzyna Płoskonka",
        plenipotentiaries: "Daniel Barczyk, Marek Grzelak",
        housekeepers: "Monika Mikuła, Mateusz Olszewski",
        auditcomitee: "Wojciech Sabała, Szymon Smykała, Dominik Wołek",
      },
    },
  ],
  "2010": [
    {
      year: "2019/2020",
      text: "",
      management: {
        president: "Dominik Wołek",
        vicePresidents: "Adam Padryl",
        treasurer: "Łukasz Sereda",
        boardMembers: "Mateusz Maćkowski, Elwira Zimoch",
        admins:
          "Adam Pardyl, Mateusz Maćkowski, Adam Piekarczyk, Michał Piotrowski, Rafał Burczyński, Katarzyna Płoskonka",
        plenipotentiaries: "Daniel Barczyk, Marek Grzelak",
        housekeepers: "Monika Mikuła, Mateusz Olszewski",
        auditcomitee: "Adam Piekarczyk, Wojciech Sabała, Jakub Kiermasz",
      },
    },
    {
      year: "2018/2019",
      text: 'Organizowaliśmy Tech Talk i Estimathon z Jane Street oraz wykład "Czy programista może wyleczyć raka?" z Ardigen. Tradycyjnie już uczestniczyliśmy w Festiwalu Nauki i Sztuki w Krakowie, Małopolskiej Nocy Naukowców oraz Google Hash Code. Współorganizowaliśmy Targi Kariery, warsztaty "Przygotuj się do rekrutacji" z Talent Place i Tech Talk + VR demo z DisplayLink oraz wykład "Jak działa twój mózg" z Kołem Naukowym Neuronus i Naukowym Kołem Robotyki i Sztucznej Inteligencji.',
      management: {
        president: "Adam Piekarczyk",
        vicePresidents: "Adam Pardyl, Wojciech Sabała",
        treasurer: "Szymon Smykała",
        secretary: "Dominik Wołek",
        boardMembers: "Jakub Kiermasz, Mateusz Maćkowski",
        housekeepers: "Mateusz Gwóźdź",
        auditcomitee: "Michał Herda, Dominika Zając",
      },
    },
    {
      year: "2017/2018",
      text: 'Rozpoczęliśmy serię spotkań Ksi Talk! Organizowaliśmy wiele wydarzeń takich jak: Ksi Camp, warsztaty z Intel AI Academy, Solving Real-World Problems z Palantir oraz Git & Release management z firmą GE Digital, wykłady "Od prostej aplikacji do Facebooka" i "Loguj mądrze z Elastic Stackiem" z AVSystem oraz "Jak pisać dobry software w chmurze?" z Relativity. Współorganizowaliśmy Microsoft Tech Talk i tradycyjnie już SFI. Poza równie tradycyjnym uczestnictwem w Dniu Wydziału oraz Dniu Otwartym Uniwersytetu Jagiellońskiego byliśmy na Festiwalu Nauki i Sztuki w Krakowie oraz Targach Kół Naukowych, a także braliśmy udział w Google Hash Code i warsztatach "Expo & React Native" organizowanych przez Software Mansion. Gościliśmy również grupę studentów z Studievereniging Technische Informatica Rotterdam z Holandii.',
      management: {
        president: "Dominika Zając",
        vicePresidents: "Adam Piekarczyk, Wojciech Sabała",
        housekeepers: "Michał Kawiecki, Jakub Kiermasz",
        auditcomitee: "Michał Herda, Krzysztof Hajto",
      },
    },
    {
      year: "2016/2017",
      text: 'Nasi kołowicze zdobywali wiele osiągnięć takich jak: zwycięstwo na Startup Games Sosnowiec przez Adama Orlińskiego, wystąpienie Michała "phoe" Herdy na European Lisp Symposium, czy zdobycie drugiego miejsca przez Michała Zielińskiego na Akademickich Mistrzostwach Polski w Programowaniu Zespołowym. Współpracowaliśmy z wieloma firmami. Uczestniczyliśmy w Google Hash Code, gościliśmy u siebie firmę Palantir. Organizowaliśmy serię wykładów z firmą AVSystem o następujących tematach: "Dojrzała Java", "Szybsze kodzenie w IntelliJ" i "Wielowątkowa apokalipsa C++" oraz "Lenistwo jest cnotą". Tradycyjnie już współorganizowaliśmy SFI oraz uczestniczyliśmy w Dniu Otwartym Uniwersytetu Jagiellońskiego i Dniu Wydziału.',
      management: {
        president: "Dominika Zając",
        vicePresidents: "Adam Piekarczyk, Wojciech Sabała",
        treasurer: "Michał Herda",
        secretary: "Daniel Skowroński",
        housekeepers: "Michał Kurzyński, Tobiasz Porębski",
        auditcomitee: "Piotr Rytko, Tomasz Zub",
      },
    },
    {
      year: "2015/2016",
      text: 'Rok rozpoczynamy od nadania Adamowi Zydroniowi Honorowego Członkostwa oraz odświeżenia pomysłu Informatora Studenta. Ale to dopiero początek! Wciąż angażujemy się we współpracę z firmami zewnętrznymi czego efektem są liczne wykłady i warsztaty (Google Tech Talk, IT Academy Days, Akamai Academy, wykład Asseco i GE Healthcare, wycieczka do labów Motoroli). Powstają również projekty informatyczne - zamek elektroniczny do siedziby Koła, system Elektronicznej Rekrutacji Członków, nowa strona internetowa czy profil na Instagramie. Nie zapominamy przy tym o naszych "stałych" wydarzeniach jak Dzień Wydziału, Małopolska Noc Naukowców, Studencki Festiwal Informatyczny, raj Collegum Physicum czy Festiwal Nauki. Powracamy także do grona organizatorów konferencji "Liczby-komputery-życie". Rozpoczynamy także całkowicie nowe przedsięwzięcia takie jak organizacja Huba (jednego z 3 w Polsce!) Google Hash Code, MikroSFI, warsztaty z umiejętności miękkich "Teamwork FTW", podstaw Unity czy Juwenaliowy Grill Wydziałowy. Aktywnie angażujemy się także w tworzenie filmu promocyjnego wydziału. W ramach rocznicowych obchodów rozdajemy nowe koszulki kołowe, naklejki na laptopy, a także kredki i kubki z naszym logo. Dzięki zaangażowaniu Michała Herdy możemy grać w KSIrciankę - całkowicie opartą na postaciach i wydarzeniach z naszego Koła. Tworzymy nową stronę internetową przedmiotu projekt zespołowy, a także rozdajemy weściówki na konferencję Confidence. Aby w tym wszystkim nie umrzeć z gorąca kupujemy wiatraki do naszej serwerowni.',
      management: {
        president: "Piotr Maliszewski",
        vicePresidents: "Adam Piekarczyk, Dominika Zając",
        treasurer: "Tomasz Zub",
        secretary: "Daniel Skowroński",
        housekeepers: "Patrycja Brzeska, Michał Kurzyński",
        auditcomitee: " Szymon Borak, Piotr Rytko",
      },
    },
    {
      year: "2014/2015",
      text: "Dlaczego mamy się ograniczać do dwóch wymiarów - wydrukujmy to w trójwymiarze! Ten cel przyświeca nam gdy w pocie czoła budujemy własną drukarkę 3D. Nie zapominamy również o naszych tradycyjnych już wydarzeniach - Festiwalu Nauki, Studenckim Festiwalu Informatycznym, IT Academic Days, Współorganizujemy również całkiem nowe wydarzenia na naszym Wydziale - Google tech Talk oraz skierowane do uczniów szkół ponadgimnazjalych Junior IT Academic Day. Nie może zabraknąć również elementu integracyjnego w postaci Herbatki u KSI.",
      management: {
        president: "Piotr Maliszewski",
        vicePresidents: "Arkadiusz Czekajski, Tomasz Zub",
        treasurer: "Krzysztof Hajto",
        secretary: "Wit Szoniec",
        housekeepers: "Patrycja Brzeska",
        auditcomitee: "Szymon Borak, Piotr Rytko",
      },
    },
    {
      year: "2013/2014",
      text: "Do prężnie działającego grona wydarzeń organizowanych i współorganizowanych przez KSI dochodzą warsztaty PHP we wsółpracy z Codete. Nie zapominamy również o naszych stałych pozycjach w kalendarzu - Dniu Wydziału, Festiwalu Nauki, IT Academic Days, Studenckim Festiwalu Informatycznym, Małopolskiej Nocy Naukowców oraz Facebook Tech Talk.",
      management: {
        president: "Arkadiusz Czekajski",
        vicePresidents: "Matheus Czogalla, Piotr Maliszewski",
        treasurer: "Krzysztof Hajto",
        secretary: "Michalina Hansdorfer",
        housekeepers: "Wit Szoniec",
        auditcomitee: "Szymon Borak, Piotr Rytko",
      },
    },
    {
      year: "2012/2013",
      text: "Przyjemności przyjemnościami ale studia też ktoś zdać musi - właśnie temu wyzwaniu służy nowo powstała Sekcja Zajęć Wspomagających oraz sekcje Systemów Wbudowanych i Androida. Nie zapominamy jednak przy tym o promowaniu IT i Wydziału między innymi w czasie IT Academic Days, Studenckiego Festiwalu Informatycznego, Dnia Wydziału, Dnia Otwartego UJ, konferencji Liczby-komputery-życie, Małopolskiej Nocy Naukowców. Współpracujemy z największymi firmami branży tworząc m.in. warsztaty z firmą Sii czy Facebook Tech Talk. Nie zapominamy w tym wszystkim również o przyjemnościach dla ducha takich jak żagle czy wspólne wyjście do kina (obowiązkowo w kołowych koszulkach).",
      management: {
        president: "Krzysztof Kotlarek",
        vicePresidents: "Gabriel Fortin, Adam Zydroń",
        treasurer: "Krzysztof Hajto",
        secretary: "Arkadiusz Czekajski",
        housekeepers: "Szymon Borak",
        auditcomitee: "Piotr Rytko, Michał Wszołek",
      },
    },
    {
      year: "2011/2012",
      text: 'Kolejna edycja Studenckiego Festiwalu Naukowego, współorganizowana z Instytutem Psychologii UJ konferencja "Człowiek zalogowany", Festiwal Nauki, Rajd Collegium Physicum, Dzień Wydziału, Małopolska Noc Naukowców, wsparcie Koła Naukowego Robotyki "Robotics" - kto inny mógłby złapać mocnej zadyszki ) My jednak raczymy się tylko zimną colą (z nowo zakupionej lodówki) i działamy w sekcjach .NET i Android, organizujemy warsztaty z Ruby on Rails i jQuery oraz dbamy o integrację naszych KSIowiczów pamiętając o planszówkach, wigilii wydziałowej, żaglach, oglądaniu filmów oraz zajadaniu pizzy.',
      management: {
        president: "Szymon Borak",
        vicePresidents: "Arkadiusz Czekajski, Michał Wszołek",
        treasurer: "Albert Łącki",
        secretary: "Michalina Hansdorfer",
        housekeepers: "Martyna Wilk",
        auditcomitee: "Gabriel Fortin, Adam Zydroń",
      },
    },
    {
      year: "2010/2011",
      text: 'W Polsce już nas znają - kolej na cały świat. Oficjalnie przyjmujemy anglojęzyczną wersję nazwy naszego koła, a także logotyp naszej organizacji. Nie zwalniamy też tempa przy organizacji różnego rodzaju wydarzeń - do wcześniej już organizowanego Studenckiego Festiwalu Informatycznego dołączają IT Academic Days oraz organizowana razem z Kołem Matematyków Studentów oraz Naukowym Kołem Studentów Biotechnologii "Mygen" konferencja "Liczby-komputery-życie". Nie zapominamy również o integracji (Majówka, wielkie bożonarodzeniowe oglądanie filmów, Informatyka pod Żaglami, SKI KSI w Małastowie), ani o najmłodszych studentach, dla których razem z Wydziałową Radą Samorządu Studentów przygotowujemy i wydajemy Informator.',
      management: {
        president: "Michał Wszołek",
        vicePresidents: "Kamil Kraszewski, Albert Łącki",
        treasurer: "Alan Klimowski",
        secretary: "Szymon Borak",
        housekeepers: "Michalina Hansdorfer",
        auditcomitee: "Maria Chmaj, Karol Kosiński",
      },
    },
  ],
  "2000": [
    {
      year: "2009/2010",
      text: "ubimy pokazywać informatykę i nasz Wydział z jak najlepszej strony - i robimy to dobrze! Rok akademicki 2009/2010 potwierdza to wieloma udanymi wydarzeniami Studenckim Festiwalem Informatycznym, Festiwalem Nauki, Małopolską Nocą Naukowców, Dniem otwartym Wydziału. W czasie wakacji łączymy miłe z pożytecznym w czasie wyjazdu naukowo-integracyjnego 'Informatyka pod Żaglami'. Doceniamy również tych, którzy najmocniej angażują się w działalność KSI - Dorota Sadza długoletnia Zastępczyni Prezesa KSI oraz opiekun Koła - dr hab. inż. Marek Skomorowski otrzymują Honorowe Członkostwo.",
      management: {
        president: "Maria Chmaj",
        vicePresidents: "Paulina Gajda, Kamil Kraszewski",
        treasurer: "Kamil Bartocha",
        secretary: "Aleksandra Bieńkowska",
        housekeepers: "Karol Kosiński",
        auditcomitee: "Piotr Bzdęga, Marek Maśko",
      },
    },
    {
      year: "2008/2009",
      text: "Nasza siedziba staje otworem przed każdym z kołowiczów!",
      management: {
        president: "Maria Chmaj",
        vicePresidents: "Dorota Sadza",
        treasurer: "Kamil Bartocha",
        secretary: "Aleksandra Bieńkowska",
        librarians: "Karol Kosiński",
        auditcomitee: "Tomasz Paczkowski, Marek Maśko",
      },
    },
    {
      year: "2007/2008",
      text: "A najcenniejsze skarby lądują w sejfie.",
      management: {
        president: "Anna Jaworska",
        vicePresidents: "Dorota Sadza",
        treasurer: "Łukasz Kaczara",
        secretary: "Paweł Jaworski",
        librarians: "Karol Kosiński",
        auditcomitee: "Dariusz Jaros, Jarosław Zając",
      },
    },
    {
      year: "2006/2007",
      text: "W naszej biblioteczce pojawiają się Grębosz, Cormen i Opiala. Każdy kołowicz otrzymuje ksiową koszulkę.",
      management: {
        president: "Anna Milcarz",
        vicePresidents: "Dorota Sadza",
        treasurer: "Tomasz Jurkiewicz",
        secretary: "Dariusz Jaros",
        librarians: "Tomasz Mikołajowski",
        auditcomitee: "Paweł Jaworski, Łukasz Kaczara",
      },
    },
    {
      year: "2005/2006",
      text: "",
      management: {
        president: "Jarosław Zając",
        vicePresidents: "Łukasz Kaczara, Paweł Jaworski",
        treasurer: "Tomasz Jurkiewicz",
        secretary: "Michał Grudzień",
        librarians: "Dariusz Jaros",
        auditcomitee: "Tomasz Mikołajewski, Anna Milcarz",
      },
    },
    {
      year: "2004/2005",
      text: "Razem z kołami z UEKu, AGH i PK organizujemy pierwszą edycję Studenckiego Festiwalu Informatycznego",
      management: {
        president: "Jarosław Zając",
        vicePresidents: "Anna Maczuga",
        treasurer: "Piotr Krukowiecki",
        secretary: "Michał Grudzień",
        librarians: "Bartłomiej Siwek",
        auditcomitee: "Renata Szymonek, Michał Masiarek",
      },
    },
    {
      year: "2003/2004",
      text: "",
      management: {
        president: "Piotr Długoń-Ryba",
        vicePresidents: "Jarosław Zając",
        treasurer: "Jolanta Momot",
        secretary: "Maciej Słomczyński",
        librarians: "Julian Ludwikowski",
        auditcomitee: "Michał Oczak, Piotr Krukowiecki",
      },
    },
    {
      year: "2002/2003",
      text: "",
      management: {
        president: "Piotr Długoń-Ryba",
        vicePresidents: "Jarosław Zając",
        treasurer: "Marta Mierzejewska",
        secretary: "Maciej Słomczyński",
        librarians: "Julian Ludwikowski",
        auditcomitee: "Renata Szymonek, Piotr Krukowiecki",
      },
    },
    {
      year: "2001/2002",
      text: "W naszym kole pojawia się nowa drukarka atramentowa :)",
      management: {
        president: "Piotr Długoń-Ryba",
        vicePresidents: "Jarosław Zając",
        treasurer: "Marta Mierzejewska",
        secretary: "Maciej Słomczyński",
        librarians: "Julian Ludwikowski",
        auditcomitee: "Renata Szymonek, Jolanta Mamot ",
      },
    },
    {
      year: "2000/2001",
      text: "",
      management: {
        president: "Anna Maczuga",
        vicePresidents: "Adam Strzelecki",
        treasurer: "MArta Mierzejewska",
        secretary: "Przemysław Tarczyński",
        librarians: "Julian Ludwikowski",
        auditcomitee: "Leszek Pieniążek, Zbigniew Szydłowski",
      },
    },
  ],
  "1990": [
    {
      year: "1999/2000",
      text: "Koncentrujemy się na działalności naukowej - organizujemy Sesje naukową, Szkołę Zimową, warsztaty z Javy, a także bierzemy udział w konferencji CeBIT. Kupujemy komputer - serwer pingu.ii.uj.edu.pl",
      management: {
        president: "Adam Strzelecki",
        vicePresidents: "Przemysław Tarczyński",
        treasurer: "Rafał Zadbyr",
        secretary: "Robert Luberda",
        auditcomitee: " Leszek Pieniążek, Zbigniew Szydłowski",
      },
    },
    {
      year: "1998/1990",
      text: "",
      management: {
        president: "Matek Stasielak",
        vicePresidents: "Marcin Danielak",
        treasurer: "Rafał Zadbyr",
        secretary: "Krzysztof Pilśniak",
        auditcomitee: "Leszek Pieniążek, Zbigniew Szydłowski",
      },
    },
    {
      year: "1996/1997",
      text: "Wyjazd przedstawicieli Koła Studentow Informatyki na INFO Festiwal 96’.",
      management: {
        president: "Łukasz Hankus",
        vicePresidents: "Marcin Danielak",
        treasurer: "Tomasz Rawski",
        secretary: "Artur Stawiarski",
        auditcomitee: "Leszek Pieniążek, Piotr Szular",
      },
    },
    {
      year: "1995/1996",
      text: "Opiekunem koła zostaje dr hab. Marek Zaionc",
      management: {
        president: "Artur Stawiarski",
      },
    },
  ],
  "1980": [
    {
      year: "1987/1988",
      text: "Ponowna rejestracja NKI",
      management: {
        president: "Małgorzata Niedbała",
        vicePresidents: "Beata Michalska",
        treasurer: "Jacek Połczyński",
        secretary: "Rafał Kawa",
        librarians: "Tomasz Kunicki",
        auditcomitee: "Józef Gajda, Andrzej Knapczyk, Jacek Królik",
      },
    },
    {
      year: "1984/1985",
      text: "Po raz pierwszy odbywa się Herbatka z NKI. Rok żegnamy we wspaniałej atmosferze na spotkaniu przedsylwestrowym Udział w Infosemie, Marek Kubowicz zdobywa zaszczytne 2. miejsce na Ogólnopolskim Seminarium Rady Kół Naukowych Informatyki Infosem w sekcji Oprogramowanie i grafika - zostaje również okrzyknięty najlepszym mówcą konferencji. Szkoła letnia, seminarium wyjazdowe w Rabce, sylwester kołowy, szkoła zimowa.",
      management: {
        president: "Bogusław Hutniczak",
        vicePresidents: "Anotni Topolski",
        treasurer: "Aleksander Piwkowski",
        secretary: "Małgorzata Niedbała",
        librarians: "Wojciech Winiarski",
        auditcomitee: "Marek Kubowicz, Józef Gajda",
      },
    },
    {
      year: "1983/1984",
      text: "Utworzenie sekcji SM, Riad i Odry, kurs obsługi MOPu. Udział w INFOSEMie oraz Wiosennej Radzie Koordynacyjnej Naukowych Kół Informatyki, Ogólnopolskiej Szkole Letniej Informatyki. Organizujemy też Konferencję Środowiskową Użytkowników Minikomputera Mera-400 oraz seminarium wyjazdowe w Rabce",
      management: {
        president: "Paweł Jurczak",
        vicePresidents: "Bogusław Hutniczak",
        treasurer: "Wojciech Winiarski",
        secretary: "Małgorzata Niedbała",
        librarians: "Marta Kwiatkowska, Leszek Śmigielski",
        housekeepers: "Marek Kubowicz",
        auditcomitee: "Wojciech Burczyk, Józef Gajda, Aleksander Piwkowski",
      },
    },
    {
      year: "1982/1983",
      text: "Rok upływa nam pod znakiem realizacji systemu operacyjnego MINOS. Formuje się też kołowa biblioteczka.",
      management: {
        president: "Marek Kubowicz",
        vicePresidents: "Grzegorz Kuś",
        treasurer: "Wojciech Winiarski",
        auditcomitee: "Wojciech Burczyk, Józef Gajda, Kazmierz Jojczyk",
      },
    },
    {
      year: "1981/1982",
      text: "",
      management: {
        president: "Marek Kubowicz",
        vicePresidents: "Wojciech Winiarski",
        treasurer: "Józef Gajfda",
      },
    },
    {
      year: "1980/1981",
      text: "W dalszym ciągu koncentrujemy się na nauce - rok upływa nam na licznych seminariach, referatach, szkoleniach.",
      management: {
        president: "Krzysztof Buszko",
        vicePresidents: "Janusz Wnęk",
      },
    },
  ],
  "1970": [
    {
      year: "1979/1980",
      text: "Cykl referatów MERA, zapoznawanie się z systemami George i Odra, współpraca z ośrodkiem w Biprostalu, Kołowy Sylwester, szkoła letnia, szkoła wiosenna, szkoleie ucnziów V LO, nauka FORTRANu referaty i seminaria - ten rok stanowczo jest pracowity",
      management: {
        president: "Jacek Nowak",
        vicePresidents: "Barbara Janicka, Zbigniew Kędzioła",
        treasurer: "Jerzy Kubski",
        secretary: "Lucyna Krupa",
        librarians: "Marta Kwiatkowska, Leszek Śmigielski",
        auditcomitee: "Lech Wolanin, Janusz Szczypuła, A. Zbrzezny",
      },
    },
    {
      year: "1978/1979",
      text: "",
      management: {
        president: "Tadeusz Kędzierski",
        treasurer: "Jacek Nowak",
        auditcomitee: "Janusz Szczypuła",
      },
    },
    {
      year: "1977/1978",
      text: "Mimo młodego wieku nasze Koło działa niezwykle aktywnie - organizuje cykl szkoleń związanych z oprogramowaniem podstawowym maszyn cyfrowych, cykl referatów dla studentów fizyki dotyczących podstaw UPDATE. Powstaje również sekcja STAT - zajmująca się maszynową dokumentacją Koła. W tym roku po raz pierwszy odbyła się jesienna sesja wyjazdowa Koła. Nie zapominamy też o działalności naukowej - warsztatach, szkoleniach i wykładach (w szkole wiosennej koła udział bierze ponad 30 osób, a w Przedszkolu NKI - ponad 50). Nawiązujemy współpracę z Kołami Naukowymi Informatyki Politechniki Poznańskiej, Uniwersytetu Gdańskiego, Uniwersytetu Toruńskiego, Uniwersytetu Wrocławskiego oraz Uniwersytetu Warszawskiego",
      management: {
        president: "Tadeusz Kędzierski",
        vicePresidents: " Barbara Janicka, Marta Kwiatkowska",
        treasurer: "Jacek Nowak",
        secretary: "Lucyna Krupa",
        librarians: "Leszek Śmigielski, Jan Piechowicz",
        auditcomitee: "Andrzej Bieszczad, Janusz Szczypuła",
      },
    },
    {
      year: "1976/1977",
      text: "Decyzją Rady Uczelnianej Uniwersytetu Jagiellońskiego Sekcja Informatyki zostaje podniesiona do rangi Koła Naukowego. Bierzemy też udział w konferencji INFOSEM.",
      management: {
        president: "Kazimierz Jojczyk",
      },
    },
    {
      year: "1975/1976 ",
      text: 'Referat "Struktury listowe danych" Kazimierza Jojczyka (kierownika sekcji Informatyki w KMS) zdobywa 2. miejsce na Ogólnopolskim Seminarium Kół Naukowych Informatyki INFOSEM.',
      management: {},
    },
    {
      year: "1973/1974",
      text: "W Kole Matematyków Studentów im. prof. S. Zaremby powstaje Sekcja Informatyki",
      management: {},
    },
  ],
};
