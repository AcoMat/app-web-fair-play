import "./Modal.css";
import errorIcon from "../../assets/images/errorIcon.png";
import successIcon from "../../assets/images/successIcon.png";

export default function Modal({ isOpen, toggleModal, title, text, modalType }) {
  if (isOpen) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      {isOpen && (
        <div className={`modal-${modalType}`}>
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            {modalType === "error" ? (
              <img src={errorIcon} alt="Imagen 1" />
            ) : (
              <img src={successIcon} alt="Imagen 2" />
            )}
            <h2 className={`title-${modalType}`}>{title}</h2>
            <p>{text}</p>
            <button
              className={`btn-close-modal-${modalType}`}
              onClick={toggleModal}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}

