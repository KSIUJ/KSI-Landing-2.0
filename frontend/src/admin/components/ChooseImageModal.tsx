import { btnStyles, fileInputStyles, inputStyles } from "../Styles.ts";
import type { ServerContentResponse } from "../data.tsx";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { readAllItems, createItem, uploadFile } from "../http.ts";
import { useAuth } from "../AuthContext.tsx";
import { VITE_API_URL } from "../../api.ts";
import { form } from "framer-motion/client";

const STATIC_IMAGE_URL_BASE = `${VITE_API_URL}/images`;

interface ChooseImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imgURL: string) => void;
}

export const ChooseImageModal = (props: ChooseImageModalProps) => {
  const { apiKey } = useAuth();
  const [data, setData] = useState<ServerContentResponse[]>([]);
  const [currentPath, setCurrentPath] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [folderName, setFolderName] = useState<string>("");

  useEffect(() => {
    if (props.isOpen) {
      const fetchServerContent = async () => {
        try {
          const responses: ServerContentResponse[] = await readAllItems(
            apiKey,
            `images?path=${encodeURIComponent(currentPath)}`,
          );
          setData(responses);
        } catch (e) {
          console.error(e);
        }
      };
      fetchServerContent();
    }
  }, [apiKey, currentPath, props.isOpen]);

  const handleItemClick = (item: ServerContentResponse) => {
    if (item.is_dir) {
      setCurrentPath(item.path);
    } else {
      props.onSelectImage(`${STATIC_IMAGE_URL_BASE}/${item.path}`);
      handleClose();
    }
  };

  const handleClose = () => {
    setCurrentPath("");
    setData([]);
    props.onClose();
  };

  if (!props.isOpen) {
    return null;
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>): void {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  }

  async function handleUpload(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!file) {
      console.log("File is not selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log("Sending...");
      const response: ServerContentResponse = await uploadFile(
        apiKey,
        `images?path=${encodeURIComponent(currentPath)}`,
        formData,
      );
      console.log("Achive response", response);
      setData((prevItems) => [...prevItems, response]);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleCreateFolder(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (folderName === "") {
      console.log("Folder name is not written");
      return;
    }

    try {
      console.log("Creating...");

      const response: ServerContentResponse = await createItem(
        apiKey,
        `images/mkdir?path=${encodeURIComponent(currentPath)}&folder_name=${encodeURIComponent(folderName)}`,
        {},
      );

      console.log("Created", response);
      setData((prevItems) => [...prevItems, response]);
    } catch (e) {
      console.error(e);
    }
  }

  function handleFolderNameChange(event: ChangeEvent<HTMLInputElement>): void {
    if (event.target.value && event.target.value.length > 0) {
      setFolderName(event.target.value);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleClose}
    >
      <div
        className="bg-white p-6 min-w-[300px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <p>Do you want upload file here?</p>
          <form onSubmit={handleUpload}>
            <input
              className={fileInputStyles}
              type="file"
              onChange={handleFileChange}
              accept="image/*"
            />
            <button className={btnStyles} type="submit" disabled={!file}>
              Upload File
            </button>
          </form>
        </div>

        <div>
          <p>Do you want create folder here?</p>
          <form onSubmit={handleCreateFolder}>
            <input
              className={inputStyles}
              type="text"
              onChange={handleFolderNameChange}
              placeholder="Folder name"
            />
            <button
              className={btnStyles}
              type="submit"
              disabled={folderName === ""}
            >
              Create Folder
            </button>
          </form>
        </div>
        <p>Do you want choose image?</p>
        <div className={"pl-4"}>
          {data.map((content) => (
            <p key={content.path} onClick={() => handleItemClick(content)}>
              {content.is_dir ? "📁" : "🖼️"} | {content.name}
            </p>
          ))}
          <p hidden={data.length > 0}>It is empty here</p>
        </div>
        <button onClick={handleClose} className={btnStyles}>
          Close
        </button>
      </div>
    </div>
  );
};
