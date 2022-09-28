import axios from "axios"
import React, {useState} from "react"
import { useNavigate } from "react-router-dom"

export default function Register() {
  const [usernameValue, setUsernameValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const navigate = useNavigate()

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
  const handleRegisterSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios({
        url: 'http://localhost:8800/api/auth/register',
        method: 'POST',
        data: credentials
      })
      setLoading(false)
      if (res) {
        navigate('/login')
      }
    } catch(err) {
      setError(error.response.data.message)
    }
  }


  return <div className="login-container">
    <form onSubmit={handleRegisterSubmit}>
      <h1>Register</h1>
      <input type='text' autoFocus={true} required maxLength={15} id='username' placeholder='Username' onChange={handleUsernameChange} />
      <input type='password' required maxLength={15} id='password' placeholder='Password' onChange={handlePasswordChange} />
      <input disabled={loading} type='submit' value='Register' />
      {
        loading && <div className='loading'>
          <div class="spinner"></div>
        </div>
      }
      {
        error && <span>{error}</span>
      }
    </form>
  </div>
}