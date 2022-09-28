import React, { useContext, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../../contexts/UserContext'
import './likes.css'
import minus from '../../images/icon-minus.svg'
import plus from '../../images/icon-plus.svg'


export default function Likes({ score, id, usersWhoLiked, usersWhoDisliked }) {
  const [loading, setLoading] = useState(false)
  const {user} = useContext(UserContext)


  const handleDelDisLike = async () => {
    setLoading(true)
    try {
      const res = await axios({
        url: `http://localhost:8800/api/comments/${id}/dislike`,
        method: 'DELETE',
        withCredentials: true,
      })
      if (res) window.location.reload()
    } catch(err) {
      console.log(err)
    }
  }
  const handleDelLike = async () => {
    setLoading(true)
    try {
      const res = await axios({
        url: `http://localhost:8800/api/comments/${id}/like`,
        method: 'DELETE',
        withCredentials: true,
      })
      if (res) window.location.reload()
    } catch(err) {
      console.log(err)
    }
  }
  async function handleLike () {
    setLoading(true)
    try {
      const res = await axios({
        method: 'PUT',
        url: `http://localhost:8800/api/comments/${id}/like`,
        withCredentials: true
      })
      if (res) window.location.reload() 
    } catch(err) {
      console.log(err)
    }
  }
  async function handleDislike () {
    setLoading(true)
    try {
      const res = await axios({
        method: 'POST',
        url: `http://localhost:8800/api/comments/${id}/dislike`,
        withCredentials: true
      })
      if (res) window.location.reload() 
    } catch(err) {
      console.log(err)
    }
  }
  return <div className='likes'>
    <button onClick={usersWhoLiked.includes(user._id) ? handleDelLike : handleLike} disabled={loading}>{
      usersWhoLiked.includes(user._id) ? <img src={plus} alt='plus' className='liked' />
      : <img src={plus} alt='plus' />
    }</button>
    <span>{score}</span>
    <button onClick={usersWhoDisliked.includes(user._id) ? handleDelDisLike : handleDislike} disabled={loading}>{
      usersWhoDisliked.includes(user._id) ? <img src={minus} alt='minus' className='disLiked' />
      : <img src={minus} alt='minus'/>
    }</button>
  </div>
}