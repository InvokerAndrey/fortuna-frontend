import React from 'react'

import { useDispatch } from 'react-redux'

import ReactPaginate from 'react-paginate'


export default ({page, num_pages, callback}) => {

    const dispatch = useDispatch()

    let params = {
        page: page
    }

    const paginateHandler = data => {
        params.page = data.selected + 1
        dispatch(callback(params))
    }

    return (
        <ReactPaginate
            breakLabel='...'
            nextLabel=' > '
            onPageChange={paginateHandler}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            pageCount={num_pages}
            previousLabel=' < '
            renderOnZeroPageCount={null}
            containerClassName='pagination justify-content-center'
            pageClassName='page-item'
            pageLinkClassName='page-link'
            previousClassName='page-item'
            previousLinkClassName='page-link'
            nextClassName='page-item'
            nextLinkClassName='page-link'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            activeClassName='page-item active'
            activeLinkClassName='page-link'
        />
    )
}