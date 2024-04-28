import { Route, Routes } from 'react-router-dom'
import Layout from "../components/layout/Layout";
import Home from '../pages/home/Home';
import Cows from '../pages/cows/Cows';
import Medical from '../pages/medical/Medical';
import Milke from '../pages/milke/Milke';
import NotFound from '../pages/notFound/NotFound'
function Router() {
    return (
        <>
            <Routes>
                <Route element={<Layout />}>

                    <Route path="/" element={<Home />} />

                    <Route path="/cows" element={<Cows />} />

                    <Route path="/medical" element={<Medical />} />

                    <Route path="/milk" element={<Milke />} />

                    <Route path="*" element={<NotFound />} />

                </Route>
            </Routes>
        </>
    )
}

export default Router