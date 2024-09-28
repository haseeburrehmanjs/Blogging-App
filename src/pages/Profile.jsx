import React from 'react'
import Navbar from '../components/Navbar'
import { Typography } from '@mui/material'

const Profile = () => {
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
                        src="https://i.pinimg.com/564x/ac/f9/26/acf926941ce5d133eb017641b2019ffe.jpg"
                    />
                    <div className="text-center lg:w-2/3 w-full" bis_skin_checked={1}>
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                            Microdosing synth tattooed vexillologist
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
