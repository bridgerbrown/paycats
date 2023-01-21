import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import React from 'react'

export default function PayRequest() {
    return (
        <div className='w-screen relative font-Hind bg-stone-100'>
        <Navbar />
            <div className='flex justify-center'>
                <div className=' w-192 mt-8 mb-4'>
                    <h1 className='text-xl font-normal tracking-wide'>Pay/Request</h1>
                </div>
            </div>
            <div className='flex justify-center pb-96'>
                <div className='rounded-lg border border-slate-300 pt-4 mt-0 mb-10 font-Hind bg-white mx-20 w-192'>
                    <div className='border-b border-slate-300 mx-5 pb-4 flex justify-between items-center'>
                        <div className='flex items-center'>
                            <h2>To:</h2>
                            <button 
                                className='hover:bg-slate-100 hover:text-blue-700 hover:border-blue-700 flex justify-center items-center border-2 rounded-full px-2.5 py-0.5 mx-2 mt-0.5 text-blue-900 font-semibold border-blue-900'>
                                +
                            </button>
                        </div>
                        <input className='flex justify-end items-end active:outline-none focus:outline-none border-none text-slate-500 text-xl' type="text" placeholder='$0'/>
                    </div>
                    <div className='mx-5 my-3'>
                        <textarea placeholder="What's it for?" 
                            className='w-full h-60 text-slate-500 border-none focus:border-none active:border-none'
                        />
                    </div>
                    <div className='flex'>
                        <button className='hover:bg-blue-700 text-xl bg-blue-900 px-46 w-1/2 text-white'>
                            Pay
                        </button>
                        <button className='hover:bg-blue-700 border-l border-slate-300 text-xl bg-blue-900 w-1/2 py-4 text-white'>
                            Request
                        </button>
                    </div>
                </div>
            </div>
            <div className='pb-60'></div>
        <Footer />
        </div>
    )
}