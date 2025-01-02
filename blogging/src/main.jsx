import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider,BrowserRouter, createBrowserRouter } from 'react-router-dom'
import SignUpPage from './pages/Signup.jsx'
import LoginPage from './pages/LoginPage.jsx';
import Home from './pages/Home.jsx';
import Myblogs from './pages/Myblogs.jsx';
import Addblog from './pages/addblog.jsx';
import Getstarted from './pages/Getstarted.jsx';
import AuthLayout from './AuthLayout.jsx'
const router=createBrowserRouter([
  {
    path:"/",
    element:<AuthLayout />,
    children:[{
      path:"",
      element:<Getstarted />,
    },
    {
      path:"signup",
      element:<SignUpPage />,
    },
    {
      path:"login",
      element:<LoginPage />,
    },]
  },
  {
    path:"homepage",
    element:<App/>,
    children:[
      {
        path:"",
        element:<Home />,
      },
      {
        path:"myblogs",
        element:<Myblogs />,
      },
      {
        path:"addblog",
        element:< Addblog/>,
      },
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
