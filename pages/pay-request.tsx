import Footer from '@/components/sections/footer'
import Navbar from '@/components/sections/navbar'
import UserSelectDropdown from '@/components/sections/user-dropdown/user-select-dropdown'
import React, { useState, MouseEvent } from 'react'
import Image from 'next/image'
import { useAuth } from '@/components/context/AuthContext'

interface Form {
    to: string,
    payRequest: string,
    amount: string | null,
    description: string,
}

export default function PayRequest() {
    const { user, setUserDoc } = useAuth()
    const [toDropdown, setToDropdown] = useState<boolean>(false)
    const [toImage, setToImage] = useState<string | null>(null)
    const [radioState, setRadioState] = useState<string>("pay")
    const [formContents, setFormContents] = useState<Form>({
        to: "",
        payRequest: "",
        amount: "",
        description: "",
    })

    function recipientImagePreview(image: string, name: string) {
        setToImage(image)
        setFormContents({...formContents, to: name})
    }

    function cancelSelection() {
        setToDropdown(false)
        setToImage(null)
    }

    const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRadioState(e.currentTarget.value)
    }

    // const sendTransaction = () => {
    //     return new Promise(resolve => {
    //         resolve(

    //             )
    //     })
    // }

    async function payForm(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        const amountValue = (document.getElementById("amount") as HTMLInputElement).value
        const descriptionValue = (document.getElementById("description") as HTMLInputElement).value
        let promise = new Promise(() => {
            setFormContents({
                ...formContents,
                amount: amountValue,
                description: descriptionValue,
                payRequest: radioState,
        })})
        await promise
            .then()
    }

    console.log(formContents)

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
                    <div className='border-b border-slate-300 pb-4 flex justify-between items-center'>
                        <div className='h-12 mx-4 flex items-center z-0'>
                            <h2>To:</h2>
                            {!toDropdown ? 
                            <button 
                                className='hover:bg-slate-100 hover:text-blue-700 hover:border-blue-700 flex justify-center items-center border-2 rounded-full px-2.5 py-0.5 mx-4 mt-0.5 text-blue-900 font-semibold border-blue-900'
                                onClick={() => setToDropdown(!toDropdown)}
                                >
                                +
                            </button>
                            : 
                            <div className='flex'>
                                { toImage ? 
                                <div className='flex'>
                                    <Image 
                                    src={`/${toImage}`}
                                    width={498}
                                    height={500}
                                    alt="Cat headshot number one"
                                    className='object-cover w-12 h-12 rounded-full border border-slate-400 ml-4'
                                    />
                                    <p className='text-slate-600 cursor-pointer ml-1.5 py-0 leading-none font-hind text-sm'
                                    onClick={cancelSelection}
                                    >x</p>
                                </div>
                                :
                                <div className='border-slate-400 border w-12 h-12 rounded-full ml-4'>

                                </div>
                                }
                            </div>
                            }
                        </div>
                        <div className="before:text-xl before:ml-3 before:mt-1.25 relative before:absolute before:content-['$']">
                            <input className=' pl-7 flex justify-end items-end active:outline-none focus:outline-none border-none text-black text-xl' 
                                type="number" placeholder='0.00' min="0.00" max="10000.00" step="0.01" 
                                required 
                                id='amount'
                            />
                        </div>
                    </div>
                    { toDropdown ? 
                        !toImage ?
                        <UserSelectDropdown recipientImagePreview={recipientImagePreview} />
                        :
                        <div></div>
                    :
                    <div></div>
                    }
                    <div className='mx-5 my-3'>
                        <textarea placeholder="What's it for?" 
                            className='resize-none w-full h-60 text-black border-none focus:border-none active:border-none'
                            id='description'
                        />
                    </div>
                    <div className=''>
                        <form action="" className='flex w-192'>
                            <label htmlFor="payBtn"
                                className='text-white relative z-10 top-4 left-paybtn w-0'
                            >Pay</label>
                            <input className='checked:bg-blue-700 active:bg-blue-700 text-white cursor-pointer active:bg-blue-700 after:bg-blue-700 hover:bg-blue-700 text-xl bg-blue-900 px-46 rounded-none h-16 w-1/2 text-white'
                                type="radio" name="payBtn" id="payRequestForm" value="pay"
                                onChange={(e) => onRadioChange(e)}
                                />
                            <label htmlFor="payBtn"
                                className='text-white w-0 relative z-10 top-4 left-requestbtn mx-0'
                            >Request</label>
                            <input className='text-white cursor-pointer mx-0 checked:bg-blue-700 hover:bg-blue-700 border-l border-slate-300 h-16 rounded-none text-xl bg-blue-900 w-1/2 py-4 text-white'
                                type="radio" name="requestBtn" id="payRequestForm" value="request"
                                onChange={(e) => onRadioChange(e)}
                                />
                        </form>
                    </div>
                </div>
            </div>
            <div className='pb-60'></div>
            
        <Footer />
        </div>
    )
}