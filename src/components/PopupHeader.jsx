import { useModal } from "../state/ModalContext";

export function PopupHeader({ title }) {
  const { setModal } = useModal();

  return (
    <div className="form-header">
      <h2>{title}</h2>
      <button className="close-button" onClick={() => setModal(null)}>
        X
      </button>
    </div>
  );
}
