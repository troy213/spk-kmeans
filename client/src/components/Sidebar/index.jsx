import React from 'react'
import {
  WorkOutline,
  Home,
  Apps,
  Lock,
  BarChart,
  InputOutlined,
} from '@material-ui/icons'
import { Link, useLocation } from 'react-router-dom'
import './index.scss'

const SIDEBAR_NAVIGATION = [
  {
    title: 'Dashboard',
    content: [
      {
        icon: <Home className='sidebar-icon' />,
        link: '/',
        name: 'Home',
      },
      {
        icon: <InputOutlined className='sidebar-icon' />,
        link: '/form-data',
        name: 'Input Data',
      },
      {
        icon: <BarChart className='sidebar-icon' />,
        link: '/reports',
        name: 'Reports',
      },
    ],
  },
  {
    title: 'Staff',
    content: [
      {
        icon: <WorkOutline className='sidebar-icon' />,
        link: '/staff',
        name: 'Manage',
      },
      {
        icon: <Apps className='sidebar-icon' />,
        link: '/register',
        name: 'Register',
      },
      {
        icon: <Lock className='sidebar-icon' />,
        link: '/change-password',
        name: 'Change Password',
      },
    ],
  },
]

const Sidebar = () => {
  const location = useLocation()

  return (
    <aside className='sidebar'>
      <div className='sidebar-wrapper'>
        {SIDEBAR_NAVIGATION.map((menu, menuIndex) => {
          const { title, content } = menu

          return (
            <section className='sidebar-menu' key={menuIndex}>
              <h3 className='sidebar-title'>{title}</h3>
              <ul className='sidebar-list'>
                {content.map((content, contentIndex) => {
                  const { icon, link, name } = content

                  return (
                    <li
                      className={`sidebar-list-item${
                        location.pathname === link ? ' active' : ''
                      }`}
                      key={contentIndex}
                    >
                      {icon}
                      <Link to={link} className='link'>
                        {name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
      </div>
    </aside>
  )
}

export default Sidebar
