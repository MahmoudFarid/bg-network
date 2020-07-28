import Link from 'next/link'
import NumberFormat from 'react-number-format'

export default function UnitCard({ unit, pid }) {
  return (
    <div className="bg-white border-none shadow-md rounded-lg overflow-hidden transition duration-300 ease-in-out hover:shadow-2xl">
      <div className="relative h-48">
        <img src={unit.images[0].image} alt="unit" className="h-full w-full" />
        <p className="price absolute bottom-0 py-1 px-2 mb-3 ml-5 text-sm text-center rounded-md bg-white text-secondaryLight">
          <NumberFormat value={unit.cost} displayType={'text'} thousandSeparator={true} />
          &nbsp; LE
        </p>
      </div>
      <div className="pt-5 pl-5 w-11/12">
        <p className="text-primaryLight text-xs tracking-wide font-semibold mb-4 mt-1">
          Nasr City Compounds, Degla Landmark
        </p>
        <Link
          href={{
            pathname: '/projects/[pid]/units/[uid]',
            query: { pid: pid, uid: unit.id },
          }}
          as={`/projects/${pid}/units/${unit.id}`}>
          <a className="text-black text-lg text-left font-semibold my-3 hover:text-primaryText focus:outline-none">
            {unit.name}
          </a>
        </Link>
      </div>
      <div className="py-5 pl-5">
        <div className="flex justify-start">
          {unit.area && (
            <div className="details mr-3">
              <img src="/assets/units/m2.jpg" alt="m2" className="block w-4 mx-auto" />
              <span>
                {unit.area} M<sup>2</sup>
              </span>
            </div>
          )}
          {unit.bedrooms && (
            <div className="details mr-3">
              <img src="/assets/units/bedroom.jpg" alt="bedroom" className="block w-4 mx-auto" />
              <span>{unit.bedrooms} Bedrooms</span>
            </div>
          )}
          {unit.bathrooms && (
            <div className="details mr-3 mt-1">
              <img src="/assets/units/bathroom.jpg" alt="bathroom" className="block w-4 mx-auto" />
              <span>{unit.bathrooms} Baths</span>
            </div>
          )}
          <div className="details mr-3">
            <img
              src="/assets/units/appartment.jpg"
              alt="appartment"
              className="block w-4 mx-auto"
            />
            <span>{unit.type.name}</span>
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
