import { type Action, type Page } from "./AdminDashboard";
type Endpoint = "board" | "vip" | "projects" | "news" | "ksi-editions" | "ksi-talks";
export const labelEndpoint: Record<Page, Endpoint> = {
  "About VIP": "vip",
  "About Board": "board",
  Projects: "projects",
  News: "news",
  "KSI Editions": "ksi-editions",
  "KSI Talks": "ksi-talks",
};
const STATUS = ["ongoing", "completed", "archived"];
const ROLES_VIP = ["honorary", "housekeeper", "admin", "audit", "supervisor"];
const ROLES_BOARD = ["president", "vicepresident", "treasurer", "member"];
type ProjectStatusType = (typeof STATUS)[number];
type RoleBoardType = (typeof ROLES_BOARD)[number];
type RoleVipType = (typeof ROLES_VIP)[number];

export type FieldType = {
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  imageURL?: string;
  options?: string[];
  textarea?: boolean;
};
export type UserData = {
  id?: number | string;
  name?: string;
  role_title?: RoleBoardType | RoleVipType;
  image_url?: string;
  status?: ProjectStatusType;
  link?: string;
  description?: string;
  event_date?: string;
  event_start_time?: string;
  location?: string;
  title?: string;
  edition_number?: string;
  year?: string;
  author?: string;
  university?: string;
  abstract?: string;
  paper_url?: string;
  edition_id?: string;
};

const FIELD_TITLE: FieldType = {
  name: "title",
  type: "text",
  required: true,
  placeholder: "Title",
};
const FIELD_ID: FieldType = {
  name: "id",
  type: "text",
  required: true,
  placeholder: "ID",
};

const FIELD_NAME: FieldType = {
  name: "name",
  type: "text",
  required: true,
  placeholder: "Name",
};

const FIELD_IMAGE_URL: FieldType = {
  name: "image_url",
  type: "text",
  placeholder: "image URL",
  required: false,
};

const FIELD_BOARD_ROLE: FieldType = {
  name: "role_title",
  type: "select",
  options: ROLES_BOARD,
  required: true,
};
const FIELD_VIP_ROLE: FieldType = {
  name: "role_title",
  type: "select",
  options: ROLES_VIP,
  required: true,
};
const FIELD_DESCRIPTION: FieldType = {
  name: "description",
  placeholder: "Description",
  textarea: true,
};
const FIELD_PROJECT_STATUS: FieldType = {
  name: "status",
  type: "select",
  options: STATUS,
  required: true,
};
const FIELD_LINK: FieldType = {
  name: "link",
  type: "text",
  placeholder: "Link to Github (optional)",
  required: false,
};
const FIELD_LOCATION: FieldType = {
  name: "location",
  type: "text",
  placeholder: "Location",
  required: false,
};
const FIELD_DATE: FieldType = {
  name: "event_date",
  type: "date",
  required: false,
};
const FIELD_START_TIME: FieldType = {
  name: "event_start_time",
  type: "time",
  required: false,
  placeholder: "Start time",
};

const FIELD_EDITION_NUMBER: FieldType = {
  name: "edition_number",
  type: "number",
  required: true,
  placeholder: "Edition number (e.g. 6)",
};
const FIELD_YEAR: FieldType = {
  name: "year",
  type: "number",
  required: true,
  placeholder: "Year (e.g. 2025)",
};
const FIELD_AUTHOR: FieldType = {
  name: "author",
  type: "text",
  required: true,
  placeholder: "Author",
};
const FIELD_UNIVERSITY: FieldType = {
  name: "university",
  type: "text",
  required: false,
  placeholder: "University (optional)",
};
const FIELD_ABSTRACT: FieldType = {
  name: "abstract",
  placeholder: "Abstract (optional)",
  textarea: true,
};
const FIELD_PAPER_URL: FieldType = {
  name: "paper_url",
  type: "text",
  required: false,
  placeholder: "Paper URL (optional)",
};
const FIELD_EDITION_ID: FieldType = {
  name: "edition_id",
  type: "number",
  required: true,
  placeholder: "Edition ID",
};

type Scene = {
  steps: string[];
  fieldsByStep?: { [key: string]: FieldType[] };
};
export const SCENES: Record<Page, Partial<Record<Action, Scene>>> = {
  News: {
    create: {
      steps: ["form"],
      fieldsByStep: {
        form: [
          FIELD_TITLE,
          FIELD_DESCRIPTION,
          FIELD_IMAGE_URL,
          FIELD_DATE,
          FIELD_START_TIME,
          FIELD_LOCATION,
        ],
      },
    },
    update: {
      steps: ["idInput", "form"],
      fieldsByStep: {
        idInput: [FIELD_ID],
        form: [
          FIELD_TITLE,
          FIELD_DESCRIPTION,
          FIELD_DATE,
          FIELD_START_TIME,
          FIELD_LOCATION,
          FIELD_IMAGE_URL,
        ],
      },
    },

    delete: {
      steps: ["idInput"],
      fieldsByStep: {
        idInput: [FIELD_ID],
      },
    },
    readAll: {
      steps: ["list"],
    },
    readByID: {
      steps: ["idInput", "detail"],
      fieldsByStep: {
        idInput: [FIELD_ID],
      },
    },
  },
  Projects: {
    create: {
      steps: ["form"],
      fieldsByStep: {
        form: [
          FIELD_NAME,
          FIELD_DESCRIPTION,
          FIELD_PROJECT_STATUS,
          FIELD_IMAGE_URL,
          FIELD_LINK,
        ],
      },
    },
    update: {
      steps: ["idInput", "form"],
      fieldsByStep: {
        idInput: [FIELD_ID],
        form: [
          FIELD_NAME,
          FIELD_DESCRIPTION,
          FIELD_PROJECT_STATUS,
          FIELD_IMAGE_URL,
          FIELD_LINK,
        ],
      },
    },
    delete: {
      steps: ["idInput"],
      fieldsByStep: { idInput: [FIELD_ID] },
    },
    readAll: {
      steps: ["list"],
    },
    readByID: {
      steps: ["idInput", "detail"],
      fieldsByStep: { idInput: [FIELD_ID] },
    },
  },
  "About Board": {
    create: {
      steps: ["form"],
      fieldsByStep: {
        form: [FIELD_NAME, FIELD_BOARD_ROLE, FIELD_IMAGE_URL],
      },
    },
    update: {
      steps: ["idInput", "form"],
      fieldsByStep: {
        idInput: [FIELD_ID],
        form: [FIELD_NAME, FIELD_BOARD_ROLE, FIELD_IMAGE_URL],
      },
    },
    delete: {
      steps: ["idInput"],
      fieldsByStep: {
        idInput: [FIELD_ID],
      },
    },
    readAll: {
      steps: ["list"],
    },
    readByID: {
      steps: ["idInput", "detail"],
      fieldsByStep: {
        idInput: [FIELD_ID],
      },
    },
  },
  "About VIP": {
    create: {
      steps: ["form"],
      fieldsByStep: {
        form: [FIELD_NAME, FIELD_VIP_ROLE],
      },
    },
    update: {
      steps: ["idInput", "form"],
      fieldsByStep: {
        idInput: [FIELD_ID],
        form: [FIELD_NAME, FIELD_VIP_ROLE],
      },
    },
    delete: {
      steps: ["idInput"],
      fieldsByStep: {
        idInput: [FIELD_ID],
      },
    },
    readAll: {
      steps: ["list"],
    },
    readByID: {
      steps: ["idInput"],
      fieldsByStep: {
        idInput: [FIELD_ID],
      },
    },
  },
  "KSI Editions": {
    create: {
      steps: ["form"],
      fieldsByStep: {
        form: [FIELD_EDITION_NUMBER, FIELD_YEAR, FIELD_TITLE, FIELD_IMAGE_URL],
      },
    },
    update: {
      steps: ["idInput", "form"],
      fieldsByStep: {
        idInput: [FIELD_ID],
        form: [FIELD_EDITION_NUMBER, FIELD_YEAR, FIELD_TITLE, FIELD_IMAGE_URL],
      },
    },
    delete: {
      steps: ["idInput"],
      fieldsByStep: { idInput: [FIELD_ID] },
    },
    readAll: {
      steps: ["list"],
    },
    readByID: {
      steps: ["idInput", "detail"],
      fieldsByStep: { idInput: [FIELD_ID] },
    },
  },
  "KSI Talks": {
    create: {
      steps: ["form"],
      fieldsByStep: {
        form: [FIELD_EDITION_ID, FIELD_AUTHOR, FIELD_UNIVERSITY, FIELD_TITLE, FIELD_ABSTRACT, FIELD_PAPER_URL],
      },
    },
    update: {
      steps: ["idInput", "form"],
      fieldsByStep: {
        idInput: [FIELD_ID],
        form: [FIELD_EDITION_ID, FIELD_AUTHOR, FIELD_UNIVERSITY, FIELD_TITLE, FIELD_ABSTRACT, FIELD_PAPER_URL],
      },
    },
    delete: {
      steps: ["idInput"],
      fieldsByStep: { idInput: [FIELD_ID] },
    },
    readAll: {
      steps: ["list"],
    },
    readByID: {
      steps: ["idInput", "detail"],
      fieldsByStep: { idInput: [FIELD_ID] },
    },
  },
};

export type ServerContentResponse = {
  path: string;
  name: string;
  is_dir: boolean;
}