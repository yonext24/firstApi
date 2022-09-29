import React, { useContext } from 'react'
import replieSvg from '../../images/icon-reply.svg'
import NewComentario from '../newComentario/NewComentario'
import { useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import axios from 'axios'
import avatar from '../../images/avatars/default.png'
import del from '../../images/icon-delete.svg'
import edit from '../../images/icon-edit.svg'
import DeleteModal from '../deleteModal/DeleteModal'
import Likes from '../likes/Likes'


export default function Reply({ usersWhoLiked, usersWhoDisliked,  username, createdAt, comment, score, id, parentCommentId }) {
  const [hasInput, setHasInput] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editLoading, setEditLoading] = useState(false)
  const [editInput, setEditInput] = useState(comment)
  const [hasModal, setHasModal] = useState(false)
  const { user } = useContext(UserContext)

  const handleEdit = () => {
    setIsEditing(true)
  }
  const handleEditButton = async () => {
    setEditLoading(true)
    try {
      const res = await axios({
        method: 'PUT',
        url: `http://localhost:8800/api/comments/${id}`,
        withCredentials: true,
        credentials: true,
        headers: {
          xxxxx: document.cookie.split('=')[1] || ''
        },
        data: { comment: editInput }
      })
      console.log(res)
      if (res) {
        setEditLoading(false)
        window.location.reload()
      }
    } catch (err) {
      console.log(err)
    }
  }
  const handleEditChange = e => {
    setEditInput(e.target.value)
  }
  const handleEditClose = () => {
    setIsEditing(false)
  }
  const handleReplyButton = () => {
    hasInput ? setHasInput(false) : setHasInput(true)
  }
  const handleDelete = () => {
    setHasModal(true)
  }

  const date = new Date(createdAt)

  return <>
    {
      !isEditing ? <>
        <div className="singleComment reply">
          <Likes id={id} score={score} usersWhoLiked={usersWhoLiked} usersWhoDisliked={usersWhoDisliked} />
          <div className='comment-comment'>
            <div className='info-container'>
              <div className='info'>
                <img src={avatar} className='avatar' alt='avatar'></img>
                <p>{username}</p>
                {
                      username === user.username && <div className='you'>you</div>
                }
                <span className='date'>{date.toLocaleString('en-US', { hour12: false })}</span>
              </div>
              <div className='del-reply'>
                {
                  (() => {
                    if (user !== null && user.username === username) {
                      return (
                        <>
                          <div className='edit-container'>
                            <button className='edit' onClick={handleEdit}>
                              <img src={edit} alt='editar' />
                            </button>
                          </div>
                          <div className='delete-container'>
                            <button className='delete' onClick={handleDelete}>
                              <img alt='delete' src={del} />
                            </button>
                          </div>
                        </>
                      )
                    }
                    return null;
                  })()
                }
                <div className='reply-container'>
                  <button onClick={handleReplyButton} className='reply-button'>
                    <img src={replieSvg} alt='reply'></img>
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            </div>
            <h4 className='comment'>{comment}</h4>
          </div>
        </div>
      </>
        :
        <div className={`newComment`}>
          <img src={avatar} alt='avatar' className='avatar' />
          <textarea
            className='comment-content'
            autoFocus={true}
            onFocus={e => e.target.selectionStart = comment ? `${comment}`.length : 0}
            onChange={handleEditChange}
            defaultValue={comment ? `${comment}` : ''} />
          <button className='send-reply' disabled={editLoading} onClick={handleEditButton}>{
            (() => {
              if (editLoading) return <div class="spinner2"></div>
              return 'EDIT'
            })()
          }</button>
          <button className='edit-close' onClick={handleEditClose}>X</button>
        </div>
    }
    {hasInput && <NewComentario repliedTo={username} repliedComment={parentCommentId} />}
    {hasModal && <DeleteModal id={id} state={setHasModal} ></DeleteModal>}
  </>
}