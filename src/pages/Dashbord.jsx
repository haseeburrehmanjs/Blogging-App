import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useRef, useState } from 'react'
import { auth, db, getData, sendData } from '../Config/firebase/FirebaseMethod'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Button, Typography } from '@mui/material'
import BlogsPost from '../components/BlogsPost'
import { collection, query, where, getDocs } from "firebase/firestore";

const Dashbord = () => {
  // check user status user loggedin or not
  let navigate = useNavigate()

  // here is input state...
  let titleRef = useRef()
  let articleRef = useRef()

  const [blogs, setBlogs] = useState([])
  const [SingalUserData, setSingalUserData] = useState([])

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user.uid)
        const q = query(collection(db, "users"), where("id", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          setSingalUserData(doc.data())
        });
        const blogsData = await getData("blogs", user.uid)
        console.log(blogsData)
        setBlogs([...blogsData])
      }
    })
  }, [])

  // send data firestore
  const sendDataFromFireStore = async (event) => {
    event.preventDefault()
    if (titleRef.current.value === '' || articleRef.current.value === '') {
      alert('please check it!')
    } else {
      console.log(titleRef.current.value);
      console.log(articleRef.current.value);
      blogs.push({
        title: titleRef.current.value.toUpperCase(),
        article: articleRef.current.value.toUpperCase(),
        uid: auth.currentUser.uid
      })
      setBlogs([...blogs])
      const sendBlogs = await sendData({
        title: titleRef.current.value.toUpperCase(),
        article: articleRef.current.value.toUpperCase(),
        uid: auth.currentUser.uid
      }, "blogs")

      console.log(sendBlogs);
      titleRef.current.value = ''
      articleRef.current.value = ''
    }
  }



  return (
    <div>
      <Navbar profile="profile" dashbord="Dashbord" />
      <div className='p-3 container mx-auto'>
        <Typography variant='h3' fontWeight='bold' className='p-2'>Write Blog</Typography>
        <hr />
        <div className='mt-10'>
          <form className='flex flex-col gap-2'>
            <input ref={titleRef} className='border rounded pl-2 outline-none border-gray-200 w-[100%] h-[46px]' type="text" placeholder='Enter Title' />
            <textarea ref={articleRef} className='p-2 w-[100%] shadow-[] rounded border-gray-200 border outline-none' cols='165' rows='6' name="" id="" placeholder='Enter articlee'>
            </textarea>
            <Button onClick={sendDataFromFireStore} variant='contained'>Publish Post</Button>
          </form>
        </div>
        <div className='mt-4'>
          <Typography variant='h4' className='mt-4'>
            Your Article Here.
          </Typography>
          <div className='mt-4 flex flex-col flex-wrap gap-3'>
            {blogs.length > 0 ? blogs.map((item, index) => (
              <BlogsPost user={SingalUserData} key={index} blogs={item} />
            )) : <h1>No Blogs Found...</h1>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashbord
