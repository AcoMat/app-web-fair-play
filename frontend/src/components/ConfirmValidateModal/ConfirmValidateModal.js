import "./ConfirmValidateModal.css";

export default function ConfirmValidateModal({
  isOpen,
  onClickSucces,
  onClickCancel,
  playerName,
}) {
  return (
    <>
      {isOpen && (
        <div className="confirmValidateModal">
          <div className="overlay"></div>
          <div className="modal-content">
            <p className="title">
              ¿Estás seguro que jugaste con "{playerName}"?
            </p>
            <p className="text">
              Tené en cuenta que podés ser baneado si valorás jugadores con los
              que no jugaste
            </p>
            <div className="actions">
              <button className="btnCancel" onClick={onClickCancel}>
                Cancelar
              </button>
              <button className="btnOK" onClick={onClickSucces}>
                Valorar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
