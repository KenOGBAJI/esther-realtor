import { getAuth, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../firebase';

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const {name, email} = formData;
  function onLogout() {
    auth.signOut();
    navigate("/");
  }

  function onChange(e) {
   setFormData((prevState) => ({
    ...prevState,
    [e.target.id]: e.target.value,
   }));
  }

  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {

        // update display name in firebase with
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        
        // update name in the firestore
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      };
      toast.success("Profile details updated");

    } catch (error) {
      toast.error("Could not update the profile detail")
    }
  };
  return (
    <>
      <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
        <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>
        <div className='w-full md:w-[50%] mt-6 px-3'>

          <form>
            {/* {Name imput} */}
           <input
            type=" text" 
            id='name' 
            value={name} 
            disabled={!changeDetail}
            onChange={onChange} 
            className={`mb-6 w-full    px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${changeDetail && "bg-red-200 focus:bg-red-200"}`}
          />


            {/* email input */}
            <input 
               type=" email"
               id="email"
               value={email}
               disabled //={!changeDetail}
              //  onChange={onChange}
               className="mb-6 w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out x"
            />

            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='flex items-center'>Do you want to change your name?
               <span
              onClick={() => {
                changeDetail && onSubmit();
                setChangeDetail((prevState) => !prevState);
              }}
                
              className='text-red-600 hover:text-red-800 transition ease-in-out duration-200 ml-1 cursor-pointer'>
                {changeDetail ? "Apply change" : "Edith" }
                </span></p>
              <p onClick={onLogout} className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer'>Sign out</p>
            </div>
          </form>

        </div>
      </section>
    </>
  )
}
