import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect } from 'react'
import { auth, getData, signOutUser } from '../Config/firebase/FirebaseMethod'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import { Button, Typography } from '@mui/material'

const Dashbord = () => {
  let navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('user login ha')
        const blogsData = await getData('users', user.uid)
        console.log(blogsData);
      } else {
        console.log('user logout ho giya ha');
        navigate('/login')
      }
    })
  }, [signOutUser])

  return (
    <div>
      <Navbar profile="profile" dashbord="Dashbord" />
      <div className='p-3'>
          <Typography variant='h2' fontWeight='bold' className='p-2'>Dashbord</Typography>
          <hr />
        <div className='mt-10'>
          <form className='flex flex-col gap-2'>
            <input className='border rounded pl-2 border-gray-500 w-[100%] h-[46px]' type="text" placeholder='Enter Title' />
            <textarea className='p-2 w-[100%] shadow-[] rounded border-gray-500 border outline-none' cols='165' rows='6' name="" id="" placeholder='Enter Articale'>
            </textarea>
            <Button variant='contained'>Publish Post</Button>
          </form>
        </div>
        <div className='mt-4'>
          <Button variant='contained' onClick={signOutUser}>logout</Button>
        </div>
      </div>
    </div>
  )
}

export default Dashbord
