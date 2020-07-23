export default function PlanCard() {
  return (
    <div>
      <p className="font-semibold mb-2 mt-5">Default Plan</p>
      <div className="flex justify-start flex-wrap bg-white text-black p-10 pt-8 rounded-lg shadow-lg">
        <div className="mr-20">
          <p className="text-lg font-bold mt-3 mb-2">First installment</p>
          <span className="inline-block font-semibold">0</span>
        </div>
        <div className="mr-20">
          <p className="text-lg font-bold mt-3 mb-2">Second installment</p>
          <span className="inline-block font-semibold">100,000</span>
        </div>
        <div className="mr-20">
          <p className="text-lg font-bold mt-3 mb-2">Third installment</p>
          <span className="inline-block font-semibold">10,000</span>
        </div>
        <div className="mr-20">
          <p className="text-lg font-bold mt-3 mb-2">Forth installment</p>
          <span className="inline-block font-semibold">50,000,00</span>
        </div>
        <div className="mr-20">
          <p className="text-lg font-bold mt-3 mb-2">Fifth installment</p>
          <span className="inline-block font-semibold">100,000</span>
        </div>
      </div>
    </div>
  )
}
