import { useContext } from "react";
import { datacontext } from "../../ctxapi/Mycontext";
import ReactPaginate from "react-paginate";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Navigation({ pageCount }) {
    const contextdata = useContext(datacontext);
    const {
        getcowsdata,
        getcowsbirthdata,
        getMilkdata,
        getmedicalexamdata,
    } = contextdata;

    const handlePageClick = (data) => {
        getcowsdata(data.selected + 1,);
        getcowsbirthdata(data.selected + 1);
        getMilkdata(data.selected + 1);
        getmedicalexamdata(data.selected + 1);
    }
    return (
        <>
            <div className="mt-5 flex justify-center">
                <ReactPaginate
                    className='paginate flex'
                    breakLabel="..."
                    nextLabel={<IoIosArrowForward />}
                    previousLabel={<IoIosArrowBack/>}
                    onPageChange={handlePageClick}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={2}
                    pageCount={pageCount}
                    pageClassName="paginateitem"
                    previousClassName=" paginateprevious"
                    nextClassName="paginatenext"
                    breakClassName="paginatebreak"
                    activeClassName="paginateactive"
                    pageLinkClassName="paginateitemlink"
                    previousLinkClassName="paginatelinkprevious"
                    nextLinkClassName="paginatelinknext"
                    breakLinkClassName="paginatebreak"
                />
            </div>

        </>
    )
}

export default Navigation