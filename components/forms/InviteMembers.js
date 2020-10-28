import Router from 'next/router'
import { useForm } from 'react-hook-form'
import FormInput from './formInput'

export default function InviteMembersForm() {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = (data) => {
    console.log(data)
    Router.push('/setup/add-plan')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 shadow-lg rounded-lg">
      <div className="w-full lg:w-7/12">
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
      </div>

      <p className="text-primaryLight text-xs italic">
        Admins: Have full access to applications specified by an owner.
      </p>

      <div className="flex justify-between border-t-2 border-gray-200 pt-3 mt-10 w-full">
        <div>
          <button
            type="button"
            className="py-3 px-12 mr-5 text-primary border border-primary text-xs font-semibold rounded-lg hover:bg-gray-100 focus:outline-none"
            onClick={() => Router.push('/setup/add-plan')}>
            Skip
          </button>
        </div>
        <button
          className="py-3 px-12 bg-primary text-gray-400 text-xs font-semibold rounded-lg hover:text-white focus:outline-none"
          type="submit">
          Continue
        </button>
      </div>
    </form>
  )
}
