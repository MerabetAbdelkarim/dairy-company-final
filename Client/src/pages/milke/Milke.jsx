
import { useContext, useEffect, useState } from 'react';
import Hero from '../../components/UI/Hero';
import Breadcrumb from '../../components/UI/Breadcrumb';

import Table from '../../components/UI/Table';
import Navigation from "../../components/UI/Navigation"

import { datacontext } from '../../ctxapi/Mycontext';
import ModalAdd from './components/ModalAdd';
import ModalDelete from './components/ModalDelete';
import ModalUpdate from './components/ModalUpdate';

export default function Milke() {


    const [data, setData] = useState([]);

    const contextdata = useContext(datacontext);
    const Milkdata = contextdata.Milkdata;
    const pageCount = contextdata.totalPageMilk



    useEffect(() => {
        setData(Milkdata);
    }, [Milkdata]);

    const [colDefs, setColDefs] = useState([
        { field: "day" },
        { field: "quantity" },
        { field: 'action' },
    ]);

    return (
        <>
            <div className='container min-h-[70vh]'>
                <Hero titel={'Milk'} />
                <div className='flex justify-around items-center h-20'>
                    <Breadcrumb page={'Milk'} />
                    <ModalAdd title={'Milk registration'} />
                </div>
                <Table
                    colDefs={colDefs}
                >
                    {
                        data?.map((item, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.date}
                                </th>
                                <td className="px-6 py-4">
                                    {item.quantity}
                                </td>
                                <td className="px-6 py-4 flex gap-3">
                                    <ModalUpdate milkid={item.id} milkdate={item.date} milkquantity={item.quantity} />
                                    <ModalDelete milkid={item.id} />
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