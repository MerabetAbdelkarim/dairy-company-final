import { useContext, useEffect, useRef, useState } from "react";
import { datacontext } from "../../../ctxapi/Mycontext";
import axios from "axios";

const Modal = () => {

    const contextdata = useContext(datacontext);
    const allcowsdata = contextdata.allcowsdata;
    const {
        getcowsbirthdata,
        getmedicalexamdata,
        getMilkdata,
        getcowsdata,
        getallcowsdata,
    } = contextdata;

    const [cowid, setcowid] = useState([]);
    const [date, setdate] = useState([]);
    const [disease, setdisease] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);

    const trigger = useRef(null);
    const modal = useRef(null);

    const handleSubmitadd = (e) => {
        console.log('e :', e)
        e.preventDefault();
        const formData = {
            cowid: cowid,
            dateofmedical: date,
            disease: disease
        };
        addexaminationdata(formData);
    }


    const addexaminationdata = async (formData) => {
        await axios.post('http://localhost:3000/medical', formData)
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
                    className={`rounded-full bg-blue-700 w-32  py-3 text-base font-medium text-white`}
                >
                    Add milk
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
                            Milk registration
                        </h3>
                        <form
                            onSubmit={handleSubmitadd}
                            className="max-w-sm mx-auto text-left"
                        >
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >COW ID</label>
                            <select
                                required
                                name="COWID"
                                className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                onChange={(e) => setcowid(e.target.value)}
                            >
                                <option selected disabled>Select Cow ID</option>
                                {allcowsdata.map((cow, index) => (
                                    <option key={index} value={cow.id}>{cow.id}</option>
                                ))}
                            </select>

                            <label
                                htmlFor="illness"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Illness
                            </label>

                            <select
                                required
                                className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                cursor={'pointer'}
                                name="disease"
                                onChange={(e) => setdisease(e.target.value)}
                            >
                                <option selected disabled>Select Disease</option>
                                <option value={'Bluetongue'}>Bluetongue</option>
                                <option value={'Botulism'}>Botulism</option>
                                <option value={'Bovine-Tuberculosis'}>Bovine-Tuberculosis</option>
                                <option value={'Brucellosis'}>Brucellosis</option>
                            </select>

                            <label
                                htmlFor="Date"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Date
                            </label>

                            <div className=" ">
                                <input
                                    required
                                    className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                                    type="date"
                                    onChange={(e) => setdate(e.target.value)}
                                    placeholder="Select a date"
                                />
                            </div>
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
            </div >
        </>
    );
};

export default Modal;
