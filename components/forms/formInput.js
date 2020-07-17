import { theme } from '../../tailwind.config'

export default function FormInput({
  register,
  errors,
  type,
  label,
  labelTxt,
  placeholder,
  errorMsg,
  currentPass,
}) {
  return (
    <div className="control-group relative mb-5 flex flex-col">
      <label
        className="control-label block text-secondary text-sm font-semibold mb-1 transition ease-in duration-300"
        htmlFor={label}>
        {labelTxt}
      </label>
      <input
        className={`appearance-none block w-full border border-gray-400 rounded py-2 px-4 focus:border-primaryText focus:outline-none ${
          Object.keys(errors).includes(label) ? 'border-red-400' : 'border-gray-400'
        }`}
        type={type}
        id={label}
        name={label}
        autoComplete="off"
        placeholder={placeholder}
        ref={
          type === 'email'
            ? register({
                required: true,
                pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              })
            : label === 'password'
            ? register({
                required: true,
                minLength: 6,
              })
            : label === 'passwordConf'
            ? register({
                required: true,
                validate: (value) => value === currentPass || 'The passwords is not matching',
              })
            : register({
                required: true,
              })
        }
      />
      <p className="text-red-500 text-sm italic font-semibold">
        {errors[label] && errors[label].type === 'required' && errorMsg}
        {label === 'email' &&
          errors.email &&
          errors.email.type === 'pattern' &&
          "It's not valid email"}
        {label === 'password' &&
          errors.password &&
          errors.password.type === 'minLength' &&
          'Password must be at least 6 characters'}
        {label === 'passwordConf' && errors.passwordConf && errors.passwordConf.message}
      </p>
      <style jsx>{`
        .control-group:focus-within .control-label {
          color: ${theme.extend.colors.primaryText};
        }
      `}</style>
    </div>
  )
}
