export function InputField({ field, state, onInput }) {
  const { key, autoFocus, label, placeholder, type, required } = field;
  const [value, setValue] = state;

  // Properties
  const initialValue = String(value[key] ?? "");

  // Methods
  function onChange(event) {
    const newValue = event.target.value;

    changeValue(newValue);
  }

  function changeValue(newValue) {
    const clonedItem = { ...value };

    clonedItem[key] = newValue;
    setValue(clonedItem);
  }

  return (
    <label className="input input-field">
      <span>{label}:</span>
      <input
        autoFocus={autoFocus}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type={type}
        value={initialValue}
        onInput={onInput}
      />
    </label>
  );
}
