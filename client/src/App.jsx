import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout, ProtectedLayout } from './components'
import {
  Register,
  Login,
  Unauthorized,
  NotFound,
  Staff,
  Home,
  FormData,
  ChangePassword,
  Reports,
} from './pages'
import UserDetail from './pages/Staff/UserDetail'
import CalonPetugasDetail from './pages/Home/CalonPetugasDetail'
import RequireAuth from './utils/auth/RequireAuth'
import PersistLogin from './utils/auth/PersistLogin'
import './App.scss'

import ROLES from './utils/const/roles'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public routes */}
        <Route path='login' element={<Login />} />
        <Route path='unauthorized' element={<Unauthorized />} />

        {/* private routes */}
        <Route element={<PersistLogin />}>
          <Route path='/' element={<ProtectedLayout />}>
            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Staff]} />
              }
            >
              <Route path='/' element={<Home />} />
              <Route path='form-data' element={<FormData />} />
              <Route path='change-password' element={<ChangePassword />} />
              <Route
                path='/calon-petugas/:id'
                element={<CalonPetugasDetail />}
              />
              <Route path='/reports' element={<Reports />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path='staff' element={<Staff />} />
              <Route path='staff/:id' element={<UserDetail />} />
              <Route path='register' element={<Register />} />
            </Route>
          </Route>
        </Route>

        {/* 404 not found */}
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
