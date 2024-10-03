import React, { useRef, useState } from 'react'
import { signUpUser, uploadImage } from '../Config/firebase/FirebaseMethod'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { CircularProgress } from '@mui/material'
import Swal from 'sweetalert2'

const Register = () => {
  const fullName = useRef()
  const email = useRef()
  const password = useRef()
  const myFile = useRef()

  const [loading, setloading] = useState(false)

  // for navigation
  const navigate = useNavigate()

  const registerUser = async (event) => {
    event.preventDefault()
    setloading(true)
    try {
      // image to url converter
      const userProfileUrl = await uploadImage(myFile.current.files[0], email.current.value)
      console.log(userProfileUrl);

      const registerUserData = await signUpUser({
        fullname: fullName.current.value,
        email: email.current.value,
        password: password.current.value,
        userProfile: userProfileUrl
      })

      Swal.fire({
        title: 'Success!',
        text: 'Your are Register Successfully',
        icon: 'success',
        confirmButtonText: 'Login'
      })
        .then((result) => {
          if (result.isConfirmed) {
            navigate('/login')
          }
        });
      console.log('user register successfully', registerUserData);
      setloading(false)
    } catch (error) {
      setloading(false)
      Swal.fire({
        title: error,
        text: 'Use Another Email',
        icon: 'success',
        confirmButtonText: 'Login'
      })
        .then((result) => {
          if (result.isConfirmed) {
            // navigate('/login')
          }
        });
    }

  }
  return (
    <div>
      <Navbar login="Login" />
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
                  className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
                >
                  {loading ? <CircularProgress color='white' className='mt-1' size="20px" /> : "Register"}
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