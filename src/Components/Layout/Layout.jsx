import React from 'react'
import NavApp from '../NavApp/NavApp'

import { Outlet } from 'react-router-dom'
import FooterApp from '../Footer/Footer'

export default function Layout() {
  return <>
  <NavApp/>
  <div className=' min-h-screen bg-slate-500 overflow-hidden'>
  <Outlet/>
  </div>
  </>
}
