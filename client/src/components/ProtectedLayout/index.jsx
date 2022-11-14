import { Navbar, Sidebar } from '..'
import { Outlet } from 'react-router-dom'

const ProtectedLayout = () => {
  return (
    <div className='protected-layout'>
      <Navbar />
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default ProtectedLayout
