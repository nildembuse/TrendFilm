import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import { createClient } from '@supabase/supabase-js'
import {RouterProvider ,createBrowserRouter } from 'react-router-dom'
import Home from './components/Home'

export const supabase = createClient('https://racoxqghzlyvqxcdbswn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhY294cWdoemx5dnF4Y2Ric3duIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4NzQ3NzcsImV4cCI6MjAxNTQ1MDc3N30.9EQCgqGVimw_G-LUciAmd6I07p5SiTY_JLGs7MnnO-U')

const router = createBrowserRouter (
  [
    {
      path:"/",
      element:<Home/>
    }    
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router = {router} />
)

