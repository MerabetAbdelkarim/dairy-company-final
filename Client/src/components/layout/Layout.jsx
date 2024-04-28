import { Outlet } from "react-router-dom"
import NavBar from "../navbar/NavBar"
import FooTer from "../footer/FooTer"
function Layout() {
    return (
        <>
            <NavBar />
            <Outlet />
            <FooTer />
        </>
    )
}

export default Layout