import Head from 'next/head'
import { theme } from '../../tailwind.config'
import Router from 'next/router'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Dropzone from 'react-dropzone-uploader'
import API from '../../api'
import FormInput from './formInput'
import Loading from './../core/loading'
import Overlay from './../features/overlay'
import DeleteObj from './../popup/deleteObj'
import GoogleMap from '../features/googleMap'
import DropdownMenu from './../features/dropdownMenu'
import { AddProject, EditProject, DeleteProject } from './../../redux/actions/projectsActions'

export default function ProjectData({ pid, isSetup }) {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onBlur',
  })
  const [submit, setSubmit] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleteOverlay, setIsDeleteOverlay] = useState(false)
  const [project, setProject] = useState({})
  const [plans, setPlans] = useState([])
  const [plansIDs, setPlansIDs] = useState([])
  const [plansNames, setPlansNames] = useState([])
  const [choices, setChoices] = useState([])
  const [uploadCoverImg, setCoverImg] = useState()
  const [uploadProjectImgs, setProjectImgs] = useState([])
  const dispatch = useDispatch()

  const itemSelectedFunc = (choices) => {
    let plansIDs = []
    let plansNames = []
    choices.map((choice) => {
      plansIDs.push(choice.id), plansNames.push(choice.name)
    })
    setPlansIDs(plansIDs)
    setPlansNames(plansNames)
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

  const handleChangeCoverImg = ({ meta }, status, files) => {
    if (status === 'headers_received') {
      setCoverImg(files[0].file)
    } else if (submit && status === 'aborted') {
      toast.warning(`${meta.name}, upload failed...`)
    } else if (status === 'removed') {
      setCoverImg('')
    }
  }

  const handleChangeProjectImgs = ({ meta }, status, files) => {
    console.log(files)
    if (status === 'headers_received') {
      setProjectImgs(files.map((f, i) => files[i].file))
    } else if (submit && status === 'aborted') {
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

  const onDeletingItem = () => {
    dispatch(DeleteProject(pid))
  }

  const onSubmit = (data) => {
    setSubmit(true)
    const token = localStorage.getItem('accessToken')
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Token ${token}`,
      },
    }

    let formData = new FormData()
    formData.append('name', data.name)
    formData.append('youtube', data.youtube)
    formData.append('area', data.area)
    formData.append('floors_number', data.floors_number)
    formData.append('flats_per_floor', data.flats_per_floor)

    uploadCoverImg && formData.append('cover_image', uploadCoverImg)

    plansIDs.map((img) => formData.append('plans', img))
    formData.getAll('plans')

    if (uploadProjectImgs.length > 0) {
      uploadProjectImgs.map((img) => formData.append('uploaded_images', img))
      formData.getAll('uploaded_images')
    }

    pid && plansIDs.length > 0
      ? dispatch(EditProject(pid, formData, config))
      : plansIDs.length > 0 && uploadProjectImgs.length > 0 && typeof uploadCoverImg == 'object'
      ? dispatch(AddProject(formData, config, isSetup))
      : null
  }

  useEffect(() => {
    if (pid) {
      async function fetchProject() {
        await API.get(`projects/${pid}`).then((res) => {
          setProject(res.data)
          let planIDs = []
          let planNames = []
          res.data.plans.map((plan) => {
            planIDs.push(plan.id), planNames.push(plan.name)
          })
          setChoices(res.data.plans)
          setPlansIDs(planIDs)
          setPlansNames(planNames)
          setIsLoading(false)
        })
      }
      fetchProject()
    }
    async function fetchPlans() {
      await API.get('plans/').then((res) => {
        setPlans(res.data.results)
        setIsLoading(false)
      })
    }
    fetchPlans()
  }, [pid])

  return (
    <div>
      <Head>
        <title>{pid ? 'Edit Project' : 'Add Project'}</title>
      </Head>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={`${!isSetup && 'container my-12'}`}>
          <Overlay opacity={isDeleteOverlay} />
          {isDeleteOverlay && <DeleteObj name={project.name} onDeletingItem={onDeletingItem} />}

          <div className="flex justify-between">
            {!isSetup && (
              <h2 className="text-black font-bold text-md mb-3">{pid ? 'Edit' : 'Add'} Project</h2>
            )}
            {pid && (
              <button
                className="py-2 px-10 text-danger text-sm border border-danger font-semibold rounded-lg mb-5 transition duration-500 ease-in-out hover:bg-danger hover:text-white focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsDeleteOverlay(true)
                }}>
                Delete
              </button>
            )}
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg clearfix">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-row-10 md:grid-cols-2 md:gap-10">
                <div>
                  <FormInput
                    register={register}
                    errors={errors}
                    defaultValue={project?.name}
                    label="name"
                    labelTxt="Project Name*"
                    type="text"
                  />
                  <div>
                    <label className="control-label block text-primaryLight text-sm font-semibold mb-1 transition ease-in duration-300">
                      Plans*
                    </label>
                    <DropdownMenu
                      order="first"
                      name={`${plansNames.length > 0 && plansNames}`}
                      placeholder={`${plansNames.length == 0 && 'Select plans'}`}
                      dropdownWidth="w-full"
                      multiple={true}
                      options={plans}
                      choices={choices}
                      defaultValues={project?.plans}
                      itemSelectedFunc={itemSelectedFunc}
                    />
                    <p className="text-red-500 text-sm italic font-semibold mb-5">
                      {submit && plansIDs.length === 0 && 'Select at least one plan please'}
                    </p>
                  </div>

                  <FormInput
                    register={register}
                    errors={errors}
                    defaultValue={project?.youtube}
                    label="youtube"
                    labelTxt="Youtube Link"
                    type="text"
                    req={false}
                  />
                </div>

                <div>
                  <FormInput
                    register={register}
                    errors={errors}
                    defaultValue={project?.area}
                    label="area"
                    labelTxt="Area*"
                    type="text"
                    onKeyPress={preventShowLetter}
                  />
                  <FormInput
                    register={register}
                    errors={errors}
                    defaultValue={project?.floors_number}
                    label="floors_number"
                    labelTxt="Floors Number*"
                    type="text"
                    onKeyPress={preventShowLetter}
                  />
                  <FormInput
                    register={register}
                    errors={errors}
                    defaultValue={project?.flats_per_floor}
                    label="flats_per_floor"
                    labelTxt="Flats per Floor*"
                    type="text"
                    onKeyPress={preventShowLetter}
                  />
                </div>
              </div>

              <div className="grid gap-row-10 md:grid-cols-2 md:gap-10">
                <div>
                  <label className="control-label block text-primaryLight text-sm font-semibold mb-1 transition ease-in duration-300">
                    Cover Image*
                  </label>
                  <Dropzone
                    maxFiles={1}
                    multiple={false}
                    accept="image/*"
                    inputContent="Drop image here or click to upload"
                    getUploadParams={getUploadParams}
                    onChangeStatus={handleChangeCoverImg}
                    styles={{
                      dropzone: {
                        border: `2px solid #ddd`,
                        overflow: 'hidden',
                        width: '75%',
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
                    {!pid &&
                      submit &&
                      typeof uploadCoverImg != 'object' &&
                      'This Field is required'}
                  </p>
                </div>
              </div>

              <div className="grid gap-row-10 md:grid-cols-2 md:gap-10">
                <div>
                  <label className="control-label block text-primaryLight text-sm font-semibold mb-1 mt-5 transition ease-in duration-300">
                    Project Images*
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
                  <p className="text-red-500 text-sm italic font-semibold">
                    {!pid &&
                      submit &&
                      uploadProjectImgs.length === 0 &&
                      'Insert at least one image please'}
                  </p>
                </div>
                <div>
                  <label className="control-label block text-primaryLight text-sm font-semibold mb-1 mt-5 transition ease-in duration-300">
                    Project Location
                  </label>
                  <GoogleMap height="12.6rem" />
                </div>
              </div>
              {isSetup ? (
                <div className="flex justify-between border-t-2 border-gray-200 pt-3 mt-10 w-full">
                  <div>
                    <button
                      type="button"
                      className="py-3 px-12 mr-5 text-primary border border-primary text-xs font-semibold rounded-lg hover:bg-gray-100 focus:outline-none"
                      onClick={() => Router.push('/dashboard')}>
                      Skip
                    </button>
                    <span className="text-danger text-xs italic">
                      If you skip, you will skip all the next steps
                    </span>
                  </div>
                  <button
                    className="py-3 px-12 bg-primary text-gray-400 text-xs font-semibold rounded-lg hover:text-white focus:outline-none"
                    type="submit">
                    Continue
                  </button>
                </div>
              ) : (
                <div className="border-t-2 border-gray-200 pt-3 mt-10 w-full">
                  <button
                    className="float-right py-3 px-12 bg-primary text-gray-400 text-xs font-semibold rounded-lg hover:text-white focus:outline-none"
                    type="submit"
                    onClick={() => setSubmit(true)}>
                    Save
                  </button>
                  {pid ? (
                    <button
                      className="float-right py-3 px-12 mr-5 text-primary border border-primary text-xs font-semibold rounded-lg hover:bg-gray-100 focus:outline-none"
                      type="button"
                      onClick={() => Router.push('/projects/[pid]', `/projects/${pid}`)}>
                      Cancel
                    </button>
                  ) : (
                    <button
                      className="float-right py-3 px-12 mr-5 text-primary border border-primary text-xs font-semibold rounded-lg hover:bg-gray-100 focus:outline-none"
                      type="button"
                      onClick={() => Router.push('/projects')}>
                      Cancel
                    </button>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
