import React, { useState } from 'react'

const BlogsPost = ({ blogs, user}) => {
    const { title, article, currentDate } = blogs
    console.log(blogs);
    
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
                <p className="text-gray-600 p-4 mb-4">{article}</p>
                {/* <div className="flex justify-between items-center p-4 border-t">
                    <button onClick={() => likeFunc(1 + like)} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
                        Like
                    </button>
                    <span className="text-gray-500">Likes: {like}</span>
                </div> */}
            </div>
        </>
    )
}

export default BlogsPost
