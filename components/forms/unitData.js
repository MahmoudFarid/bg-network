import Head from 'next/head'
import { theme } from '../../tailwind.config'
import Router from 'next/router'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Dropzone from 'react-dropzone-uploader'
import API from '../../api'
import FormInput from './formInput'
import Loading from './../core/loading'
import Overlay from './../features/overlay'
import DeleteObj from './../popup/deleteObj'
import DropdownMenu from './../features/dropdownMenu'
import { AddUnit, EditUnit, DeleteUnit } from './../../redux/actions/unitsActions'

export default function UnitData({ pid, uid }) {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onBlur',
  })
  const [submit, setSubmit] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [unit, setUnit] = useState({})
  const [type, setType] = useState({})
  const [types, setTypes] = useState([])
  const [status, setStatus] = useState('')
  const [direction, setDirection] = useState('')
  const [uploadUnitImgs, setUnitImgs] = useState([])
  const [isDeleteOverlay, setIsDeleteOverlay] = useState(false)
  const dispatch = useDispatch()

  const directionsOptions = [
    { id: 1, name: 'Frontal' },
    { id: 2, name: 'Rear' },
    { id: 3, name: 'Sidy' },
  ]

  const statusOptions = [
    { id: 1, name: 'Free' },
    { id: 2, name: 'Reserved' },
  ]

  const itemSelectedFunc = (typeId, name, optionName, id) => {
    if (id === 'type') {
      setType({
        id: typeId,
        name: optionName,
      })
    } else if (id === 'direction') {
      setDirection(optionName.toUpperCase())
    } else if (id === 'status') {
      setStatus(optionName.toUpperCase())
    }
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

  const handleChangeUnitImgs = ({ meta }, status, files) => {
    if (status === 'headers_received') {
      setUnitImgs(files.map((f, i) => files[i].file))
    } else if (status === 'aborted') {
      toast.warning(`${meta.name}, upload failed...`)
    } else if (status === 'removed') {
      const index = uploadUnitImgs.findIndex((unit) => unit.name === meta.name)
      uploadUnitImgs.splice(index, 1)
    }
  }

  const preventShowLetter = (e) => {
    const char = String.fromCharCode(e.which)
    if (!/[0-9]/.test(char)) {
      e.preventDefault()
    }
  }

  const onDeletingItem = () => {
    dispatch(DeleteUnit(pid, uid))
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
    for (let item in data) {
      formData.append(item, data[item])
    }
    formData.append('type', type.id)
    formData.append('status', status)
    formData.append('direction', direction)

    if (uploadUnitImgs.length > 0) {
      uploadUnitImgs.map((img) => formData.append('uploaded_images', img))
      formData.getAll('uploaded_images')
    }

    uid
      ? dispatch(EditUnit(pid, uid, formData, config))
      : uploadUnitImgs.length > 0 && Object.keys(type).length > 0
      ? dispatch(AddUnit(pid, formData, config))
      : null
  }

  useEffect(() => {
    if (pid && uid) {
      async function fetchUnit() {
        await API.get(`projects/${pid}/units/${uid}`).then((res) => {
          setUnit(res.data)
          setType(res.data.type)
          setIsLoading(false)
        })
      }
      fetchUnit()
    }
    async function fetchTypes() {
      await API.get('projects/unit_types/').then((res) => {
        setTypes(res.data.results)
        setIsLoading(false)
      })
    }
    fetchTypes()
  }, [pid])

  return (
    <div>
      <Head>
        <title>{uid ? 'Edit Unit' : 'Add Unit'}</title>
      </Head>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container-fluid my-16">
          <Overlay opacity={isDeleteOverlay} />
          {isDeleteOverlay && <DeleteObj name={unit.name} onDeletingItem={onDeletingItem} />}

          <div className="flex justify-between">
            <h2 className="text-black font-bold text-lg mb-5">{uid ? 'Edit' : 'Add'} Unit</h2>
            {uid && (
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
            <p className="text-black font-bold mb-3">Basic Info</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-row-10 md:grid-cols-2 md:gap-10">
                <div>
                  <FormInput
                    register={register}
                    errors={errors}
                    defaultValue={unit?.name}
                    label="name"
                    labelTxt="Unit Name*"
                    type="text"
                  />
                  <FormInput
                    register={register}
                    errors={errors}
                    defaultValue={unit?.description}
                    label="description"
                    labelTxt="Description"
                    type="text"
                    controlType="textarea"
                    req={false}
                  />
                </div>
                <div>
                  <FormInput
                    register={register}
                    errors={errors}
                    defaultValue={unit?.code}
                    label="code"
                    labelTxt="Code*"
                    type="text"
                  />
                  <div className="mt-5">
                    <label className="control-label block text-primaryLight text-sm font-semibold mb-1 transition ease-in duration-300">
                      Status
                    </label>
                    <DropdownMenu
                      id="status"
                      order="first"
                      name={unit.status ? unit.status : 'status'}
                      defaultValue={unit.status}
                      dropdownWidth="w-full"
                      options={statusOptions}
                      itemSelectedFunc={itemSelectedFunc}
                    />
                  </div>
                </div>
              </div>

              <p className="text-black font-bold my-3">Price Info</p>
              <div className="grid gap-row-10 md:grid-cols-2 md:gap-10">
                <FormInput
                  register={register}
                  errors={errors}
                  defaultValue={unit?.cost}
                  label="cost"
                  labelTxt="Unit Price*"
                  type="text"
                  onKeyPress={preventShowLetter}
                />
                <FormInput
                  register={register}
                  errors={errors}
                  defaultValue={unit?.cash_percentage}
                  label="cash_percentage"
                  labelTxt="Cash Percentage Discount"
                  type="text"
                  onKeyPress={preventShowLetter}
                  req={false}
                />
              </div>

              <p className="text-black font-bold my-3">Unit Details</p>
              <div className="grid gap-row-10 md:grid-cols-2 md:gap-10">
                <div>
                  <div>
                    <label className="control-label block text-primaryLight text-sm font-semibold mb-1 transition ease-in duration-300">
                      Types*
                    </label>
                    <DropdownMenu
                      id="type"
                      order="first"
                      name={unit.type?.name ? unit.type.name : 'type'}
                      defaultValue={unit.type?.name}
                      dropdownWidth="w-full"
                      options={types}
                      itemSelectedFunc={itemSelectedFunc}
                    />
                    <p className="text-red-500 text-sm italic font-semibold mb-5">
                      {submit && Object.keys(type).length === 0 && 'This Field is required'}
                    </p>
                  </div>
                  <FormInput
                    register={register}
                    errors={errors}
                    defaultValue={unit?.area}
                    label="area"
                    labelTxt="Area*"
                    type="text"
                    onKeyPress={preventShowLetter}
                  />
                </div>
                <div>
                  <div className="mb-5">
                    <label className="control-label block text-primaryLight text-sm font-semibold mb-1 transition ease-in duration-300">
                      Directions*
                    </label>
                    <DropdownMenu
                      order="first"
                      id="direction"
                      name={unit.direction ? unit.direction : 'direction'}
                      defaultValue={unit.direction}
                      dropdownWidth="w-full"
                      options={directionsOptions}
                      itemSelectedFunc={itemSelectedFunc}
                    />
                    <p className="text-red-500 text-sm italic font-semibold mb-5">
                      {submit && direction === '' && 'This Field is required'}
                    </p>
                  </div>
                  <FormInput
                    register={register}
                    errors={errors}
                    defaultValue={unit?.floor_number}
                    label="floor_number"
                    labelTxt="Floor Number*"
                    type="text"
                    onKeyPress={preventShowLetter}
                  />
                </div>
              </div>

              <div className="grid gap-row-10 md:grid-cols-3 md:gap-10">
                <FormInput
                  register={register}
                  errors={errors}
                  defaultValue={unit?.bathrooms}
                  label="bathrooms"
                  labelTxt="Number of bathrooms*"
                  type="text"
                  onKeyPress={preventShowLetter}
                />
                <FormInput
                  register={register}
                  errors={errors}
                  defaultValue={unit?.bedrooms}
                  label="bedrooms"
                  labelTxt="Number of bedrooms*"
                  type="text"
                  onKeyPress={preventShowLetter}
                />
                <FormInput
                  register={register}
                  errors={errors}
                  defaultValue={unit?.reception}
                  label="reception"
                  labelTxt="Number of Receptions*"
                  type="text"
                  onKeyPress={preventShowLetter}
                />
              </div>

              <div>
                <label className="control-label block text-primaryLight text-sm font-semibold mb-1 mt-5 transition ease-in duration-300">
                  Unit Images*
                </label>
                <Dropzone
                  accept="image/*"
                  inputContent="Drop images here or click to upload."
                  LayoutComponent={Layout}
                  getUploadParams={getUploadParams}
                  onChangeStatus={handleChangeUnitImgs}
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
                  {!uid &&
                    submit &&
                    uploadUnitImgs.length === 0 &&
                    'Insert at least one image please'}
                </p>
              </div>

              <div className="border-t-2 border-gray-200 pt-3 mt-10 w-full">
                <button
                  className="float-right py-3 px-12 bg-primary text-gray-400 text-xs font-semibold rounded-lg hover:text-white focus:outline-none"
                  type="submit"
                  onClick={() => setSubmit(true)}>
                  Save
                </button>
                <button
                  className="float-right py-3 px-12 mr-5 text-primary border border-primary text-xs font-semibold rounded-lg hover:bg-gray-100 focus:outline-none"
                  type="button"
                  onClick={() => Router.push('/projects/[pid]/units', `/projects/${pid}/units`)}>
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
