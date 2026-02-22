import { type Action, type Page } from "./AdminDashboard";
type Endpoint = "board" | "vip" | "projects" | "news";
export const labelEndpoint: Record<Page, Endpoint> = {
  "About VIP": "vip",
  "About Board": "board",
  Projects: "projects",
  News: "news",
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
};

export type ServerContentResponse = {
  path: string;
  name: string;
  is_dir: boolean;
}