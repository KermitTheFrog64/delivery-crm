import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../shared/hooks/redux'

import router from "./router"

import "./index.css"
import "./style.scss"
import { getAccessToken, fetchCurrentUser } from './app-slice'

const App: React.FC = () => {

  const dispatch = useAppDispatch()
  
  const accessToken = useAppSelector(getAccessToken)

  useEffect( () => {
    dispatch(fetchCurrentUser())
  }, [ accessToken ] )

  return (
    <RouterProvider router={router} />
  )
}

export default App
