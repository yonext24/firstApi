import React, { useState } from 'react'
import axios from 'axios'
import './deletemodal.css'

export default function DeleteModal({ id, state }) {
  const [loading, setLoading] = useState(false)

  const handleCancel = () => {
    state(false)
  }

  const handleDeleteComment = async () => {
    setLoading(true)
    try {
      const res = await axios({
        method: 'DELETE',
        url: `https://y4nzz-fullstack.onrender.com/api/comments/${id}`,
        withCredentials: true,
        headers: {
          cookie: document.cookie.split('=')[1] || ''
        },
        credentials: true
      })
      console.log(res)
      if (res) window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  return <div className='modal' onClick={handleCancel}>
    <div className='buttons-container' onClick={e => e.stopPropagation()}>
      <h4>Delete comment</h4>
      <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone</p>
      <div className='buttons'>
        <button onClick={handleCancel}>CANCEL</button>
        <button onClick={handleDeleteComment}>
          {
            (() => {
              if (loading) return <div class="spinner2"></div>
              return 'DELETE'
            })()
          }
        </button>
      </div>
    </div>
  </div>
}