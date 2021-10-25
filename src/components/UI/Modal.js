import React from 'react'
import ReactDOM from 'react-dom';
import classes from "./Modal.module.css";


const Backdrop = (props) => {
    return (
        <div className={classes.backdrop} onClick={props.onClose} />
    );
};

const ModelOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
}


const Modal = (props) => {
    const protalElement = document.getElementById("overlays");
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, protalElement)}
            {ReactDOM.createPortal(<ModelOverlay>{props.children}</ModelOverlay>, protalElement)}
        </>
    )
}

export default Modal
