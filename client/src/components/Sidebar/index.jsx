import React from 'react'
import {
  WorkOutline,
  Home,
  Apps,
  Lock,
  BarChart,
  SettingsApplications,
  InputOutlined,
} from '@material-ui/icons'
import './index.scss'

const Sidebar = () => {
  return (
    <aside className='sidebar'>
      <div className='sidebar-wrapper'>
        <section className='sidebar-menu'>
          <h3 className='sidebar-title'>Dashboard</h3>
          <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
              <Home className='sidebar-icon' />
              Home
            </li>
            <li className='sidebar-list-item'>
              <InputOutlined className='sidebar-icon' />
              Input Data
            </li>
            <li className='sidebar-list-item'>
              <SettingsApplications className='sidebar-icon' />
              Process Data
            </li>
            <li className='sidebar-list-item'>
              <BarChart className='sidebar-icon' />
              Reports
            </li>
          </ul>
        </section>
        <section className='sidebar-menu'>
          <h3 className='sidebar-title'>Staff</h3>
          <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
              <WorkOutline className='sidebar-icon' />
              Manage
            </li>
            <li className='sidebar-list-item'>
              <Apps className='sidebar-icon' />
              Register
            </li>
            <li className='sidebar-list-item'>
              <Lock className='sidebar-icon' />
              Change Password
            </li>
          </ul>
        </section>
      </div>
    </aside>
  )
}

export default Sidebar
