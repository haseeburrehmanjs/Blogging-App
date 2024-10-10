import { Button } from '@mui/material';
import React, { useState } from 'react'

const BlogsPost = ({ blogs, user, index}) => {
    const { title, article, currentDate } = blogs
    console.log(blogs);
    console.log(index);
    
    // console.log(user);
    const { email, fullname, userProfile } = user
    return (
        <>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden ">
                <div className="flex items-center p-4">
                    <img
                        src={userProfile}
                        alt=""
                        className="w-14 h-14 rounded-full border-2 border-gray-300 mr-4 object-cover"
                    />
                    <div>
                        <h2 className="text-xl font-semibold">{title}</h2>

                        <p className="text-gray-500 text-sm">Time: {currentDate}</p>

                    </div>
                </div>
                <p className="text-gray-600 p-4 ">{article}</p>
                <div className='p-4 mb-3 flex gap-5'>
                    <Button onClick={() => deleteBlog(index)} variant='contained'>Edit</Button>
                    <Button variant='contained' color='error'>Delete</Button>
                </div>
            </div>
        </>
    )
}

export default BlogsPost
