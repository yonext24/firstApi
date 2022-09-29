import React, { useContext } from 'react'
import './newcomentario.css'
import { useState } from 'react'
import axios from 'axios'
import { UserContext } from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import avatar from '../../images/avatars/default.png'

// Si replyingTo existe, no renderizar el comentario

export default function NewComentario({ repliedTo = '', isFullWidth = '', repliedComment }) {
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const { user } = useContext(UserContext)

  const navigate = useNavigate()

  const handleChange = e => {
    setInputValue(e.target.value)
  }
  const handleReply = async () => {
    if (!user) {
      navigate('/login')
      return
    }
    setLoading(true)
    try {
      const res = await axios({
        method: 'POST',
        url: `https://y4nzz-fullstack.onrender.com/api/comments/${repliedComment}`,
        data: { comment: inputValue },
        headers: {
          xxxxx: document.cookie.split('=')[1] || ''
        },
        withCredentials: true,
        credentials: true
      })
      setLoading(false)
      if (res) {
        window.location.reload()
      }
    } catch (err) { setLoading(false); console.log(err) }
  }

  const handleSubmit = async e => {
    if (!inputValue) return
    if (repliedTo) {
      handleReply()
      return
    }
    if (!user) { navigate('/login'); return }

    setLoading(true)
    try {
      axios.defaults.withCredentials = true
      const res = await axios({
        method: 'POST',
        url: 'https://y4nzz-fullstack.onrender.com/api/comments',
        data: { comment: inputValue },
        headers: {
          xxxxx: document.cookie.split('=')[1] || ''
        },
        withCredentials: true,
        credentials: true
      })
      setLoading(false)
      if (res) {
        window.location.reload()
      }
      console.log(res.data)
    } catch (err) { console.log(err) }
  }

  return <div className={`newComment ${isFullWidth}`}>
    <img src={avatar} alt='avatar' className='avatar' />
    <textarea
      className='comment-content' 
      placeholder='Add a comment...'
      disabled={loading}
      autoFocus={true}
      onFocus={e => e.target.selectionStart = repliedTo ? `@${repliedTo} `.length : 0}
      onChange={handleChange}
      defaultValue={repliedTo ? `@${repliedTo}` : ''} />
    <button className='send-reply' disabled={loading} onClick={handleSubmit} >{
      (() => {
        if (loading) return <div className="spinner2"></div>
        if (repliedTo) return 'REPLY'
        return 'SEND'
      })()
    }</button>
  </div>

}