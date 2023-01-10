import React from 'react'
import {
  WorkOutline,
  Home,
  Apps,
  Lock,
  BarChart,
  InputOutlined,
  Settings,
} from '@material-ui/icons'
import { Link, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import './index.scss'

const SIDEBAR_NAVIGATION = [
  {
    title: 'Dashboard',
    content: [
      {
        icon: <Home className='sidebar-icon' />,
        link: '/',
        name: 'Home',
        allowedRoles: [1, 2],
      },
      {
        icon: <InputOutlined className='sidebar-icon' />,
        link: '/form-data',
        name: 'Input Data',
        allowedRoles: [1, 2],
      },
      {
        icon: <BarChart className='sidebar-icon' />,
        link: '/reports',
        name: 'Reports',
        allowedRoles: [1, 2],
      },
      {
        icon: <Settings className='sidebar-icon' />,
        link: '/config',
        name: 'Config',
        allowedRoles: [1, 2],
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
        allowedRoles: [1],
      },
      {
        icon: <Apps className='sidebar-icon' />,
        link: '/register',
        name: 'Register',
        allowedRoles: [1],
      },
      {
        icon: <Lock className='sidebar-icon' />,
        link: '/change-password',
        name: 'Change Password',
        allowedRoles: [1, 2],
      },
    ],
  },
]

const Sidebar = () => {
  const { auth } = useAuth()
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
                  const { icon, link, name, allowedRoles } = content

                  return (
                    <React.Fragment key={contentIndex}>
                      {allowedRoles.includes(auth?.roles) ? (
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
                      ) : null}
                    </React.Fragment>
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
