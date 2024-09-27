import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useRef, useState } from 'react'
import { auth, getData, sendData, signOutUser } from '../Config/firebase/FirebaseMethod'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import { Button, Typography } from '@mui/material'
import BasicModal from '../components/Modal'

const Dashbord = () => {
  // check user status user loggedin or not
  let navigate = useNavigate()

  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user.uid)
        const blogsData = await getData("blogs", user.uid)
        console.log(blogsData)
        setBlogs([...blogsData])
      }
    })
  }, [signOutUser])

  // here is input state...
  let titleRef = useRef()
  let articleRef = useRef()

  // send data firestore
  const sendDataFromFireStore = async (event) => {
    event.preventDefault()
    if (titleRef.current.value === '' || articleRef.current.value === '') {
      alert('please check it!')
    } else {
      console.log(titleRef.current.value);
      console.log(articleRef.current.value);
      const sendBlogs = await sendData({
        title: titleRef.current.value,
        article: articleRef.current.value,
      }, "blogs")
      console.log(sendBlogs);
    }
    titleRef.current.value
    articleRef.current.value
  }
  return (
    <div>
      <Navbar profile="profile" dashbord="Dashbord" />
      <div className='p-3 container mx-auto'>
        <Typography variant='h2' fontWeight='bold' className='p-2'>Write Blog</Typography>
        <hr />
        <div className='mt-10'>
          <form onSubmit={sendDataFromFireStore} className='flex flex-col gap-2'>
            <input ref={titleRef} className='border rounded pl-2 outline-none border-gray-200 w-[100%] h-[46px]' type="text" placeholder='Enter Title' />
            <textarea ref={articleRef} className='p-2 w-[100%] shadow-[] rounded border-gray-200 border outline-none' cols='165' rows='6' name="" id="" placeholder='Enter articlee'>
            </textarea>
            <Button onClick={sendDataFromFireStore} variant='contained'>Publish Post</Button>
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
