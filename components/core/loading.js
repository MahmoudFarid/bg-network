export default function Loading() {
  return (
    <div className="w-16 h-16 relative mt-64 mx-auto">
      <div className="load w-full h-full rounded-full bg-primary opacity-50 absolute top-0 right-0"></div>
      <div className="load load2 w-full h-full rounded-full bg-primary opacity-50 absolute top-0 right-0"></div>

      <style jsx>{`
        .load {
          -webkit-animation: sk-bounce 2s infinite ease-in-out;
          animation: sk-bounce 2s infinite ease-in-out;
        }
        .load2 {
          -webkit-animation-delay: -1s;
          animation-delay: -1s;
        }
        @-webkit-keyframes sk-bounce {
          0%,
          100% {
            -webkit-transform: scale(0);
          }
          50% {
            -webkit-transform: scale(1);
          }
        }

        @keyframes sk-bounce {
          0%,
          100% {
            transform: scale(0);
            -webkit-transform: scale(0);
          }
          50% {
            transform: scale(1);
            -webkit-transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}
