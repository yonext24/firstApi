import Comentario from '../../components/comentario/Comentario.js'
import './home.css'
import React from 'react'
import NewComentario from '../../components/newComentario/NewComentario.js'
import { useFetch } from '../../hooks/useComments.js'

export default function Home() {
  const { loading, comments, error } = useFetch()

  comments.sort((a,b) => {
    if (a.score < b.score) return 1
    if (a.score > b.score) return -1
    return 0
  })

  return <div className="main-container">
    <NewComentario isFullWidth='isFullWidth' />
    {
      loading && <div className='spinner' style={{margin: '20px auto'}}></div> 
    }
    {
      error && <span style={{margin: '20px auto', color: 'red'}}>Error: cannot get comments</span>
    }
    {
      comments.map(comment => <Comentario 
        comment={comment}
        key={comment._id}
      ></Comentario>)
    }
  </div>
}