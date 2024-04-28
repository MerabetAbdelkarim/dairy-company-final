import { useContext, useEffect, useRef, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

import axios from "axios";
import { datacontext } from "../../../ctxapi/Mycontext";

const ModalDelete = ({ cowid }) => {




    const [modalOpen, setModalOpen] = useState(false);

    const trigger = useRef(null);
    const modal = useRef(null);

    const contextdata = useContext(datacontext);

    const {
        getcowsbirthdata,
        getmedicalexamdata,
        getMilkdata,
        getcowsdata,
        getallcowsdata,
    } = contextdata;

    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!modal.current) return;
            if (
                !modalOpen ||
                modal.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setModalOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    const handleDelete = (e) => {
        e.preventDefault()
        axios
            .delete(`http://localhost:3000/cow/${cowid}`)
            .then((result) => {
                console.log(result)
                setModalOpen(false);
                getcowsbirthdata();
                getmedicalexamdata();
                getMilkdata();
                getcowsdata();
                getallcowsdata();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <div className="">
                <button
                    ref={trigger}
                    onClick={() => setModalOpen(true)}
                    className={` text-red-700   hover:text-red-800`}
                >
                    <MdDeleteOutline size={'17px'} />
                </button>
                <div
                    className={`fixed left-0 top-0 z-50 bottom-0-0 flex h-full min-h-screen w-full items-center justify-center bg-black/50 px-4 py-5 ${modalOpen ? "block" : "hidden"
                        }`}
                >
                    <div
                        ref={modal}
                        onFocus={() => setModalOpen(true)}
                        className="w-full max-w-[570px] rounded-[20px] bg-white px-8 py-12 text-center  md:px-[70px] md:py-[60px]"
                    >
                        <h3 className="pb-[18px] text-xl font-semibold sm:text-2xl text-gray-900">
                            Delete item
                        </h3>
                        <form className="max-w-sm mx-auto text-left">
                            <div className="pb-[18px]  font-semibold  text-center text-[14px]">You 're going to delete , Are you sure?</div>
                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-1/2 px-3">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setModalOpen(false)
                                        }}
                                        className="block w-full rounded-md border  p-3 text-center text-base font-medium  transition "
                                    >
                                        No
                                    </button>
                                </div>
                                <div className="w-1/2 px-3">
                                    <button
                                        onClick={handleDelete}
                                        className="block w-full rounded-md border  p-3 text-center text-base font-medium text-white bg-red-700 transition  hover:bg-red-800">
                                        Yes, Delete !
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalDelete;
