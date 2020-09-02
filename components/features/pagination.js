import { useState } from 'react'
import ReactPaginate from 'react-paginate'

export default function Pagination({ count, limit, setPageItem }) {
  const [activeNo, setActiveNo] = useState(1)
  const pagesNo = Math.ceil(count / limit)

  const onPageChange = (e) => {
    setPageItem(limit, e.selected)
    setActiveNo(e.selected + 1)
  }

  return (
    <div>
      {pagesNo > 1 && (
        <ReactPaginate
          initialPage={0}
          pageCount={pagesNo}
          pageRangeDisplayed={3}
          onPageChange={(e) => onPageChange(e)}
          containerClassName="flex justify-center mt-10"
          activeClassName="border-primaryText bg-primaryText text-white"
          pageClassName="mr-4 py-1 rounded-full cursor-pointer border hover:border-primaryText"
          previousClassName="mr-4 px-3 py-1 rounded-full text-primaryText bg-gray-100 border"
          nextClassName="mr-4 px-3 py-1 rounded-full text-primaryText bg-gray-100 border"
          breakClassName="mr-4 px-3 py-1 text-primaryText cursor-text"
          pageLinkClassName="p-3 focus:outline-none"
          breakLinkClassName="focus:outline-none"
          previousLinkClassName={`focus:outline-none ${
            activeNo === 1 ? 'text-primary cursor-text opacity-50' : ''
          }`}
          nextLinkClassName={`focus:outline-none ${
            activeNo === pagesNo ? 'text-primary cursor-text opacity-50' : ''
          }`}
        />
      )}
    </div>
  )
}
