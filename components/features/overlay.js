export default function Overlay({ opacity }) {
  return (
    <div className="modal z-20 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div
        className={`modal-overlay absolute w-full h-full bg-black ${
          opacity ? 'opacity-75' : 'opacity-0'
        }`}></div>
    </div>
  )
}
