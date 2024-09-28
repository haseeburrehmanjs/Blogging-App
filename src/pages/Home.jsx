import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, getAllData } from '../Config/firebase/FirebaseMethod'
import { Typography } from '@mui/material'
import Navbar from '../components/Navbar'
import BlogsPost from '../components/BlogsPost'

const Home = () => {
  const [allBlogs, setallBlogs] = useState([])

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('user login ha')
        let getAllDataFromDb = await getAllData("blogs")
        setallBlogs([getAllDataFromDb])
        // console.log(allBlogs);
        console.log(getAllDataFromDb);
      } else {
        console.log('user logout ho giya ha');
      }
    })
  }, [])



  return (
    <>
      <Navbar login="login" userName='haseeb ur rehman' />
      <section className='container mx-auto p-1'>
        <Typography variant='h3' fontWeight='bold' className='p-2'>Write Blog</Typography>
        <hr />

        {allBlogs.length > 0 ? <div>data ha bhai mara </div>  : <p>No Blogs Found...</p>}
      </section>
    </>
  )
}

export default Home
