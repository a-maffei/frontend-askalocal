import { createPortal } from "react-dom";
import styled from "styled-components";
import Button from "../Button/Button";
const Modal = ({ children, onModalClose, showModal, onSaveHandler }) => {
    return createPortal(
        <Wrapper
            style={{
                opacity: showModal ? 1 : 0,
                pointerEvents: showModal ? "all" : "none",
            }}
        >
            <div
                onClick={onModalClose}
                role="button"
                className="iu-modal-backdrop"
                style={{
                    display: showModal ? "flex" : "none",
                }}
            />
            <div className="iu-modal-content">
                {children}
                <footer className="px-12 md:sticky absolute bottom-0 bg-white w-full left-0 py-4 border-t border-black flex items-center justify-between">
                    <Button onClick={onModalClose}>Dismiss</Button>
                    <Button
                        onClick={() => {
                            onSaveHandler();
                            onModalClose();
                        }}
                    >
                        Save
                    </Button>
                </footer>
            </div>
        </Wrapper>,
        document.getElementById("modal")
    );
};