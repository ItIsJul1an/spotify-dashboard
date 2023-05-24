import React from 'react'
import {Route, Routes} from 'react-router'
import LandingPage from './pages/LandingPage/LandingPage'
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

function App() {

    const {accessToken} = useUserSessionStore()

    const defaultPrivateRouteProps: Omit<PrivateRouteProps, 'outlet'> = {
        isAuthenticated: accessToken !== undefined && accessToken !== '',
        authenticationPath: '/',
    }

    const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
        isAuthenticated: accessToken !== undefined && accessToken !== '',
        redirectPath: '/dashboard',
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
                <Route path='/dashboard'
                       element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<Overview/>}/>}/>
                <Route path='dashboard/trends'
                       element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<Overview/>}/>}/>
                <Route path='dashboard/new'
                       element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<Overview/>}/>}/>
                <Route path='dashboard/events'
                       element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<Overview/>}/>}/>
                <Route path='dashboard/fav/songs'
                       element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<FavSongsPage/>}/>}/>
                <Route path='dashboard/fav/artists'
                       element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<FavArtistsPage/>}/>}/>
                <Route path='dashboard/fav/albums'
                       element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<FavAlbumsPage/>}/>}/>
                <Route path='*'
                       element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<LandingPage/>}/>}/>
            </Routes>
        </section>
    )
}

export default App