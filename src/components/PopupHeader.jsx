export function PopupHeader({ setVisiblility, title }) {
  return (
    <div className="form-header">
      <h2>{title}</h2>
      <button className="close-button" onClick={() => setVisiblility(false)}>
        X
      </button>
    </div>
  );
}
