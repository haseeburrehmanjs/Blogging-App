import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../Config/firebase/FirebaseMethod'

const Home = () => {
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('user login ha')
      } else {
        console.log('user logout ho giya ha');
      }
    })
  }, [])


  return (
    <>
      <Navbar login="login" userName='haseeb ur rehman' />
      <section className='container mx-auto p-1'>
        <div>
          Good Morning Readers
        </div>
      </section>
    </>
  )
}

export default Home
