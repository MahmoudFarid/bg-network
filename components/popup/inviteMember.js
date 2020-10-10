import FormInput from '../forms/formInput'
import { useForm } from 'react-hook-form'

export default function InviteMember({ setIsInvitedOverlay }) {
  const { register, errors, handleSubmit, watch } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = (data) => {
    setIsInvitedOverlay(false)
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="details w-10/12 bg-white overflow-auto fixed z-50 p-6 shadow-lg rounded-lg md:w-7/12 xl:w-5/12">
      <FormInput
        register={register}
        errors={errors}
        label="email"
        labelTxt="Email*"
        type="text"
        placeholder="Enter Member's Email"
      />
      <FormInput
        register={register}
        errors={errors}
        label="password"
        labelTxt="Password*"
        type="password"
        placeholder="Enter Member's Password"
      />

      <p className="text-primaryLight text-xs italic">
        Admins: Have full access to applications specified by an owner.
      </p>

      <div className="flex justify-between border-t-2 border-gray-200 pt-3 mt-16 w-full">
        <button
          className="py-2 px-12 text-primary border border-primary text-xs font-semibold rounded-lg hover:bg-gray-100 focus:outline-none"
          onClick={() => setIsInvitedOverlay(false)}>
          Cancel
        </button>
        <button
          className="py-2 px-12 bg-primary text-gray-400 text-xs font-semibold rounded-lg hover:text-white focus:outline-none"
          type="submit">
          Add
        </button>
      </div>

      <style jsx>{`
        .details {
          min-height: 20rem;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </form>
  )
}
