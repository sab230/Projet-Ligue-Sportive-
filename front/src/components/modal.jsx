import Prototype from "prop-types"

const Modal = ({ modalTitle, showModal, closeModal, mainComponent, onConfirm }) => {
    return (
        <>
            {showModal && (
                <div
                    className="modal fade show"
                    id="staticBackdrop"
                    data-bs-keyboard="false"
                    tabIndex={-1}
                    style={{ display: "block" }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                    {modalTitle}
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body">
                                {mainComponent}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={closeModal}
                                >
                                    Fermé
                                </button>
                                <button onClick={onConfirm} type="button" className="btn btn-primary">
                                    Ok
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </>
    );
};

Modal.propTypes = {
    modalTitle: Prototype.string.isRequired,
    showModal: Prototype.bool.isRequired,
    closeModal: Prototype.func.isRequired,
    mainComponent: Prototype.element.isRequired,
    onConfirm: Prototype.func.isRequired,
}

export default Modal;
