import './header.css'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'

export default function Navbar() {

  const { user, dispatch } = useContext(UserContext)

  const handleLogout = e => {
    localStorage.setItem('user', null)
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    dispatch({type: 'INITIAL'})
    window.location.reload()
  }

  return <header>
    <div className='navbar-container'>

    <Link to='/'>
      <span className='home'>HOME</span>
    </Link>
    {
      user ? (
        <button className='logout' onClick={handleLogout}>Log Out</button>
      ) :
        <div className='logreg-container'>
        <Link to='/register' className='register-btn btn'>Register</Link>
        <Link to='/login' className='login-btn btn'>Log In</Link>
      </div>
    }
    </div>
  </header>
}