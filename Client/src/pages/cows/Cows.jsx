
import { useContext, useEffect, useState } from 'react';
import Hero from '../../components/UI/Hero';
import Breadcrumb from '../../components/UI/Breadcrumb';
import Table from '../../components/UI/Table';
import Dropdown from '../../components/UI/Dropdown';
import ModalUpdate from './components/ModalUpdate'
import ModalDelete from './components/ModalDelete'
import ModalAdd from './components/ModalAdd'
import ModalAddBirth from './components/ModalAddBirth'
import { datacontext } from '../../ctxapi/Mycontext';
import Navigation from '../../components/UI/Navigation';


export default function Cows() {
    const [data, setData] = useState([]);

    const contextdata = useContext(datacontext);
    const Cowsdata = contextdata.cowsdata;
    const pageCount = contextdata.totalPageCows



    useEffect(() => {
        setData(Cowsdata);
    }, [Cowsdata]);


    const [colDefs, setColDefs] = useState([
        { field: "number" },
        { field: "DateOfEntry" },
        { field: "Breed" },
        { field: "origin" },
        { field: "MotherCowNumber" },
        { field: "DateOfBirth" },
        { field: 'action' },
    ]);

    return (
        <>
            <div className='container '>
                <Hero titel={'Cows'} />
                <div className='flex justify-around items-center h-20'>
                    <Breadcrumb page={'Cows'} />
                    <Dropdown
                        item={<div>Add Cow</div>}
                        className={'flex justify-center items-center rounded-full bg-blue-700 w-32  py-3 text-base font-medium text-white'} >
                        <ModalAddBirth />
                        <hr />
                        <ModalAdd />
                    </Dropdown>
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
                                    {item.dateofentry}
                                </td>
                                <td className="px-6 py-4">
                                    {item.breed}
                                </td>
                                <td className="px-6 py-4">
                                    {item.origin}
                                </td>
                                <td className="px-6 py-4">
                                    {item.dateofbirth}
                                </td>
                                <td className="px-6 py-4">
                                    {item.motherid}
                                </td>
                                <td className="px-6 py-4 flex gap-3">
                                    <ModalUpdate cowid={item.id} cowdateofentry={item.dateofentry} cowbreed={item.breed} coworigin={item.origin} cowdateofbirth={item.dateofbirth} cowmotherid={item.motherid} />
                                    <ModalDelete cowid={item.id} />
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