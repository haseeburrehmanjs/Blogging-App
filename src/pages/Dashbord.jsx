import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect } from 'react'
import { auth, getData, signOutUser } from '../Config/firebase/FirebaseMethod'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'

const Dashbord = () => {
  let navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('user login ha')
      }else {
        console.log('user logout ho giya ha');
        navigate('/login')
      }
    })
  }, [signOutUser])

  return (
    <div>
      <Navbar profile="profile" dashbord="Dashbord"/>
      dashBord
      <button onClick={signOutUser}>logout</button>
    </div>
  )
}

export default Dashbord
