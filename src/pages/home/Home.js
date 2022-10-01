import Comentario from '../../components/comentario/Comentario.js'
import './home.css'
import React, {useEffect} from 'react'
import NewComentario from '../../components/newComentario/NewComentario.js'
import { useFetch } from '../../hooks/useComments.js'
import { UserContext } from '../../contexts/UserContext.js'
import { useContext } from 'react'

export default function Home() {
  const { loading, comments, error } = useFetch()
  const { dispatch } = useContext(UserContext)

  useEffect(() => {
    if (document.cookie.split('=')[0] !== 'access_token') {
      localStorage.setItem('user', null)
      dispatch({type: 'INITIAL'})
    }
  }, [])

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