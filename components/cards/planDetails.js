export default function PlanDetails({ plan }) {
  return (
    <div className="details bg-white overflow-auto fixed z-50 w-7/12 p-10 pb-0 shadow-lg rounded-lg">
      <div className="flex justify-start mb-10">
        <h2 className="text-primaryText font-bold text-lg w-1/4">Name</h2>
        <p className="text-secondary text-center text-lg font-bold w-8/12">{plan.name}</p>
      </div>
      <div className="flex justify-start mb-10">
        <h2 className="text-primaryText font-bold text-lg w-1/4">Description</h2>
        <p className="text-primary font-semibold italic w-8/12">{plan.description}</p>
      </div>
      <div className="flex justify-start mb-10">
        <h2 className="text-primaryText font-bold text-lg w-1/3">Installments</h2>
        <p className="font-semibold w-full">
          {plan.installments.map((installment, index) => (
            <div key={installment.id} className="flex justify-between mb-5">
              <p className="text-lg text-secondary font-semibold">
                {index + 1}- {installment.name}
              </p>
              <span className="text-secondary font-semibold w-1/3">{installment.amount}</span>
            </div>
          ))}
        </p>
      </div>
      <style jsx>{`
        .details {
          height: 40rem;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </div>
  )
}
