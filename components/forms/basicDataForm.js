import { theme } from '../../tailwind.config'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import Dropzone from 'react-dropzone-uploader'
import FormInput from './formInput'

export default function BasicDataForm({ profile }) {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onBlur',
  })
  const [uploadImg, setUploadImg] = useState({})

  const getUploadParams = () => {
    return { url: 'https://httpbin.org/post' }
  }

  const handleChangeStatus = ({ meta }, status) => {
    if (status === 'headers_received') {
      setUploadImg(meta)
    } else if (status === 'aborted') {
      toast.warning(`${meta.name}, upload failed...`)
    } else if (status === 'removed') {
      setUploadImg(null)
    }
  }

  const onSubmit = (data) => {
    console.log(uploadImg)
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-7/12 px-10">
        <FormInput
          register={register}
          errors={errors}
          defaultValue={profile.name}
          label="name"
          labelTxt="Name"
          errorMsg="Name is required"
          type="text"
        />

        <FormInput
          register={register}
          errors={errors}
          defaultValue={profile.email}
          label="email"
          labelTxt="Email"
          errorMsg="Email is required"
          type="text"
        />

        <FormInput
          register={register}
          errors={errors}
          label="description"
          labelTxt="About"
          controlType="textarea"
          req={false}
        />

        <Dropzone
          maxFiles={1}
          accept="image/*"
          inputContent="Drop a profile picture"
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          styles={{
            dropzone: { border: '1px solid #cbd5e0', overflow: 'hidden' },
            inputLabel: { color: `${theme.extend.colors.primaryText}` },
          }}
        />
      </div>

      <div className="border-t-2 border-gray-200 mt-5 pt-3 w-full">
        <button
          className="float-right bg-primary text-gray-400 text-xs font-semibold rounded-lg py-3 px-12 mr-6 hover:text-white focus:outline-none"
          type="submit">
          Save
        </button>
      </div>
    </form>
  )
}
