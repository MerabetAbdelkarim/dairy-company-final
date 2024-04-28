import { useContext, useEffect, useRef, useState } from "react";
import { LuPencil } from "react-icons/lu";
import { datacontext } from "../../../ctxapi/Mycontext";
import axios from "axios";

const ModalUpdate = ({ cowid, cowdateofentry, cowbreed, coworigin, cowdateofbirth, cowmotherid }) => {
    const contextdata = useContext(datacontext);
    const allcowsdata = contextdata.allcowsdata;
    const {
        getcowsbirthdata,
        getmedicalexamdata,
        getMilkdata,
        getcowsdata,
        getallcowsdata,
    } = contextdata;

    const [dateofentry, setdateofentry] = useState(cowdateofentry);
    const [breed, setbreed] = useState(cowbreed);
    const [origin, setorigin] = useState(coworigin);
    const [stateorigin, setstateorigin] = useState();
    const [dateofbirth, setdateofbirth] = useState(cowdateofbirth);
    const [motherid, setmotherid] = useState(cowmotherid);

    const [modalOpen, setModalOpen] = useState(false);

    const trigger = useRef(null);
    const modal = useRef(null);

    const handleSubmitupdate = (e) => {
        e.preventDefault();
        const formData = {
            dateofentry: dateofentry,
            breed: breed,
            origin: origin,
            dateofbirth: dateofbirth,
            motherid: motherid,
        };
        updatecowsdata(formData);
    }

    const updatecowsdata = async (formData) => {
        await axios.put(`http://localhost:3000/cow/${cowid}`, formData)
            .then(result => {
                console.log(result);
                setModalOpen(false);
                getcowsbirthdata();
                getmedicalexamdata();
                getMilkdata();
                getcowsdata();
            }
            )
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        if (origin == "imported") {
            setstateorigin(true)
        } else {
            setstateorigin(false)
        }

        console.log('stateorigin', stateorigin)
    })

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

    return (
        <>
            <div className="">
                <button
                    ref={trigger}
                    onClick={() => setModalOpen(true)}
                    className={` text-blue-700`}
                >
                    <LuPencil />
                </button>
                <div
                    className={`fixed left-0 z-20 top-0 flex h-full min-h-screen w-full items-center justify-center bg-black/50 px-4 py-5 ${modalOpen ? "block" : "hidden"
                        }`}
                >
                    <div
                        ref={modal}
                        onFocus={() => setModalOpen(true)}
                        className="w-full max-w-[570px] rounded-[20px] bg-white px-8 py-12 text-center dark:bg-dark-2 md:px-[70px] md:py-[60px]"
                    >
                        <h3 className="pb-[18px] text-xl font-semibold text-dark dark:text-white sm:text-2xl">
                            Update Cow
                        </h3>
                        <form
                            onSubmit={handleSubmitupdate}
                            className="max-w-sm mx-auto text-left"
                        >
                            {
                                stateorigin
                                    ?
                                    <>
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >Date Of Entry</label>

                                        <div>
                                            <input
                                                required
                                                className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                                                type="date"
                                                value={dateofentry}
                                                onChange={(e) => setdateofentry(e.target.value)}
                                                placeholder="Select a date"
                                            />
                                        </div>

                                        <label className="block mb-2 text-sm font-medium text-gray-900">Breed </label>
                                        <div className="flex ">
                                            <div className="flex items-center ps-4 ">
                                                <input
                                                    id="bordered-radio-1"
                                                    type="radio"
                                                    value={'Holstein'}
                                                    onChange={(e) => setbreed(e.target.value)}
                                                    name="bordered-radio"
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  "
                                                />
                                                <label
                                                    htmlFor="bordered-radio-1"
                                                    className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                >Holstein Breed</label>
                                            </div>
                                            <div className="flex items-center ps-4 ">
                                                <input
                                                    id="bordered-radio-2"
                                                    type="radio"
                                                    value={'Montbéliarde'}
                                                    onChange={(e) => setbreed(e.target.value)}
                                                    name="bordered-radio"
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                                />
                                                <label
                                                    htmlFor="bordered-radio-2"
                                                    className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                >Montbéliarde  Breed</label>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >Mother cow number</label>

                                        <input
                                            required
                                            type="number"
                                            name="COWMotherID"
                                            className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                            onChange={(e) => setmotherid(e.target.value)}
                                            value={motherid}
                                        />

                                        <label
                                            htmlFor="Date"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Date Of Birth
                                        </label>

                                        <div className=" ">
                                            <input
                                                required
                                                className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                                                type="date"
                                                onChange={(e) => setdateofbirth(e.target.value)}
                                                value={dateofbirth}
                                                placeholder="Select a date"
                                            />
                                        </div>
                                    </>
                            }
                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-1/2 px-3">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setModalOpen(false)
                                        }}
                                        className="block w-full rounded-md border  p-3 text-center text-base font-medium  transition hover:border-red-600 hover:bg-red-600 hover:text-white dark:text-white"
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <div className="w-1/2 px-3">
                                    <button
                                        type="submit"
                                        className="block w-full rounded-md border  p-3 text-center text-base font-medium text-white bg-green-700 transition hover:text-white hover:bg-green-800">
                                        Save
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

export default ModalUpdate;
