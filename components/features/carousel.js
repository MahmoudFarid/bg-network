import { useState, useEffect, useCallback } from 'react'
import Overlay from './overlay'
import CarouselOverlay from './carouselOverlay'

export default function Carousel({ sources, isOverlay, setIsOverlayFunc }) {
  const [index, setIndex] = useState(0)
  const [clickOnImg, setClicked] = useState(false)

  const nextImg = (e) => {
    e.stopPropagation()
    setClicked(true)
    setTimeout(() => {
      if (index < sources.length - 1) setIndex(index + 1)
      else setIndex(0)
      setClicked(false)
    }, 300)
  }

  const previousImg = (e) => {
    e.stopPropagation()
    setClicked(true)
    setTimeout(() => {
      if (index === 0) setIndex(sources.length - 1)
      else setIndex(index - 1)
      setClicked(false)
    }, 300)
  }

  const imgClicked = (e) => {
    e.stopPropagation()
    setIsOverlayFunc(true)
  }

  const escFunction = useCallback((e) => {
    // Escape
    if (e.keyCode === 27) {
      setIsOverlayFunc(false)
    }
    // // Right
    // if (e.keyCode === 39) {
    //   nextImg()
    // }
    // // Left
    // if (e.keyCode === 37) {
    //   previousImg()
    // }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false)

    return () => {
      document.removeEventListener('keydown', escFunction, false)
    }
  }, [])

  return (
    <div className="h-full">
      {isOverlay && (
        <div>
          <CarouselOverlay sources={sources} setIsOverlayFunc={setIsOverlayFunc} />
          <Overlay opacity={isOverlay} />
        </div>
      )}

      <div className="relative h-full cursor-pointer" onClick={imgClicked}>
        <div className="absolute top-0 bg-overlay h-full w-full opacity-25 rounded-lg"></div>
        <div
          className="absolute top-0 bg-white m-3 px-1 rounded-sm z-40 cursor-text"
          onClick={(e) => e.stopPropagation()}>
          {index + 1} / {sources.length}
        </div>
        {sources.length > 1 && (
          <div>
            <i
              className="rightArrow absolute z-40 fas fa-angle-right fa-5x text-white cursor-pointer"
              onClick={nextImg}></i>
            <i
              className="leftArrow absolute z-40 fas fa-angle-left fa-5x text-white cursor-pointer"
              onClick={previousImg}></i>
          </div>
        )}
        <img
          src={sources[index].image}
          alt="project image"
          className={`w-full h-full rounded-md ${
            clickOnImg && 'animate__animated animate__fadeOut animate__faster'
          }
          ${!clickOnImg && 'animate__animated animate__fadeIn animate__faster'}`}
        />
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
