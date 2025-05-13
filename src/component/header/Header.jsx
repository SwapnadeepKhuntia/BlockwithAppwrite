import React from 'react'
import { Container, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
function Header() {
    const authStatus = useSelector((state)=>state.auth.status);
    const navigate = useNavigate();
  
    const NavItems = [
      {
        name:Home,
        path:'/',
        active: true
      },
      {
        name: 'Login',
        path: '/login',
        active: !authStatus
      },
      {
        name: 'Register',
        path: '/register',
        active: !authStatus
      },
      {
        name: 'All Posts',
        path: '/all-posts',
        active: authStatus
      },
      {
        name: 'Add Posts',
        path: '/add-post',
        active: authStatus
      }
    ]


  return (
   <header>
      <Container>
        <nav className="flex">
           <div className='mr-4'>
              <Link to='/'>Logo</Link>
           </div>

            <ul className = 'flex'>
               {
                NavItems.map((item)=>(
                  item.active ? (
                      <li key = {item.name}>
                        <button
                        className = 'inline-block px-4 py-2 rounded-full text-gray-700 hover:bg-gray-200'
                        onClick = {()=>navigate(item.path)}
                        >{item.name}</button>
                      </li>
                    ) : null
                  ))
               }

               {
                authStatus && (
                  <li>
                     <LogoutBtn/>
                  </li>
                )
               }
            </ul>

        </nav>
      </Container>
   </header>
  )
}

export default Header
