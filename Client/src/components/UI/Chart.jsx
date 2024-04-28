
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useContext, useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { datacontext } from '../../ctxapi/Mycontext';

ChartJS.register(ArcElement, Tooltip, Legend);





function ChartComponent() {
    const contextdata = useContext(datacontext);
    const allcowsdata = contextdata.allcowsdata
    const allmedicaldata = contextdata.allmedicaldata;

    console.log(allmedicaldata)

    const [nbrCalf, setNbrCalf] = useState()
    const [nbrCow, setNbrCow] = useState()

    const [bluetongue, setBluetongue] = useState()
    const [botulism, setBotulism] = useState()
    const [bovineTuberculosis, setBovineTuberculosis] = useState()
    const [brucellosis, setBrucellosis] = useState()

    useEffect(() => {
        let x = 0;
        let y = 0;
        allcowsdata.forEach(item => {
            if (item.origin === 'farm') {
                x++;
            }
            if (item.origin === 'imported') {
                y++;
            }
        });
        setNbrCalf(x);
        setNbrCow(y);
    }, [allcowsdata]);

    useEffect(() => {
        let countDisease1 = 0;
        let countDisease2 = 0;
        let countDisease3 = 0;
        let countDisease4 = 0;

        allmedicaldata.forEach(item => {
            if (item.disease === 'Bluetongue') {
                countDisease1++;
            }
            if (item.disease === 'Botulism') {
                countDisease2++;
            }
            if (item.disease === 'Bovine-Tuberculosis') {
                countDisease3++;
            }
            if (item.disease === 'Brucellosis') {
                countDisease4++;
            }
        });
        setBluetongue(countDisease1);
        setBotulism(countDisease2);
        setBovineTuberculosis(countDisease3);
        setBrucellosis(countDisease4);
    }, [allcowsdata]);

    const datamedical = {
        labels: ['Bluetongue', 'Botulism', 'Bovine Tuberculosis', 'Brucellosis'],
        datasets: [
            {
                label: 'of Votes',
                data: [bluetongue, botulism, bovineTuberculosis, brucellosis],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    const datacow = {
        labels: ['Imported', 'Born Farm'],
        datasets: [
            {
                label: 'of Votes',
                data: [nbrCow,nbrCalf],
                backgroundColor: [
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    console.log(datamedical)
    return (
        <>
            <div className='flex justify-around gap-10 items-center  flex-col  mt-10 text-center md:flex-row  mb-3  text-gray-700  dark:text-gray-200'>
                <div className='w-[100%] sm:w-[50%] md:w-[30%]'>
                    <h2 className='my-5  text-2xl'>Imported  and cows born on the farm: pie chart analysis</h2>
                    <Pie data={datacow} />
                </div>
                <div className='w-[100%] sm:w-[50%] md:w-[30%]'>
                    <h2 className='my-5 text-2xl '>Cows  diseases: pie chart analysis</h2>
                    <Pie data={datamedical} />
                </div>
            </div>
        </>
    )
}

export default ChartComponent;
