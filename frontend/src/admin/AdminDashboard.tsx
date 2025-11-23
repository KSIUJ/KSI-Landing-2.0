import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SceneRenderer from "./SceneRenderer";

import { btnStyles, selectStyles, inputStyles } from "./Styles";
const ACTIONS = ["delete", "create", "update", "readAll", "readByID"];
export type Action = (typeof ACTIONS)[number];
const PAGES = ["About Board", "About VIP", "Projects", "News"];
export type Page = (typeof PAGES)[number];
const actionLabel: Record<Action, string> = {
  delete: "Delete",
  create: "Create",
  update: "Update",
  readAll: "Read All",
  readByID: "Read by ID",
};

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/admin");
  };
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);

  const handleSelectAction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAction(e.target.value);
  };

  const handleSelectPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPage(e.target.value);
    setSelectedAction("");
  };

  return (
    <div className="pt-32 flex flex-col items-center justify-center">
      <h2 className="font-inter text-2xl">Select page</h2>
      <select
        onChange={handleSelectPage}
        className={selectStyles}
        value={selectedPage ?? ""}
      >
        <option value="">--Choose one--</option>
        {PAGES.map((page) => (
          <option value={page} key={page}>
            {page}
          </option>
        ))}
      </select>
      {}
      {selectedPage && (
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-inter text-xl">Select Operation</h2>
          <select
            onChange={handleSelectAction}
            className={selectStyles}
            value={selectedAction ?? ""}
          >
            <option value="">--Choose one--</option>
            {ACTIONS.map((action) => (
              <option key={action} value={action}>
                {actionLabel[action]}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedPage && selectedAction && (
        <SceneRenderer page={selectedPage} action={selectedAction} />
      )}

      <button
        className="bg-slate-600 w-[150px] rounded-xl hover:bg-slate-700  mt-2 px-5 mb-4 text-white"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};
export default AdminDashboard;
