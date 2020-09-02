import { theme } from '../../tailwind.config'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import { useDispatch, connect } from 'react-redux'
import Loading from '../../components/core/loading'
import Overlay from './../../components/features/overlay'
import PlanDetails from '../../components/popup/planDetails'
import DeleteObj from '../../components/popup/deleteObj'
import { GetPlans, DeletePlan } from './../../redux/actions/plansActions'
import Pagination from '../../components/features/pagination'

function Plans({ plans }) {
  const [rowId, setRowId] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [isOverlay, setIsOverlay] = useState(false)
  const [isDeleteOverlay, setIsDeleteOverlay] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [plan, setPlan] = useState()
  const dispatch = useDispatch()

  const onDeletingItem = () => {
    dispatch(DeletePlan(plan.id))
  }

  const setPageItem = (offset, limit) => {
    dispatch(GetPlans(offset, limit))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    dispatch(GetPlans())
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div
          className="container-fluid my-16"
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen(false)
            setIsOverlay(false)
            setIsDeleteOverlay(false)
          }}>
          <Overlay opacity={isOverlay} />
          <Overlay opacity={isDeleteOverlay} />

          {isOverlay && <PlanDetails plan={plan} />}
          {isDeleteOverlay && <DeleteObj name={plan.name} onDeletingItem={onDeletingItem} />}

          <div className="flex justify-between mb-5">
            <h2 className="text-black font-bold text-lg">Plans</h2>
            <button
              className="py-3 px-5 bg-primary text-gray-400 text-xs font-semibold rounded-full hover:text-white focus:outline-none"
              onClick={() => Router.push('/plans/add')}>
              <i className="fas fa-plus-circle fa-lg text-white mr-5"></i>
              Add Plan
            </button>
          </div>
          <div className="bg-white p-5 rounded-lg">
            {plans?.results.length === 0 ? (
              <div className="text-primary text-4xl text-center mx-auto my-10">
                You don't have any Plans yet
              </div>
            ) : (
              <table className="table-auto w-full">
                <thead className="text-primaryText text-left font-bold">
                  <tr>
                    <th className="p-5 pt-0 w-4/12">Name</th>
                    <th className="p-5 pt-0 w-1/2">Description</th>
                    <th className="p-5 pt-0 w-1/6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-secondary">
                  {plans?.results.map((plan) => (
                    <tr
                      key={plan.id}
                      className="transition duration-300 ease-in-out border-l-4 border-transparent hover:bg-secondaryLightest hover:border-secondaryLight"
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsOverlay(true)
                        setIsDeleteOverlay(false)
                        setPlan(plan)
                      }}>
                      <td className="p-5">{plan.name}</td>
                      <td className="p-5">
                        <p className="desc w-11/12 h-6 overflow-hidden lg:whitespace-no-wrap">
                          {plan.description ? plan.description : 'No Description'}
                        </p>
                      </td>
                      <td className="relative p-5 text-right">
                        <i
                          className="fas fa-ellipsis-v text-primaryLight pl-5 pr-2 cursor-pointer hover:text-primary"
                          onClick={(e) => {
                            e.stopPropagation()
                            setIsOpen(!isOpen)
                            setRowId(plan.id)
                          }}></i>
                        {isOpen && rowId === plan.id && (
                          <div className="absolute right-0 z-10 bg-white text-primaryLight text-left mr-5 w-9/12 border border-gray-200 rounded-lg shadow-md">
                            <p
                              className="py-3 px-5 cursor-pointer hover:bg-gray-100 hover:text-primary hover:font-semibold"
                              onClick={(e) => {
                                e.stopPropagation()
                                Router.push('/plans/[pid]', `/plans/${plan.id}`)
                              }}>
                              <i className="fas fa-pen mr-5"></i>
                              Edit
                            </p>
                            <p
                              className="py-3 px-5 cursor-pointer hover:bg-gray-100 hover:text-primary hover:font-semibold"
                              onClick={(e) => {
                                e.stopPropagation()
                                setPlan(plan)
                                setIsDeleteOverlay(true)
                                setIsOverlay(false)
                              }}>
                              <i className="fas fa-trash mr-5"></i>
                              Delete
                            </p>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <Pagination count={plans?.count} limit={10} setPageItem={setPageItem} />
        </div>
      )}
      <style jsx>{`
        tr:nth-child(even) {
          background-color: #eee;
        }
        tr:nth-child(even):hover {
          background-color: ${theme.extend.colors.secondaryLightest};
        }
        .desc {
          text-overflow: ellipsis;
        }
      `}</style>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  plans: state.plans.data,
})

export default connect(mapStateToProps)(Plans)
