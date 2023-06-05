import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Header() {

  const Location = useLocation()
  const navigate = useNavigate()
 
  
  function pathMathRoute(route) {
    if (route === Location.pathname) {
      return true
    }
  }
  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-50'>
      <header className='flex justify-between items-center px-3 max-w-xl mx-auto'>
        <div>
          <img src='https://img.freepik.com/premium-vector/real-estate-logo_74869-159.jpg' alt='Logo' className='h-12 cursor-pointer'
          onClick={() => navigate("/")}
          
          />
        </div>
        <div>
          <ul className='flex space-x-10'>
            <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute("/") && "text-black border-b-red-500"}`}
            onClick={() => navigate("/")}
            >
              Home
            </li>

            <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute("/offers") && "text-black border-b-red-500"}`}
            onClick={() => navigate("/offers")}
            > 
              Offers
            </li>

            <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute("/sign-in") && "text-black border-b-red-500"}`}
            
            onClick={() => navigate("/sign-in")}
            > 
              Sign in
            </li>

          </ul>
        </div>
      </header>
    </div>
  )
}