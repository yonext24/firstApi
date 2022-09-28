import './comentario.css'
import replieSvg from '../../images/icon-reply.svg'
import React, { useState, useContext, useEffect } from 'react'
import NewComentario from '../newComentario/NewComentario'
import { UserContext } from '../../contexts/UserContext'
import Reply from '../reply/Reply'
import axios from 'axios'
import del from '../../images/icon-delete.svg'
import avatar from '../../images/avatars/default.png'
import edit from '../../images/icon-edit.svg'
import DeleteModal from '../deleteModal/DeleteModal'
import Likes from '../likes/Likes.js'

export default function Comentario({ comment }) {
  const [hasInput, setHasInput] = useState(false)
  const [replies, setReplies] = useState([])
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editInput, setEditInput] = useState(comment.comment)
  const [editLoading, setEditLoading] = useState(false)
  const [hasModal, setHasModal] = useState(false)

  const { user } = useContext(UserContext)

  useEffect(() => {
    const getReplies = async () => {
      setLoading(true)
      const replies = comment.replies.map(async replie => {
        try {
          const { data } = await axios.get(`http://localhost:8800/api/comments/${replie}`)
          return data
        } catch (err) { }
      })
      Promise.all(replies)
        .then(res => setReplies(res))
        .then(setLoading(false))
    }
    getReplies()
  }, [comment.replies])

  const handleReply = () => {
    hasInput ? setHasInput(false) : setHasInput(true)
  }
  const handleEdit = () => {
    setIsEditing(true)
  }
  const handleEditButton = async () => {
    setEditLoading(true)
    try {
      const res = await axios({
        method: 'PUT',
        url: `http://localhost:8800/api/comments/${comment._id}`,
        withCredentials: true,
        credentials: true,
        data: {comment: editInput}
      })
      console.log(res)
      if (res) {
        setEditLoading(false)
        window.location.reload()
      }
    } catch(err) {
      console.log(err)
    }
  }
  const handleEditChange = e => {
    setEditInput(e.target.value)
  }
  const handleEditClose = () => {
    setIsEditing(false)
  }
  const handleDelete = async () => {
    setHasModal(true)
  }

  const date = new Date(comment.createdAt)

  if (loading) return <div className='spinner'></div>

  return <>
    {
      comment.replyingTo === undefined && <div className='comment-replies-container'>
        {
          !isEditing ? <>
            <div className='replies-line'></div>
            <div className="singleComment">
              <Likes score={comment.score} id={comment._id} usersWhoLiked={comment.usersWhoLiked} usersWhoDisliked={comment.usersWhoDisliked}></Likes>
              <div className='comment-content'>
                <div className='info-container'>
                  <div className='info'>
                    <img src={avatar} alt='avatar' className='avatar'></img>
                    <p>{comment.author.username}</p>
                    <span className='date'>{date.toLocaleString('en-US', { hour12: false })}</span>
                  </div>
                  <div className='del-reply'>
                    {
                      (() => {
                        if (user !== null && user.username === comment.author.username) {
                          return (
                            <>
                              <div className='edit-container'>
                                <button className='edit' onClick={handleEdit}>
                                  <img src={edit} alt='editar' />
                                </button>
                              </div>
                              <div className='delete-container'>
                                <button className='delete' disabled={loading} onClick={handleDelete}>
                                  <img alt='DELETE' src={del} />
                                </button>
                              </div>
                            </>
                          )
                        }
                        return null;
                      })()
                    }
                    <div className='reply-container'>
                      <button onClick={handleReply} className='reply-button'>
                        <img src={replieSvg} alt='reply'></img>
                        <span>Reply</span>
                      </button>

                    </div>
                  </div>
                </div>
                <h4 className='comment'>{comment.comment}</h4>
              </div>

            </div>
          </>
          : <div className={`editComment`}>
          <img src={avatar} alt='avatar' className='avatar'/>
          <textarea
            className='comment-content'
            autoFocus={true}
            onFocus={e => e.target.selectionStart = comment.comment ? `${comment.comment}`.length : 0}
            onChange={handleEditChange}
            defaultValue={comment.comment ? `${comment.comment}` : ''} />
          <button className='send-reply' disabled={editLoading} onClick={handleEditButton}>{
            (() => {
              if (editLoading) return <div class="spinner2"></div>
              return 'EDIT'
            })()
          }</button>
          <button className='edit-close' onClick={handleEditClose}>X</button>
        </div>
      
        }

        {
          hasInput ? <NewComentario repliedTo={comment.author.username} repliedComment={comment._id} /> : null
        }

        {
          replies.map(replie => {
            return <Reply
              key={replie._id}
              repliedTo={replie.replyingTo}
              comment={replie.comment}
              score={replie.score}
              username={replie.author.username}
              createdAt={replie.createdAt}
              parentCommentId={comment._id}
              usersWhoLiked={replie.usersWhoLiked} 
              usersWhoDisliked={replie.usersWhoDisliked}
              id={replie._id} />
          })
        }

      </div>
    }
    {
      hasModal && <DeleteModal state={setHasModal} id={comment._id} ></DeleteModal>
    }
  </>
}