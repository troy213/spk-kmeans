import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout, ProtectedLayout } from './components'
import {
  Register,
  Login,
  Unauthorized,
  NotFound,
  Editor,
  Staff,
  Home,
} from './pages'
import RequireAuth from './utils/auth/RequireAuth'
import PersistLogin from './utils/auth/PersistLogin'
import './App.scss'

const ROLES = {
  Admin: 1,
  Staff: 2,
}

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
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path='staff' element={<Staff />} />
              <Route path='register' element={<Register />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Staff]} />}>
              <Route path='editor' element={<Editor />} />
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
