import { useState } from 'react'
import PlanData from '../../components/forms/planData'
import UnitData from './../../components/forms/unitData'
import ProjectData from './../../components/forms/projectData'
import InviteMembersForm from './../../components/forms/InviteMembers'

export default function Setup({ step }) {
  const [st, setStep] = useState(0)

  const onStepSubmit = (data) => {
    setStep(step + 1)
    console.log('onSubmit -> step', step)
    console.log(data)
  }

  let StepComponent = InviteMembersForm

  switch (step) {
    case 1: {
      StepComponent = PlanData
      break
    }
    case 2: {
      StepComponent = ProjectData
      break
    }
    case 3: {
      StepComponent = UnitData
      break
    }
    default: {
      break
    }
  }

  return (
    <div className="container my-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4 sm:grid-cols-1">
        <div className="menu col-span-1 p-4 bg-white hidden sm:hidden md:block lg:block xl:block">
          <h2 className="text-primaryText text-lg font-semibold">Quick Setup</h2>
          <div className="flex items-center mt-5 text-sm">
            <div
              className={`rounded-full border-solid h-8 w-8 border text-center py-1 mr-3 ${
                step >= 1 ? 'bg-primaryGradient text-white' : 'border-gray-600'
              } `}>
              {step >= 1 ? <i className="fas fa-check fa-white"></i> : <div>1</div>}
            </div>
            <div className={!step ? 'font-bold' : step >= 1 ? 'font-bold text-primaryText' : ''}>
              Add Team Member
            </div>
          </div>

          <div className="flex items-center mt-5 text-sm">
            <div
              className={`rounded-full border-solid h-8 w-8 border text-center py-1 mr-3 ${
                step >= 2 ? 'bg-primaryGradient text-white' : 'border-gray-600'
              } `}>
              {step >= 2 ? <i className="fas fa-check fa-white"></i> : <div>2</div>}
            </div>
            <div
              className={step === 1 ? 'font-bold' : step >= 2 ? 'font-bold text-primaryText' : ''}>
              Add Plan
            </div>
          </div>

          <div className="flex items-center mt-5 text-sm">
            <div
              className={`rounded-full border-solid h-8 w-8 border text-center py-1 mr-3 ${
                step >= 3 ? 'bg-primaryGradient text-white' : 'border-gray-600'
              } `}>
              {step >= 3 ? <i className="fas fa-check fa-white"></i> : <div>3</div>}
            </div>
            <div
              className={step === 2 ? 'font-bold' : step >= 3 ? 'font-bold text-primaryText' : ''}>
              Add Project
            </div>
          </div>

          <div className="flex items-center mt-5 text-sm">
            <div
              className={`rounded-full border-solid h-8 w-8 border text-center py-1 mr-3 ${
                step >= 4 ? 'bg-primaryGradient text-white' : 'border-gray-600'
              } `}>
              {step >= 4 ? <i className="fas fa-check fa-white"></i> : <div>4</div>}
            </div>
            <div
              className={step === 3 ? 'font-bold' : step >= 4 ? 'font-bold text-primaryText' : ''}>
              Add Unit
            </div>
          </div>
        </div>
        <div className="col-span-1 sm:col-span-1 md:col-span-3">
          <StepComponent onStepSubmit={onStepSubmit} isSetup={true} />
        </div>
      </div>
      <style jsx>{`
        .menu {
          height: 17rem;
        }
      `}</style>
    </div>
  )
}
