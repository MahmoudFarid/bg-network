import Link from 'next/link'

export default function UnitCard({ pid }) {
  return (
    <div className="bg-white border-none shadow-md rounded-lg overflow-hidden transition duration-300 ease-in-out hover:shadow-2xl">
      <div className="relative h-48">
        <img src="/assets/unit.jpg" alt="unit" className="h-full w-full" />
        <p className="price absolute bottom-0 py-1 px-2 mb-3 ml-5 text-sm text-center rounded-md bg-white text-secondaryLight">
          $320,000.00
        </p>
      </div>
      <div className="pt-5 pl-5 w-11/12">
        <p className="text-primaryLight text-xs tracking-wide font-semibold mb-4 mt-1">
          Nasr City Compounds, Degla Landmark
        </p>
        <Link
          href={{
            pathname: '/units/[uid]',
            query: { pid: pid, uid: 3 },
          }}
          as="/units/3">
          <a className="text-black text-lg text-left font-semibold my-3 hover:text-primaryText focus:outline-none">
            Degla Landmark Complex Nasr City Compounds
          </a>
        </Link>
      </div>
      <div className="py-5 pl-5">
        <div className="flex justify-start">
          <div className="details mr-3">
            <img src="/assets/units/m2.jpg" alt="m2" className="block w-4 mx-auto" />
            <span>
              135 M<sup>2</sup>
            </span>
          </div>
          <div className="details mr-3">
            <img src="/assets/units/bedroom.jpg" alt="bedroom" className="block w-4 mx-auto" />
            <span>2 Bedrooms</span>
          </div>
          <div className="details mr-3 mt-1">
            <img src="/assets/units/bathroom.jpg" alt="bathroom" className="block w-4 mx-auto" />
            <span>2 Baths</span>
          </div>
          <div className="details mr-3">
            <img
              src="/assets/units/appartment.jpg"
              alt="appartment"
              className="block w-4 mx-auto"
            />
            <span>Appartment</span>
          </div>
        </div>
      </div>
      <style jsx>{`
        .details span {
          font-size: 0.6rem;
        }
        .price {
          min-width: 33.333%;
        }
      `}</style>
    </div>
  )
}
