import React, { useRef } from 'react'
import { signUpUser, uploadImage } from '../Config/firebase/FirebaseMethod'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'

const Register = () => {
  let fullName = useRef()
  let email = useRef()
  let password = useRef()
  let myFile = useRef()

  // for navigation
  let navigate = useNavigate()

  let registerUser = async (event) => {
    event.preventDefault()

    let userProfileUrl = await uploadImage(myFile.current.files[0], email.current.value)
    console.log(userProfileUrl);

    let registerUserData = await signUpUser({
      fullname: fullName.current.value,
      email: email.current.value,
      password: password.current.value,
      userProfile: userProfileUrl
    })
    console.log('user register successfully', registerUserData);
    navigate('/login')
  }
  return (
    <div>
        <Navbar login="Login"/>
      <section className="container mx-auto p-4">
        <div className="login-section max-w-md mx-auto mt-[180px] lg:mt-[100px] first:md:mt-[70px] bg-white shadow-lg p-6 rounded-lg">
          <form onSubmit={registerUser} className="flex flex-col gap-4">
            <input
              ref={fullName}
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              type="text"
              placeholder="Full Name"
              required
            />
            <input
              ref={email}
              type="email"
              placeholder="Email"
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              ref={password}
              type="password"
              placeholder="Password"
              required
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="file"
              ref={myFile}
              placeholder="file"
              required
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div id="loadingDiv" className="mt-4">
              <div className="text-center">
                <button
                  id="registorBtn"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Register
                </button>
                <br />
              </div>
            </div>
            <Link to='/login' className="text-center text-blue-500 hover:underline mt-4">
              ALREADY A USER? PLEASE LOGIN
            </Link>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Register