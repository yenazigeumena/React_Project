import React from 'react';
import ReactDOM from 'react-dom';
import './modal.css'

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay">
        <header>
            <div className="modal-close" onClick={onClose}>
                <span>&lt;</span>
                뒤로가기
            </div>
        </header>
        <div className="modal">
            {children}
        </div>
    </div>,
    document.getElementById('root')
  );
};

export default Modal;
