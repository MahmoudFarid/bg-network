import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export default function ProfileSideBarSkeleton({ isBroker, cid, isProject }) {
  return (
    <div className="profile col-span-2 bg-bgLight py-12 pt-24">
      <SkeletonTheme color="#ccc">
        <div>
          <Skeleton
            circle={true}
            height={170}
            width={170}
            style={{ margin: '0 auto', display: 'block', marginBottom: 10 }}
          />
          <div className="text-center mt-5">
            <Skeleton count={2} width={150} style={{ display: 'block', margin: '0 auto 10px' }} />
          </div>
          {cid != 0 && isBroker == 'true' && (
            <div className="w-3/4 mx-auto mt-5 text-center">
              <div className="flex justify-around">
                <Skeleton width={100} style={{ padding: 5, borderRadius: 20 }} />
                <Skeleton width={100} style={{ padding: 5, borderRadius: 20 }} />
              </div>
            </div>
          )}
          <div className="w-full text-center">
            {cid != 0 && isBroker != 'true' && !isProject && (
              <Skeleton width={100} style={{ padding: 5, borderRadius: 20 }} />
            )}
            {cid != 0 && (
              <button
                className={`py-3 mt-3 w-1/3 mx-auto text-xs font-semibold rounded-full focus:outline-none ${
                  cid != 0 && isBroker != 'true' && !isProject ? 'inline-block ml-5' : 'block'
                }`}>
                <Skeleton width={140} style={{ padding: 15, borderRadius: 20 }} />
              </button>
            )}
          </div>
          {isProject && (
            <div className="w-3/4 mx-auto mt-5 text-center">
              <div className="flex justify-around mb-5">
                <Skeleton width={100} height={40} style={{ padding: 5, borderRadius: 20 }} />
                <Skeleton width={100} height={40} style={{ padding: 5, borderRadius: 20 }} />
              </div>
              <div className="flex justify-around">
                <Skeleton width={100} height={40} style={{ padding: 5, borderRadius: 20 }} />
                <Skeleton width={100} height={40} style={{ padding: 5, borderRadius: 20 }} />
              </div>
            </div>
          )}
          {!isProject && (
            <div className="mt-10 px-8 h-56 overflow-auto lg:overflow-visible">
              <p className="font-semibold ml-2 mb-2">About</p>
              <p className="text-primary mb-4">
                <Skeleton width={`90%`} count={4} />
              </p>
            </div>
          )}
        </div>

        <style>
          {`
        .profile {
          width: 91%;
          min-height: 88vh;
        }
        `}
        </style>
      </SkeletonTheme>
    </div>
  )
}
