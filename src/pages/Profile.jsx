import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Typography } from '@mui/material'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../Config/firebase/FirebaseMethod'
import { collection, query, where, getDocs } from "firebase/firestore";

const Profile = () => {
    const [SingalUserData, setSingalUserData] = useState([])

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const q = query(collection(db, "users"), where("id", "==", user.uid));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        console.log(doc.data());
                        setSingalUserData(doc.data())
                    });
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log('user logout ho giya ha');
            }
        })
    }, [])

    return (
        <>
            <Navbar />
            <section className="text-gray-600 body-font container mx-auto p-2">
                <Typography variant='h3' fontWeight='bold' className='p-2 text-black'>Your Profile</Typography>
                <hr />
                <div
                    className="container mx-auto flex px-5 py-14 items-center justify-center flex-col"
                    bis_skin_checked={1}
                >
                    <img
                        className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
                        alt="hero"
                        src={SingalUserData.userProfile}
                    />
                    <div className="text-center lg:w-2/3 w-full" bis_skin_checked={1}>
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                            {SingalUserData.fullname}
                        </h1>
                        <p className="mb-8 leading-relaxed">
                            Meggings kinfolk echo park stumptown DIY, kale chips beard jianbing
                            tousled. Chambray dreamcatcher trust fund, kitsch vice godard disrupt
                            ramps hexagon mustache umami snackwave tilde chillwave ugh. Pour-over
                            meditation PBR&amp;B pickled ennui celiac mlkshk freegan photo booth af
                            fingerstache pitchfork.
                        </p>
                        <div className="flex justify-center" bis_skin_checked={1}>
                            <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                                Button
                            </button>
                            <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                                Button
                            </button>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Profile
