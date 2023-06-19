import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {getAuth, onAuthStateChanged} from "firebase/auth";
export default function Header() {
  const [pageState, setPageState] = useState("Sign in");
  const Location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
 
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        setPageState("profile")
      } else {
        setPageState("Sign in");
      }
    })
  }, [auth])

  function pathMatchRoute(route) {
    if (route === Location.pathname) {
      return true
    }
  }
  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-40'>
      <header className='flex justify-between items-center px-3 max-w-xl mx-auto'>
        <div>
          <img src='https://img.freepik.com/premium-vector/real-estate-logo_74869-159.jpg' alt='Logo' className='h-12 cursor-pointer'
          onClick={() => navigate("/")}
          
          />
        </div>
        <div>
          <ul className='flex space-x-10'>
            <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute("/") && "text-black border-b-red-500"}`}
            onClick={() => navigate("/")}
            >
              Home
            </li>

            <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute("/offers") && "text-black border-b-red-500"}`}
            onClick={() => navigate("/offers")}
            > 
              Offers
            </li>

              <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
             (pathMatchRoute("/sign-in") ||  pathMatchRoute("/profile")) && "text-black border-b-red-500"}`}
            
              onClick={() => navigate("/profile")}
            > 
              {pageState}
            </li>
              
          </ul>
        </div>
      </header>
    </div>
  )
}