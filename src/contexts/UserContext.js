import React, { createContext, useEffect, useReducer } from 'react'

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  error: null,
}

export const UserContext = createContext(INITIAL_STATE)

const UserReducer = (state, action) => {
  switch (action.type) {
    case 'INITIAL':
      return {
        user: null,
        loading: false,
        error: null,
      }
    case 'LOGIN_START':
      return {
        user: null,
        loading: true,
        error: null,
      }
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        loading: false,
        error: null,
      }
    case 'LOGIN_FAILURE': 
      return {
        user: null,
        loading: false,
        error: action.payload 
      }
    default: 
      return state
  }
}

const UserContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE)

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user))
  }, [state.user])

  return <UserContext.Provider value={{
    user: state.user,
    loading: state.loading,
    error: state.error,
    dispatch,
  }} >{children}</UserContext.Provider>
}
export { UserContextProvider }