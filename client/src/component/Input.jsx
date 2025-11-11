const Input = ({ placeholder, onChange, name }) => {
  return (
    <div>
      <div>
        <input
          type="text"
          className="input-field"
          placeholder={placeholder}
          onChange={onChange}
          name={name}
        />
      </div>
    </div>
  );
};
export default Input;
