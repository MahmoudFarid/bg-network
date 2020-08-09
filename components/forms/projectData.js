import { theme } from '../../tailwind.config'
import Router from 'next/router'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Dropzone from 'react-dropzone-uploader'
import API from '../../api'
import FormInput from './formInput'
import Loading from './../core/loading'
import GoogleMap from '../features/googleMap'
import DropdownMenu from './../features/dropdownMenu'
import { AddProject } from './../../redux/actions/projectsActions'

export default function ProjectData() {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onBlur',
  })
  const [submit, setSubmit] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [plans, setPlans] = useState([])
  const [plansIDs, setPlansIDs] = useState([])
  const [uploadCoverImg, setCoverImg] = useState({})
  const [uploadProjectImgs, setProjectImgs] = useState([])
  const dispatch = useDispatch()

  const itemSelectedFunc = (plansArr) => {
    setPlansIDs(plansArr)
  }

  const getUploadParams = () => {
    return { url: 'https://httpbin.org/post' }
  }

  const Layout = ({ input, previews, dropzoneProps, files, extra: { maxFiles } }) => {
    return (
      <div {...dropzoneProps}>
        {previews}
        {files.length === 0 && (
          <div className="mt-12">
            <i className="fas fa-file-image fa-3x text-primaryLight"></i>
          </div>
        )}
        {files.length < maxFiles && input}
      </div>
    )
  }

  const handleChangeCoverImg = ({ meta }, status) => {
    if (status === 'headers_received') {
      setCoverImg(meta)
    } else if (status === 'aborted') {
      toast.warning(`${meta.name}, upload failed...`)
    } else if (status === 'removed') {
      setCoverImg({})
    }
  }

  const handleChangeProjectImgs = ({ meta }, status) => {
    if (status === 'headers_received') {
      setProjectImgs((old) => [...old, meta])
    } else if (status === 'aborted') {
      toast.warning(`${meta.name}, upload failed...`)
    } else if (status === 'removed') {
      const index = uploadProjectImgs.findIndex((project) => project.name === meta.name)
      uploadProjectImgs.splice(index, 1)
    }
  }

  const preventShowLetter = (e) => {
    const char = String.fromCharCode(e.which)
    if (!/[0-9]/.test(char)) {
      e.preventDefault()
    }
  }

  const onchange = (e) => {
    let reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = (e) => {
      console.log(e.target.result)
    }
  }

  const onSubmit = (data) => {
    setSubmit(true)
    const result = {
      ...data,
      cover_image: uploadCoverImg,
      uploaded_images: uploadProjectImgs,
      plans: plansIDs,
    }
    console.log(result)
    dispatch(AddProject(result))
  }

  useEffect(() => {
    async function fetchPlans() {
      await API.get('plans/').then((res) => {
        setPlans(res.data.results)
        setIsLoading(false)
      })
    }
    fetchPlans()
  }, [])

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container-fluid my-16">
          <h2 className="text-black font-bold text-lg mb-5">Add Project</h2>
          <div className="bg-white p-8 rounded-lg shadow-lg clearfix">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-10 md:grid-cols-2">
                <div>
                  <FormInput
                    register={register}
                    errors={errors}
                    label="name"
                    labelTxt="Project Name"
                    errorMsg="Name is required"
                    type="text"
                  />
                  <FormInput
                    register={register}
                    errors={errors}
                    label="youtube"
                    labelTxt="Youtube Link"
                    type="text"
                    req={false}
                  />
                  <div>
                    <label className="control-label block text-primaryLight text-sm font-semibold mb-1 transition ease-in duration-300">
                      Plans
                    </label>
                    <DropdownMenu
                      order="first"
                      name="Select plans"
                      dropdownWidth="w-full"
                      multiple={true}
                      options={plans}
                      itemSelectedFunc={itemSelectedFunc}
                    />
                    <p className="text-red-500 text-sm italic font-semibold mb-5">
                      {submit && plansIDs.length === 0 && 'Select at least one plan please'}
                    </p>
                  </div>
                </div>

                <div>
                  <FormInput
                    register={register}
                    errors={errors}
                    label="area"
                    labelTxt="Area"
                    type="text"
                    onKeyPress={preventShowLetter}
                    req={false}
                  />
                  <FormInput
                    register={register}
                    errors={errors}
                    label="floors_number"
                    labelTxt="Floors Number"
                    type="text"
                    onKeyPress={preventShowLetter}
                    req={false}
                  />
                  <FormInput
                    register={register}
                    errors={errors}
                    label="flats_per_floor"
                    labelTxt="Flats per Floor"
                    type="text"
                    onKeyPress={preventShowLetter}
                    req={false}
                  />
                </div>
              </div>

              <label className="control-label block text-primaryLight text-sm font-semibold mb-1 transition ease-in duration-300">
                Cover Image
              </label>
              <Dropzone
                maxFiles={1}
                multiple={false}
                accept="image/*"
                inputContent="upload"
                getUploadParams={getUploadParams}
                onChangeStatus={handleChangeCoverImg}
                styles={{
                  dropzone: {
                    border: `2px solid #ddd`,
                    overflow: 'hidden',
                    width: '20%',
                    minHeight: '45px',
                    margin: '0',
                  },
                  inputLabel: {
                    color: `${theme.extend.colors.primaryLight}`,
                    fontWeight: 'normal',
                    fontSize: '14px',
                  },
                }}
              />
              <p className="text-red-500 text-sm italic font-semibold">
                {submit && Object.keys(uploadCoverImg).length === 0 && 'Cover image is required'}
              </p>

              <div className="grid gap-10 md:grid-cols-2">
                <div>
                  <label className="control-label block text-primaryLight text-sm font-semibold mb-1 mt-5 transition ease-in duration-300">
                    Project Images
                  </label>
                  <Dropzone
                    accept="image/*"
                    inputContent="Drop images here or click to upload."
                    LayoutComponent={Layout}
                    getUploadParams={getUploadParams}
                    onChangeStatus={handleChangeProjectImgs}
                    styles={{
                      dropzone: {
                        border: '2px dashed #ddd',
                        background: `${theme.extend.colors.bgLightest}`,
                        overflow: 'hidden',
                        minHeight: '200px',
                      },
                      inputLabel: {
                        color: `${theme.extend.colors.primaryLight}`,
                        fontWeight: 'normal',
                        fontSize: '16px',
                        top: '20%',
                      },
                      inputLabelWithFiles: {
                        color: `${theme.extend.colors.secondaryLight}`,
                        marginBottom: '0.75rem',
                      },
                    }}
                  />
                </div>
                <div>
                  <label className="control-label block text-primaryLight text-sm font-semibold mb-1 mt-5 transition ease-in duration-300">
                    Project Location
                  </label>
                  <GoogleMap height="12.6rem" />
                </div>
              </div>
              <p className="text-red-500 text-sm italic font-semibold">
                {submit && uploadProjectImgs.length === 0 && 'Insert at least one image please'}
              </p>

              <div className="border-t-2 border-gray-200 pt-3 mt-10 w-full">
                <button
                  className="float-right py-3 px-12 bg-primary text-gray-400 text-xs font-semibold rounded-lg hover:text-white focus:outline-none"
                  type="submit">
                  Save
                </button>
                <button
                  className="float-right py-3 px-12 mr-5 text-primary border border-primary text-xs font-semibold rounded-lg hover:bg-gray-100 focus:outline-none"
                  onClick={() => Router.push('/projects')}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
