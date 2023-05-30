import React from 'react'
import {Route, Routes} from 'react-router'
import LandingPage from './pages/landing_page/LandingPage'
import Overview from './pages/Overview'
import FavSongsPage from './pages/fav/songs/FavSongsPage'
import FavAlbumsPage from './pages/fav/albums/FavAlbumsPage'
import FavArtistsPage from './pages/fav/artists/FavArtistsPage'
import Navbar from './components/ui/navbar/Navbar'
import Sidebar from './components/ui/sidebar/Sidebar'
import Action from './components/ui/action_section/Action'
import PrivateRoute, {PrivateRouteProps} from './react_router_routes/PrivateRoute'
import ProtectedRoute, {ProtectedRouteProps} from './react_router_routes/ProtectedRoute'
import useUserSessionStore from './stores/user_session/userSessionStore'
import {ToastContainer} from "react-toastify";
import NotFound from "./pages/not_found/NotFound";

function App() {

    const {accessToken} = useUserSessionStore()

    const defaultPrivateRouteProps: Omit<PrivateRouteProps, 'outlet'> = {
        isAuthenticated: accessToken !== undefined && accessToken !== '',
        authenticationPath: '/login',
    }

    const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
        isAuthenticated: accessToken !== undefined && accessToken !== '',
        redirectPath: '/',
    }

    return (
        <section id='main-section' style={{backgroundColor: 'var(--nl-clr-2)'}}>
            <ToastContainer/>
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
                <Route index={true}
                       element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<Overview/>}/>}/>
                <Route path='trends'
                       element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<Overview/>}/>}/>
                <Route path='new'
                       element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<Overview/>}/>}/>
                <Route path='events'
                       element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<Overview/>}/>}/>
                <Route path='fav/songs'
                       element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<FavSongsPage/>}/>}/>
                <Route path='fav/artists'
                       element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<FavArtistsPage/>}/>}/>
                <Route path='fav/albums'
                       element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<FavAlbumsPage/>}/>}/>
                <Route path='login'
                       element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<LandingPage/>}/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </section>
    )
}

export default App