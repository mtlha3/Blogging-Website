import React from 'react'
import Getstarted from './pages/Getstarted'
import { Outlet } from 'react-router-dom'
function AuthLayout() {
  return (
    <div>
         <Outlet/>
    </div>
  )
}

export default AuthLayout