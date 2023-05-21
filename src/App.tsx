import React from 'react'
import {Route, Routes} from 'react-router'
import LandingPage from './pages/LandingPage/LandingPage'
import Overview from './pages/Overview'
import Navbar from './components/ui/navbar/Navbar'
import Sidebar from './components/ui/sidebar/Sidebar'
import Action from './components/ui/action_section/Action'
import PrivateRoute, {PrivateRouteProps} from './react_router_routes/PrivateRoute'
import ProtectedRoute, {ProtectedRouteProps} from './react_router_routes/ProtectedRoute'
import useUserSessionStore from './stores/user_session/userSessionStore'

function App() {

    const {accessToken} = useUserSessionStore()

    const defaultPrivateRouteProps: Omit<PrivateRouteProps, 'outlet'> = {
        isAuthenticated: accessToken !== undefined && accessToken !== '',
        authenticationPath: '/',
    }

    const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
        isAuthenticated: accessToken !== undefined && accessToken !== '',
        redirectPath: '/dashboard/',
    }

    return (
        <section id='main-section' style={{backgroundColor: 'var(--nl-clr-2)'}}>

            {
                accessToken !== undefined && accessToken !== '' ?
                    <>
                        <Navbar/>
                        <Sidebar/>
                        <Action/>
                    </>
                    : null
            }

            <Routes>
                <Route path='/dashboard/'
                       element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<Overview/>}/>}/>
                <Route path='*'
                       element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<LandingPage/>}/>}/>
            </Routes>
        </section>
    )
}

export default App