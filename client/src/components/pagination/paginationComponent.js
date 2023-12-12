import ReactPaginate from "react-paginate";
import css from "./paginationComponent.module.css"
import { useEffect, useState } from "react";

const PaginationCustom = ({dispatch})=>{
    const [state, setState] = useState(false)
    useEffect(()=>{
        if (Math.ceil(dispatch.totalPage)>1) {
            setState(true)
        }
    },[dispatch.totalPage])
    
    return(
        <div>
            {state && <ReactPaginate
                    breakLabel="..."
                    nextLabel=" >"
                    onPageChange={dispatch.dispatch}
                    pageRangeDisplayed={3}
                    previousLabel="< "
                    renderOnZeroPageCount={null}
                    pageCount={Math.ceil(dispatch.totalPage)}
                    containerClassName={css.pageNum}
                    pageLinkClassName={css.pageNum}
                    previousLinkClassName={css.pageNum}
                    nextLinkClassName={css.pageNum}
                    activeLinkClassName={css.active}
                    className={css.Pagination}/>}
        </div>
    )
}

export {PaginationCustom}