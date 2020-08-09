import { useState, useEffect } from 'react'
import Router from 'next/router'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import API from '../../api'
import Loading from '../core/loading'
import FormInput from './formInput'
import Overlay from './../features/overlay'
import DeletePlan from '../popup/deletePlan'
import { AddPlan, PatchPlan } from '../../redux/actions/plansActions'

export default function PlanData({ pid }) {
  const [isDeleteOverlay, setIsDeleteOverlay] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [plan, setPlan] = useState({})
  const [addNew, setAddNew] = useState([])
  const dispatch = useDispatch()

  const { register, errors, handleSubmit } = useForm({
    mode: 'onBlur',
  })

  const preventShowLetter = (e) => {
    const char = String.fromCharCode(e.which)
    if (!/[0-9]/.test(char)) {
      e.preventDefault()
    }
  }

  const onSubmit = (data) => {
    const installments = [{ name: data.instName, percentage: data.percentage }]

    for (let i = 0; i < Object.keys(data).length; i++) {
      if (data[`installmentName${i}`]) {
        let element = {
          name: data[`installmentName${i}`],
          percentage: data[`installmentPercentage${i}`],
        }
        installments.push(element)
      }
    }

    const result = {
      name: data.name,
      description: data.description,
      installments: installments,
    }
    pid ? dispatch(PatchPlan(pid, result)) : dispatch(AddPlan(result))
  }

  useEffect(() => {
    if (pid) {
      async function fetchPlan() {
        await API.get(`plans/${pid}/`).then((res) => {
          setPlan(res.data)
          setIsLoading(false)
        })
      }
      fetchPlan()
    } else {
      const plan = {
        name: '',
        description: '',
        installments: [
          {
            name: '',
            percentage: '',
          },
        ],
      }
      setPlan(plan)
    }
  }, [pid])

  return (
    <div>
      {isLoading && pid ? (
        <Loading />
      ) : (
        <div
          className="container-fluid my-16"
          onClick={(e) => {
            e.stopPropagation()
            setIsDeleteOverlay(false)
          }}>
          <Overlay opacity={isDeleteOverlay} />
          {isDeleteOverlay && <DeletePlan plan={plan} />}

          <div className="flex justify-between">
            <h2 className="text-black font-bold text-lg mb-5">{pid ? 'Edit' : 'Add'} Plan</h2>
            {pid && (
              <button
                className="py-2 px-10 text-danger text-sm border border-danger font-semibold rounded-lg mb-5 transition duration-500 ease-in-out hover:bg-danger hover:text-white focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation()
                  setPlan(plan)
                  setIsDeleteOverlay(true)
                }}>
                Delete
              </button>
            )}
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg clearfix">
            <p className="text-black font-bold mb-5">Basic Info</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <FormInput
                    register={register}
                    errors={errors}
                    defaultValue={plan.name}
                    label="name"
                    labelTxt="Plan Title"
                    errorMsg="Title is required"
                    type="text"
                    placeholder="Enter Plan Title"
                  />
                  <FormInput
                    register={register}
                    errors={errors}
                    defaultValue={plan.description}
                    label="description"
                    labelTxt="Description"
                    controlType="textarea"
                    req={false}
                  />
                </div>
              </div>

              <p className="twext-black font-bold mb-5">Installments</p>
              {plan.installments?.map((installment, i) =>
                i === 0 ? (
                  <div className="mb-5 grid sm:grid-cols-2 col-gap-10 sm:mb-0" key={i}>
                    <FormInput
                      register={register}
                      errors={errors}
                      defaultValue={installment.name}
                      label="instName"
                      labelTxt="Installment Name"
                      errorMsg="Enter less than one Installment"
                      type="text"
                    />
                    <FormInput
                      register={register}
                      errors={errors}
                      defaultValue={installment.percentage}
                      label="percentage"
                      labelTxt="Installment Percentage"
                      errorMsg="Enter Percentage"
                      type="text"
                      onKeyPress={preventShowLetter}
                    />
                  </div>
                ) : (
                  <div className="mb-5 grid sm:grid-cols-2 col-gap-10 sm:mb-0" key={i}>
                    <FormInput
                      register={register}
                      errors={errors}
                      defaultValue={installment.name}
                      label={`installmentName${i}`}
                      labelTxt="Installment Name"
                      type="text"
                      req={false}
                    />
                    <FormInput
                      register={register}
                      errors={errors}
                      defaultValue={installment.percentage}
                      label={`installmentPercentage${i}`}
                      labelTxt="Installment Percentage"
                      type="text"
                      onKeyPress={preventShowLetter}
                      req={false}
                    />
                  </div>
                )
              )}
              {addNew.map((Number, i) => (
                <div className="mb-5 grid sm:grid-cols-2 col-gap-10 sm:mb-0" key={i}>
                  <FormInput
                    register={register}
                    errors={errors}
                    label={`installmentName${i}`}
                    labelTxt="Installment Name"
                    type="text"
                    req={false}
                  />
                  <FormInput
                    register={register}
                    errors={errors}
                    label={`installmentPercentage${i}`}
                    labelTxt="Installment Percentage"
                    type="text"
                    req={false}
                    onKeyUp={preventShowLetter}
                  />
                </div>
              ))}
              <button
                className="py-2 px-3 text-secondaryLight text-xs font-semibold border border-secondaryLight rounded-lg transition duration-500 ease-in-out hover:bg-secondaryLight hover:text-white focus:outline-none"
                type="button"
                onClick={() => setAddNew((old) => [...old, true])}>
                <i className="fas fa-plus-circle fa-lg mr-2"></i>
                Add new Installment
              </button>
              <div className="border-t-2 border-gray-200 pt-3 mt-10 w-full">
                <button
                  className="float-right py-3 px-12 bg-primary text-gray-400 text-xs font-semibold rounded-lg hover:text-white focus:outline-none"
                  type="submit">
                  Save
                </button>
                <button
                  className="float-right py-3 px-12 mr-5 text-primary border border-primary text-xs font-semibold rounded-lg hover:bg-gray-100 focus:outline-none"
                  onClick={() => Router.push('/plans')}>
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
