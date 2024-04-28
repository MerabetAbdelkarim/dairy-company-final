import { useContext, useEffect, useState } from "react"
import Card from "../../components/UI/Card"
import { GiCow } from "react-icons/gi";
import { LuMilk } from "react-icons/lu";
import { MdOutlineMedicalServices } from "react-icons/md";
import Breadcrumb from "../../components/UI/Breadcrumb";
import Hero from "../../components/UI/Hero";
import { datacontext } from "../../ctxapi/Mycontext";
import Chart from "../../components/UI/Chart";

function Home() {
    const contextdata = useContext(datacontext);
    const allcowsdata = contextdata.allcowsdata
    const allmedicaldata = contextdata.allmedicaldata;
    const allmilkdata = contextdata.allmilkdata;




    const cards = [
        {
            icon: <GiCow size={'50px'} color="orange" />,
            bgicon: 'bg-yellow-100',
            titel: 'Total Cows',
            nbr: `${allcowsdata.length}`,
            unit: 'cow',
            link: '/cows'
        },
        {
            icon: <LuMilk size={'50px'} color="blue" />,
            bgicon: 'bg-blue-100',
            titel: 'Total Milk',
            nbr: `${allmilkdata.length}`,
            unit: 'times',
            link: '/milk'
        },
        {
            icon: <MdOutlineMedicalServices size={'50px'} color="red" />,
            bgicon: 'bg-red-100',
            titel: 'Total Medical',
            nbr: `${allmedicaldata.length}`,
            unit: 'medical',
            link: '/medical'
        },
    ]

    return (
        <div className="min-h-[70vh] container ">
            <Hero titel={'Dahboard'} />
            <Breadcrumb />
            <div className="flex flex-col md:flex-row sm:justify-around  gap-3">
                {
                    cards.map((item, index) => (
                        <Card key={index} icon={item.icon} bgicon={item.bgicon} titel={item.titel} nbr={item.nbr} unit={item.unit} link={item.link} />
                    ))
                }
            </div>
            <Chart />
        </div>
    )
}

export default Home