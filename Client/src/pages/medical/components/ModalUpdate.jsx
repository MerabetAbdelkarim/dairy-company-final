import { useContext, useEffect, useRef, useState } from "react";
import { LuPencil } from "react-icons/lu";
import { datacontext } from "../../../ctxapi/Mycontext";
import axios from "axios";

const ModalUpdate = ({ examid, examdate, examdisease, cowid }) => {
    const contextdata = useContext(datacontext);
    const allcowsdata = contextdata.allcowsdata;
    const {
        getcowsbirthdata,
        getmedicalexamdata,
        getMilkdata,
        getcowsdata,
        getallcowsdata,
    } = contextdata;

    const [disease, setdisease] = useState(examdisease);
    const [Cowid, setCowid] = useState(cowid);
    const [date, setdate] = useState(examdate);
    console.log('date', date)
    console.log('disease', disease)

    const [modalOpen, setModalOpen] = useState(false);

    const trigger = useRef(null);
    const modal = useRef(null);

    const handleSubmitupdate = (e) => {
        e.preventDefault();
        const formData = {
            cowid: Cowid,
            disease: disease,
            dateofmedical: date,
        };
        updatecowsdata(formData);
    }

    const updatecowsdata = async (formData) => {
        await axios.put(`http://localhost:3000/medical/${examid}`, formData)
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
                            Update Milk
                        </h3>
                        <form
                            onSubmit={handleSubmitupdate}
                            className="max-w-sm mx-auto text-left"
                        >
                            <label>COW ID</label>
                            <select
                                className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                                value={Cowid}
                                required
                                name="COW id"
                                onChange={(e) => setCowid(e.target.value)}
                            >
                                <option selected disabled>COW ID</option>
                                {allcowsdata.map((cow, index) => (
                                    <option key={index} value={cow.id}>{cow.id}</option>
                                ))}
                            </select>

                            <label>DISEASE</label>
                            <select
                                required
                                cursor={'pointer'}
                                className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                name="DISEASE"
                                onChange={(e) => setdisease(e.target.value)}
                                value={disease}
                            >
                                <option selected disabled>DISEASE</option>
                                <option value={'Bluetongue'}>Bluetongue</option>
                                <option value={'Botulism'}>Botulism</option>
                                <option value={'Bovine-Tuberculosis'}>Bovine-Tuberculosis</option>
                                <option value={'Brucellosis'}>Brucellosis</option>
                            </select>

                            <label>ENTRY DATE</label>
                            <input
                                required
                                cursor={'pointer'}
                                className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                type="date"
                                name="entryDate"
                                onChange={(e) => setdate(e.target.value)}
                                value={date}
                            />

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
