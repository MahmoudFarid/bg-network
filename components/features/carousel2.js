import { useState } from 'react'
import Overlay from './overlay'
import CarouselOverlay from './carouselOverlay'

export default function Carousel2({ sources2, isOverlay2, setIsOverlayFunc2, order }) {
  const [index, setIndex] = useState(0)
  const [clickOnImg, setClicked] = useState(false)

  const nextImg = (e) => {
    e.stopPropagation()
    setClicked(true)
    setTimeout(() => {
      if (index < sources2.length - 1) setIndex(index + 1)
      else setIndex(0)
      setClicked(false)
    }, 300)
  }

  const previousImg = (e) => {
    e.stopPropagation()
    setClicked(true)
    setTimeout(() => {
      if (index === 0) setIndex(sources2.length - 1)
      else setIndex(index - 1)
      setClicked(false)
    }, 300)
  }

  const imgClicked = (e) => {
    e.stopPropagation()
    setIsOverlayFunc2(true)
  }

  return (
    <div className="h-full">
      <Overlay opacity={isOverlay2} />
      {isOverlay2 && (
        <CarouselOverlay sources2={sources2} setIsOverlayFunc2={setIsOverlayFunc2} order={order} />
      )}

      <div className="relative h-full cursor-pointer" onClick={imgClicked}>
        <div className="absolute top-0 bg-overlay h-full w-full opacity-25 rounded-lg"></div>
        <div
          className="absolute top-0 bg-white m-3 px-1 rounded-sm cursor-text z-40"
          onClick={(e) => e.stopPropagation()}>
          {index + 1} / {sources2.length}
        </div>
        {sources2.length > 1 && (
          <div className="absolute top-0 right-0 z-40 border border-white m-3">
            <i
              className="fas fa-angle-left px-4 border-r border-white fa-lg text-white cursor-pointer"
              onClick={previousImg}></i>
            <i
              className="fas fa-angle-right px-4 fa-lg text-white cursor-pointer"
              onClick={nextImg}></i>
          </div>
        )}
        <img
          src={sources2[index].image}
          alt="project image"
          className={`w-full h-full rounded-md ${
            clickOnImg && 'animate__animated animate__fadeOut animate__faster'
          }
          ${!clickOnImg && 'animate__animated animate__fadeIn animate__faster'}`}
        />
      </div>
    </div>
  )
}
