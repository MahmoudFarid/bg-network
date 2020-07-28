import { useState } from 'react'
import Overlay from './overlay'
import CarouselOverlay from './carouselOverlay'

export default function Carousel({ sources, isOverlay, setIsOverlayFunc }) {
  const [index, setIndex] = useState(0)

  const nextImg = (e) => {
    e.stopPropagation()
    if (index < sources.length - 1) setIndex(index + 1)
    else setIndex(0)
  }

  const previousImg = (e) => {
    e.stopPropagation()
    if (index === 0) setIndex(sources.length - 1)
    else setIndex(index - 1)
  }

  const imgClicked = (e) => {
    e.stopPropagation()
    setIsOverlayFunc(true)
  }

  return (
    <div className="h-full">
      {isOverlay && (
        <div>
          <CarouselOverlay sources={sources} setIsOverlayFunc={setIsOverlayFunc} />
          <Overlay opacity={isOverlay} />
        </div>
      )}

      <div className="relative h-full" onClick={imgClicked}>
        <div className="absolute top-0 bg-overlay h-full w-full opacity-25 rounded-lg"></div>
        <div className="absolute top-0 bg-white m-3 px-1 rounded-sm">
          {index + 1} / {sources.length}
        </div>
        <div>
          <i
            className="rightArrow absolute fas fa-angle-right fa-5x text-white cursor-pointer"
            onClick={nextImg}></i>
          <i
            className="leftArrow absolute fas fa-angle-left fa-5x text-white cursor-pointer"
            onClick={previousImg}></i>
        </div>
        <img src={sources[index].image} alt="project image" className="w-full h-full rounded-md" />
      </div>

      <style jsx>{`
        .rightArrow {
          top: 40%;
          right: 5%;
        }
        .leftArrow {
          top: 40%;
          left: 5%;
        }
      `}</style>
    </div>
  )
}
