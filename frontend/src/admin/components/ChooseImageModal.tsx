import {btnStyles} from "../Styles.ts";
import type {ServerContentResponse} from "../data.tsx";
import {useEffect, useState} from "react";
import {readAllItems} from "../http.ts";
import {useAuth} from "../AuthContext.tsx";

interface ChooseImageModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ChooseImageModal = (props: ChooseImageModalProps) => {
    const { apiKey } = useAuth();
    const [data, setData] = useState<ServerContentResponse[]>([]);

    useEffect(() => {
        if (props.isOpen) {
            const fetchServerContent = async () => {
                try {
                    const responses: ServerContentResponse[] = await readAllItems(
                        apiKey,
                        `images`
                    );
                    setData(responses);
                }
                catch (e) {
                    console.error(e);
                }
            }
            fetchServerContent();
        }
    }, [apiKey, props.isOpen]);


    if (!props.isOpen) {
        return null;
    }



    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={props.onClose}>
            <div className="bg-white p-6 min-w-[300px]" onClick={(e) => e.stopPropagation()}>
                {data.map(content => (
                    <p key={content.path}>{content.name}</p>
                ))}
                <button onClick={props.onClose} className={btnStyles}>
                    Zamknij
                </button>
            </div>
        </div>
    );
}