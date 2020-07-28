export default function PlanCard({ plan, index }) {
  return (
    <div>
      <p className="font-semibold mb-2 mt-5">
        {index + 1 + ')'} {plan.name}
      </p>
      <p className="text-primary italic mb-4 mt-2 ml-3">{plan.description}</p>
      <p className="text-primaryLight font-semibold mb-2 mt-3">Installments</p>
      <div className="flex justify-start flex-wrap bg-white text-black p-10 pt-8 rounded-lg shadow-lg">
        {plan.installments.map((installment, index) => (
          <div className="w-2/12" key={installment.id}>
            <p className="text-lg font-bold mt-3 mb-2">
              {index + 1}- {installment.name}
            </p>
            <span className="inline-block font-semibold">{installment.amount}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
