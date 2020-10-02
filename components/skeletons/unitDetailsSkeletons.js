import Skeleton from 'react-loading-skeleton'

export default function UnitDetailsSkeleton() {
  return (
    <div className="container my-16">
      <div className="relative flex justify-between flex-wrap">
        <div className="w-full mt-5 lg:w-5/12">
          <Skeleton width={`25%`} />
          <p className="desc w-11/12 my-4">
            <Skeleton height={`100%`} />
          </p>
        </div>
        <div className="imgs w-full lg:w-7/12">
          <Skeleton height={`100%`} />
        </div>
        <div className="price absolute bottom-0 bg-white py-2 px-4 ml-0 border-b-2 border-gray-200">
          <div className="inline-block font-bold mr-20">
            <Skeleton height={20} width={100} />
          </div>
          <div className="inline-block font-bold">
            <Skeleton height={20} width={100} />
          </div>
        </div>
      </div>

      <div className="overflow-hidden mb-5">
        <div className="float-right flex flex-row-reverse flex-wrap w-full bg-white text-center lg:w-3/4 lg:flex-no-wrap">
          {Array(8)
            .fill()
            .map((item, i) => (
              <div className="w-3/12 py-2 border-r-2 border-gray-200" key={i}>
                <Skeleton
                  circle={true}
                  height={30}
                  width={30}
                  style={{ margin: '0 auto', display: 'block', marginBottom: 10 }}
                />
                <Skeleton width={`60%`} style={{ display: 'block', margin: '0 auto' }} />
              </div>
            ))}
        </div>
      </div>
      <div className="mb-8">
        <div className="p-3">
          <Skeleton count={4} style={{ marginBottom: 10 }} width={`70%`} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-0 mb-10 lg:grid-cols-2 lg:gap-10 xl:gap-24">
        <div>
          <div className="project relative bg-white p-5 rounded-lg shadow-lg h-full">
            <Skeleton height={`100%`} />
          </div>
        </div>
        <div>
          <div className="project bg-white p-5 rounded-lg shadow-lg">
            <Skeleton height={`100%`} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-0 bg-white p-5 rounded-lg shadow-lg lg:grid-cols-3 lg:gap-20">
        <p className="text-lg self-center mb-5">
          <Skeleton count={4} style={{ marginBottom: 10 }} width={`70%`} />
        </p>
        <div className="col-span-2">
          <Skeleton height={`100%`} />
        </div>
      </div>

      <style jsx>
        {`
          .project {
            height: 33rem;
          }
          .imgs {
            height: 32rem;
          }
          .installment {
            min-width: 20%;
          }
          .msg {
            top: 45%;
            left: 50%;
            transform: translate(-50%);
          }
          .price {
            margin-left: 25%;
            min-width: 33%;
          }
          .desc {
            height: 66%;
          }
        `}
      </style>
    </div>
  )
}
