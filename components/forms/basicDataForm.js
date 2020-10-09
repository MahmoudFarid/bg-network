import { theme } from '../../tailwind.config'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Dropzone from 'react-dropzone-uploader'
import FormInput from './formInput'
import { PatchProfile } from './../../redux/actions/profileActions'

export default function BasicDataForm({ profile }) {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onBlur',
  })
  const [uploadImg, setUploadImg] = useState()
  const dispatch = useDispatch()

  const getUploadParams = () => {
    return { url: 'https://httpbin.org/post' }
  }

  const handleChangeImg = ({ meta }, status, files) => {
    if (status === 'headers_received') {
      setUploadImg(files[0].file)
    } else if (status === 'aborted') {
      toast.warning(`${meta.name}, upload failed...`)
    } else if (status === 'removed') {
      setUploadImg('')
    }
  }

  const onSubmit = (data) => {
    const token = localStorage.getItem('accessToken')
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Token ${token}`,
      },
    }

    let formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('description', data.description)
    uploadImg && formData.append('avatar', uploadImg)

    dispatch(PatchProfile(formData, config))
  }

  const Layout = ({ input, previews, dropzoneProps, files, extra: { maxFiles } }) => {
    return (
      <div {...dropzoneProps}>
        {previews}
        {files.length === 0 && (
          <div className="mt-4">
            <i className="fas fa-file-image fa-2x text-primaryLight"></i>
          </div>
        )}
        {files.length < maxFiles && input}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-7/12 px-10">
        <FormInput
          register={register}
          errors={errors}
          defaultValue={profile.name}
          label="name"
          labelTxt="Name*"
          type="text"
        />

        <FormInput
          register={register}
          errors={errors}
          defaultValue={profile.email}
          label="email"
          labelTxt="Email*"
          type="text"
        />

        <Dropzone
          maxFiles={1}
          multiple={false}
          accept="image/*"
          inputContent="Drop profile picture here or click to upload"
          LayoutComponent={Layout}
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeImg}
          styles={{
            dropzone: {
              border: '2px dashed #ddd',
              background: `${theme.extend.colors.bgLightest}`,
              overflow: 'hidden',
              // maxHeight: '200px',
            },
            inputLabel: {
              color: `${theme.extend.colors.primaryLight}`,
              fontWeight: 'normal',
              fontSize: '16px',
              top: '20%',
            },
          }}
        />
      </div>

      <div className="absolute bottom-0 border-t-2 border-gray-200 mb-5 pt-3 w-full">
        <button
          className="float-right bg-primary text-gray-400 text-xs font-semibold rounded-lg py-3 px-12 mr-6 hover:text-white focus:outline-none"
          type="submit">
          Save
        </button>
      </div>
    </form>
  )
}
