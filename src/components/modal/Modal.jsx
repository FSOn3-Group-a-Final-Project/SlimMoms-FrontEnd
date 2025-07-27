import { useEffect } from "react";
import styles from './Modal.module.css';

function Modal ({isOpen, onClose, children}) {
    //ESC tuşuyla kapatma
    useEffect(()=> {
        const handleKeyDown = (e) => {
            if(e.code === "Escape") {
                onClose();
            }
        };
        if(isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    },[isOpen, onClose]);

    //Arka plana tıklayınca kapatma
    const handleBackDropClick = (e) => {
        if(e.target === e.currentTarget) {
            onClose();
        }
    };
    if(!isOpen) return null;
    return (
        <>
        <div className={styles.Backdrop} onClick={handleBackDropClick}>
            <div className={styles.ModalContent}>
                <button className={styles.CloseButton} onClick={onClose}>x</button>
                {children}
            </div>

        </div>
        </>
    );
}
export default Modal;