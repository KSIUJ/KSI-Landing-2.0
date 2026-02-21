import {btnStyles} from "../Styles.ts";

interface ChooseImageModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ChooseImageModal = (props: ChooseImageModalProps) => {
    if (!props.isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={props.onClose}>
            <div className="bg-white p-6 min-w-[300px]" onClick={(e) => e.stopPropagation()}>
                <p>Witamy w modalu</p>
                <button onClick={props.onClose} className={btnStyles}>
                    Zamknij
                </button>
            </div>
        </div>
    );
}