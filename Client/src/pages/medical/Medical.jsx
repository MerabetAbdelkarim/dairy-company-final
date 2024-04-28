
import { LuPencil } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import { useContext, useEffect, useState } from 'react';
import Hero from '../../components/UI/Hero';
import Breadcrumb from '../../components/UI/Breadcrumb';
import ModalAdd from "./components/ModalAdd"
import ModalUpdate from "./components/ModalUpdate"
import ModalDelete from "./components/ModalDelete"
import Table from '../../components/UI/Table';
import { datacontext } from "../../ctxapi/Mycontext";
import Navigation from "../../components/UI/Navigation";


export default function Medical() {

    const [data, setData] = useState([]);

    const contextdata = useContext(datacontext);
    const Medicaldata = contextdata.medicalexamdata;
    const pageCount = contextdata.totalPageMedicalExam



    useEffect(() => {
        setData(Medicaldata);
    }, [Medicaldata]);


    const [colDefs, setColDefs] = useState([
        { field: "number" },
        { field: "day" },
        { field: "illness" },
        { field: "action" },

    ]);

    return (
        <>
            <div className='container  min-h-[70vh]'>
                <Hero titel={'Medical'} />
                <div className='flex justify-around items-center h-20'>
                    <Breadcrumb page={'Medical'} />
                    <ModalAdd/>
                </div>
                <Table
                    colDefs={colDefs}
                >
                    {
                        data?.map((item, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.id}
                                </th>
                                <td className="px-6 py-4">
                                    {item.dateofmedical} 
                                </td>
                                <td className="px-6 py-4">
                                    {item.disease}
                                </td>
                                <td className="px-6 py-4 flex gap-3">
                                    <ModalUpdate examid={item.id} cowid={item.cowid} examdate={item.dateofmedical} examdisease={item.disease}  />
                                    <ModalDelete medicalid={item.id} />
                                </td>
                            </tr>
                        ))
                    }
                </Table>
                <Navigation pageCount={pageCount} />
            </div>
        </>
    )
}