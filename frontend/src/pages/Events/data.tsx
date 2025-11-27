export type EventType = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  featured?: boolean;
  externalLink?: {
    href: string;
    text: string;
  };
};

export const SFI_EVENT: EventType = {
  id: "sfi",
  title: "SFI Academic IT Festival",
  description:
    "Międzynarodowa konferencja informatyczna organizowana przez studentów, dla studentów. Od 2005 r. wraz z kołami naukowymi z 3 innych krakowskich uczelni co rok zapraszamy prelegentów z całego świata, na liście których znalazły się nazwiska takie jak Andrew S. Tanenbaum, Thomas Cormen, Larry Wall, Richard Stallman czy Kevin Warwick. Podczas trzech dni konferencji odbywa się kilkadziesiąt wykładów i warsztatów, które przyciąga kilka tysięcy uczestników rocznie. Biletem wstępu są jedynie pasja i odrobina chęci oraz zainteresowania tematem.",
  imageUrl: "images/events/sfi_znak_WEBSAFE_RGB.png",
  featured: true,
  externalLink: {
    href: "https://sfi.pl/",
    text: "Strona SFI",
  },
};

export const KSIN_EVENT: EventType = {
  id: "ksin",
  title: "KSI^n",
  description:
    "KSI^n to coroczna konferencja naukowa na której każdy uczestnik wygłasza krótki referat na dowolny temat związany z informatyką. Jest to świetny sposób na poszerzenie swojej wiedzy na temat IT oraz, oczywiście, integrację między Członkami Koła. Wyjazd jest organizowany w maju.",
  imageUrl: "images/events/ksin.jpg",
  featured: true,
};

export const FEATURED_EVENTS = [SFI_EVENT, KSIN_EVENT];

export const COMPANY_EVENTS: EventType[] = [
  {
    id: "google",
    title: "Google",
    description: "Warsztaty z inżynierii danych 'From data points to decisions' prowadzone przez ekspertów z Google.",
    imageUrl: "images/events/google2025.jpg",
  },
  {
    id: "jane-street",
    title: "Jane Street",
    description: "Cykl spotkań 'Estimathon', które testują umiejętności analityczne, organizowany wspólnie z firmą Jane Street.",
    imageUrl: "images/events/estimathon.jpg",
  },
  {
    id: "allegro",
    title: "Allegro",
    description: "Spotkanie z ekspertami Allegro Tech poświęcone rozwiązaniom 'Retrieval at Scale' w praktyce.",
    imageUrl: "images/events/allegro.jpg",
  },
  {
    id: "microsoft",
    title: "Microsoft",
    description: "Microsoft Tech Talk, czyli spotkanie z cyklu 'When code meets the real world' o praktycznych aspektach kodowania.",
    imageUrl: "images/events/microsoft.jpg",
  },
  {
    id: "ge",
    title: "General Electric",
    description: "Warsztaty z General Electric skupiające się na dobrych praktykach Git i procesach 'Release Management'.",
    imageUrl: "images/events/ge.jpg",
  },
  {
    id: "meta",
    title: "Meta",
    description: "Wykład we współpracy z Meta (Facebook) na temat praktycznego zastosowania uczenia maszynowego.",
    imageUrl: "images/events/facebook.jpg",
  },
];

// --- POZOSTAŁE INICJATYWY ---
export const OTHER_EVENTS: EventType[] = [
  {
    id: "ksicamp",
    title: "ksiCamp",
    description:
      "Specjalnie dla studentów pierwszego roku KSI organizuje cykl weekendowych warsztatów wprowadzających do programowania, środowiska programisty i pracy w zespole. Udział w ksiCampie zapewnia gładkie wejście w studia informatyczne oraz pozwala przećwiczyć zdobytą na zajęciach wiedzę do rozwiązywania praktycznych problemów.",
    imageUrl: "images/events/aboutKsi1.jpg",
  },
  {
    id: "ksitalk",
    title: "ksiTalk",
    description:
      "ksiTalk to seminarium studenckie Koła Studentów Informatyki UJ. Cykliczne spotkania Koła mają na celu dzielenie się wiedzą, poszerzanie horyzontów w dziedzinie informatyki oraz ćwiczenie umiejętności retorycznych. Na każdym spotkaniu odbywa się wykład zaproszonego pracownika naukowego, co pozwala studentom nawiązać bliższy kontakt z nauką i potencjalnie rozpocząć współpracę.",
    imageUrl: "images/events/ksitalk.jpg",
  },
  {
    id: "ksilearn",
    title: "KSILearn",
    description:
      "KSILearn to cotygodniowe spotkania członków Koła mające na celu dzielenie się wiedzą i poszerzanie horyzontów. Do tej pory zrealizowaliśmy kursy o tematach takich jak 'Structure and Interpretation of Computer Programs', 'Cracking the Coding Interview' czy programowanie w języku Python dla początkujących.",
    imageUrl: "images/events/ksicamp.jpg",
  },
  {
    id: "workshops",
    title: "Warsztaty tematyczne",
    description:
      "Regularnie organizujemy warsztaty pozwalające rozwijać praktyczne umiejętności. Dotychczasowe edycje obejmowały m.in. programowanie gier VR, podstawy elektroniki, projektowanie grafiki czy tworzenie profesjonalnego CV.",
    imageUrl: "images/events/VR_workshops.jpg",
  },
  {
    id: "ksigrill",
    title: "KSIgrill",
    description: "Integracja jest dla nas kluczowa, dlatego regularnie organizujemy wydarzenia takie jak wiosenny KSIgrill. To doskonała okazja do budowania relacji w luźnej, nieformalnej atmosferze poza murami uczelni.",
    imageUrl: "images/events/ksigrill1.jpg",
  },
  {
    id: "ksiholidays",
    title: "KSIWigilia",
    description: "KSIWigilia to nasze tradycyjne, świąteczne spotkanie, które integruje członków i przyjaciół Koła. To wyjątkowy czas na podsumowanie roku, wspólne rozmowy i cieszenie się magiczną atmosferą w akademickim gronie.",
    imageUrl: "images/events/ksiholidays2.jpg",
  },
];