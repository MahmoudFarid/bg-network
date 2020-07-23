import Carousel from './carousel'
import Carousel2 from './carousel2'

export default function CarouselOverlay({
  sources,
  sources2,
  setIsOverlayFunc,
  setIsOverlayFunc2,
  order,
}) {
  return (
    <div className="carousel fixed z-50 shadow-lg">
      {order == 2 ? (
        <Carousel sources={sources2} setIsOverlayFunc={setIsOverlayFunc2} />
      ) : (
        <Carousel sources={sources} setIsOverlayFunc={setIsOverlayFunc} />
      )}

      <style jsx>{`
        .carousel {
          height: 30rem;
          width: 50rem;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </div>
  )
}
