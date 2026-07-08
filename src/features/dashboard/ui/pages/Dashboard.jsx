import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleTheme } from '../../../../shared/state/themeSlice'

const Dashboard = () => {

  const dispatch = useDispatch()

  const handleTheme = () => {
    dispatch(toggleTheme())
  }

  return (
    <div>
      <p>Welcome to the Team Sync dashboard!</p>
      <button onClick={handleTheme}>Change Theme</button>
    </div>
  )
}

export default Dashboard
