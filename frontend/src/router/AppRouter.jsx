import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { LinkPage } from '../pages/LinkPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { UserPage } from '../pages/UserPage'
import { UpdateLinkPage } from '../pages/UpdateLinkPage'
import { UpdateUserPage } from '../pages/UpadateUserPage'
import { UpdatePasswordPage } from '../pages/UpdatePasswordPage'

export const AppRouter = () => {
    return(
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />}/>
            <Route path='/register' element={<RegisterPage />}/>
            <Route path='/link/:id' element={<LinkPage />}/>
            <Route path='/link/edit/:id' element={<UpdateLinkPage />}/>
            <Route path='/user/:id' element={<UserPage />} />
            <Route path='/update/:id' element={<UpdateUserPage />} />
            <Route path='/user/password' element={<UpdatePasswordPage />} />
            <Route path='*' element={<NotFoundPage />} />

        </Routes>

    )
}