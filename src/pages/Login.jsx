import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../Config/firebase/FirebaseMethod'
import Navbar from '../components/Navbar'
import { CircularProgress } from '@mui/material'
import Swal from 'sweetalert2'

const Login = () => {
    const email = useRef()
    const password = useRef()
    const navigate = useNavigate()

    const [loading, setloading] = useState(false)

    const loginUserFunc = async (event) => {
        setloading(true)
        event.preventDefault()
        console.log(email.current.value);
        console.log(password.current.value);

        try {
            const loginUserFromDatabase = await loginUser({
                email: email.current.value,
                password: password.current.value
            })
            Swal.fire({
                title: 'Success!',
                text: 'Your are Login Successfully',
                icon: 'success',
                confirmButtonText: 'Login'
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        navigate('/dashbord')
                    }
                });
            console.log('user login ho giya', loginUserFromDatabase);
            setloading(false)
        } catch (error) {
            Swal.fire({
                title: error,
                text: 'Please check email password!',
                icon: 'error',
                confirmButtonText: 'Try Again'
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        // navigate('/dashbord')
                    }
                });
            setloading(false)
        }
    }

    return (
        <>
            <Navbar register="Register" />
            <section className="container mx-auto p-4">
                <div className="login-section mt-[200px] lg:mt-[100px] first:md:mt-[100px] max-w-md mx-auto bg-white shadow-lg p-6 rounded-lg">
                    <form onSubmit={loginUserFunc} className="flex flex-col gap-4">
                        <label htmlFor="email" className="text-lg font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            ref={email}
                            placeholder="Enter Your Email"
                            required
                            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <label htmlFor="password" className="text-lg font-medium">
                            Password
                        </label>
                        <input
                            ref={password}
                            type="password"
                            placeholder="Enter Your Password"
                            required
                            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="mt-4">
                            <div className="text-center">
                                <button
                                    id="registorBtn"
                                    className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
                                >
                                    {loading ? <CircularProgress color='white' className='mt-1' size="20px" /> : "Login"}
                                </button>
                                <br />
                            </div>
                        </div>
                        <Link to='/register' className="text-center text-blue-500 hover:underline mt-4" >
                            NOT A USER? PLEASE REGISTER FIRST
                        </Link>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Login