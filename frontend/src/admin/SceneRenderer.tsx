import { useEffect, useState } from "react";
import { btnStyles, inputStyles, selectStyles } from "./Styles";
import { useAuth } from "./AuthContext";
import { type Action, type Page } from "./AdminDashboard";
import {
  createItem,
  deleteItem,
  updateItem,
  readAllItems,
  readItem,
} from "./http";

import { api } from "./utils/api";
import { isStepValid } from "./utils/validate";
import {
  toBoardScheme,
  toNewsScheme,
  toProjectScheme,
  toVIPScheme,
} from "./utils/castToSchemes";
import { SCENES, type UserData, labelEndpoint } from "./data";
const SceneRenderer: React.FC<{ action: Action; page: Page }> = ({
  action,
  page,
}) => {
  const { apiKey } = useAuth();
  const [userData, setUserData] = useState<Record<string, string>>({});
  const [fetchedData, setFetchedData] = useState<any>(null);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const SCHEME_MAP: Record<Page, (u: UserData) => any> = {
    "About Board": toBoardScheme,
    "About VIP": toVIPScheme,
    News: toNewsScheme,
    Projects: toProjectScheme,
  };

  useEffect(() => {
    setStepIndex(0);
    setUserData({});
    setError(null);
    setFetchedData(null);
    setSuccess(null);
  }, [action, page]);

  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => {
      setSuccess(null);
    }, 2000);
    return () => clearTimeout(timer);
  }, [success]);

  useEffect(() => {
    if (action === "update" && step === "form" && fetchedData) {
      const patch: Record<string, string> = {};
      fields.forEach((f) => {
        patch[f.name] = fetchedData[f.name] ?? "";
      });
      setUserData((prev) => ({ ...prev, ...patch }));
    }
  }, [fetchedData]);

  function handleGoBack() {
    setStepIndex((i) => i - 1);
    setFetchedData(null);
    setUserData({});
    setError(null);
    setSuccess(null);
  }
  function handleUserInput(
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const endpoint = labelEndpoint[page];
  const operations: Record<string, () => Promise<any>> = {
    "create:form": () =>
      createItem(apiKey, endpoint, SCHEME_MAP[page](userData)),
    "update:idInput": () => readItem(apiKey, endpoint, userData.id),
    "update:form": () =>
      updateItem(apiKey, endpoint, SCHEME_MAP[page](userData), userData.id),
    "delete:idInput": () => deleteItem(apiKey, endpoint, userData.id),
    "readAll:list": () => readAllItems(apiKey, endpoint),
    "readByID:idInput": () => readItem(apiKey, endpoint, userData.id),
  };

  async function handleSubmit() {
    if (!isStepValid(fields, userData)) {
      setError("Please fill all the required inputs with correct data");
      return;
    }
    setError(null);
    try {
      const operationKey = `${action}:${step ?? ""}`;
      const response = await api(() => operations[operationKey]());
      setFetchedData(response);
      if (operationKey === "create:form") {
        setUserData({});
      }
      if (
        operationKey === "readByID:idInput" ||
        operationKey === "update:idInput"
      ) {
        setStepIndex((i) => i + 1);
        setSuccess(null);
      } else {
        setSuccess("Operation completed successfully!");
      }
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong");
    }
  }

  const currScene = SCENES[page]?.[action];
  if (!currScene) return null;
  const step = currScene?.steps[stepIndex];
  const fields = currScene?.fieldsByStep?.[step] ?? [];

  let renderedFields = null;
  if (step === "form" || step === "idInput") {
    renderedFields = fields.map((field) => {
      const required = field.required ? "*" : "";
      if (field.options) {
        return (
          <select
            onChange={handleUserInput}
            className={selectStyles}
            key={field.name}
            value={userData[field.name] ?? ""}
            name={field.name}
          >
            <option>--Choose one--</option>
            {field.options.map((optionName) => (
              <option key={optionName} value={optionName}>
                {optionName}
              </option>
            ))}
          </select>
        );
      } else if (!field.options) {
        if (field.textarea) {
          return (
            <textarea
              className={inputStyles}
              key={field.name}
              onChange={handleUserInput}
              value={userData[field.name] || ""}
              name={field.name}
              placeholder={`${field.placeholder}${required}`}
              rows={12}
            />
          );
        } else {
          return (
            <input
              onChange={handleUserInput}
              value={userData[field.name] || ""}
              type={field.type}
              name={field.name}
              key={field.name}
              placeholder={`${field.placeholder}${required}`}
              className={inputStyles}
            />
          );
        }
      }
    });
  } else if (step === "list" && fetchedData) {
    if (Array.isArray(fetchedData) && fetchedData.length === 0) {
      renderedFields = <p className="font-ssp font-semibold">No items found</p>;
    } else {
      if (Array.isArray(fetchedData)) {
        renderedFields = fetchedData.map((item: any, i: number) => (
          <div className="border p-2 m-2 rounded-md max-w-xl " key={i}>
            {Object.entries(item).map(([key, value]) => (
              <p className="flex gap-1 " key={key}>
                <span className="font-semibold font-ssp">{key}: </span>
                <span className="break-all">{String(value)}</span>
              </p>
            ))}
          </div>
        ));
      }
    }
  } else if (step === "detail" && fetchedData) {
    renderedFields = (
      <div className="border-2 p-2 m-2 rounded-md max-w-xl">
        {Object.keys(fetchedData).map((key) => (
          <p key={key}>
            <span className="font-semibold font-ssp">{key}:</span>
            <span className="break-all"> {String(fetchedData[key])}</span>
          </p>
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center">
      {renderedFields}

      <button className={btnStyles} onClick={handleSubmit}>
        Submit
      </button>
      {(step === "detail" || (action === "update" && step === "form")) && (
        <button className={btnStyles} onClick={handleGoBack}>
          go back
        </button>
      )}
      {error && <p className="font-ssp text-red-400">{error}</p>}
      {success && <p className="font-ssp text-green-700">{success}</p>}
      <p className="font-ssp font-light text-sm">* required fields</p>
    </div>
  );
};

export default SceneRenderer;
