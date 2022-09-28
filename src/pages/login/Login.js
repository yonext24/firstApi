import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../contexts/UserContext"
import './login.css'
import axios from "axios"

export default function Login() {
  const [usernameValue, setUsernameValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  function handleUsernameChange(e) {
    setUsernameValue(e.target.value)
  }
  function handlePasswordChange(e) {
    setPasswordValue(e.target.value)
  }

  const credentials = {
    username: usernameValue,
    password: passwordValue
  }

  const { loading, error, dispatch } = useContext(UserContext)

  const navigate = useNavigate()

  const handleLoginSubmit = async e => {
    e.preventDefault()
    dispatch({ type: 'LOGIN_START' })
    try {
      const res = await axios({
        method: 'POST',
        url: 'https://y4nzz-fullstack.onrender.com/api/auth/login',
        withCredentials: true,
        credentials: true,
        data: credentials,
        mode: 'cors'
      })
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details })
      navigate('/')

    } catch (err) { 
      console.log('ERROR', err)
      dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data.message }) }
  }


  return <div className="login-container">
    <form onSubmit={handleLoginSubmit}>
      <h1>Log In</h1>
      <input type='text' autoFocus={true} id='username' required maxLength={15} placeholder='Username' onChange={handleUsernameChange} />
      <input type='password' required maxLength={15} id='password' placeholder='Password' onChange={handlePasswordChange} />
      <input type='submit' disabled={loading} />
      {
        loading && <div className='loading'>
          <div className="spinner"></div>
        </div>
      }
      { 
        error && <span>{error}</span>
      }
    </form>
  </div>
}