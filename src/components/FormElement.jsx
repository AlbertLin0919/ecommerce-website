export const Input = ({
  id,
  labelText,
  register,
  type,
  errors,
  rules,
  placeholder,
}) => {
  return (
    <>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`form-control ${errors[id] && "is-invalid"}`}
        {...register(id, rules)}
      />
      {errors[id] && (
        <div className="invalid-feedback">{errors[id]?.message}</div>
      )}
      <label htmlFor={id} className="form-label text-black-50">
        {labelText}
      </label>
    </>
  );
};
