import Footer from '@/components/sections/footer'
import Navbar from '@/components/sections/navbar'
import UserSelectDropdown from '@/components/sections/user-dropdown/user-select-dropdown'
import React, { useState, MouseEvent } from 'react'
import Image from 'next/image'
import { useAuth } from '@/components/context/AuthContext'
import { updateTransactions, updateBalance } from '@/components/firebase/firestore'
import { useRouter } from 'next/router'

interface FormType {
    id: number | null,
    from: string,
    to: string,
    payRequest: string,
    amount: number,
    description: string,
    likes: number,
    likedByUser: boolean,
    comments: any
}

export default function PayRequest() {
    const router = useRouter()
    const { userFound, setUserDoc, userDoc } = useAuth()
    const [toDropdown, setToDropdown] = useState<boolean>(false)
    const [toImage, setToImage] = useState<string | null>(null)
    const [radioState, setRadioState] = useState<string>("pay")
    const [formContents, setFormContents] = useState<FormType>({    
        id: userDoc.transactions.length,   
        from: userFound.substring(0, userFound.lastIndexOf("@")),
        to: "",
        payRequest: radioState,
        amount: 0,
        description: "",
        likes: 0,
        likedByUser: false,
        comments: []
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

    function sendUserTransaction() {
        const amountValue = parseInt((document.getElementById("amount") as HTMLInputElement).value)
        const descriptionValue = (document.getElementById("description") as HTMLInputElement).value
        setFormContents({
            ...formContents,
            id: userDoc.transactions.length,
            amount: amountValue,
            description: descriptionValue,
            payRequest: radioState,
        })
        const allTransactions = [...userDoc.transactions, formContents]
        setUserDoc(
            {   ...userDoc,
                transactions: allTransactions
            })
        updateTransactions(userFound, allTransactions)
    }

    async function submitForm(e: MouseEvent<HTMLButtonElement>) {
        const amountValue = parseInt((document.getElementById("amount") as HTMLInputElement).value)
        const balanceDeducted = parseInt(userDoc.balance) - amountValue
        if(formContents.payRequest == "pay") {
            if (balanceDeducted <= 0) {
                alert("Not enough money in your balance.")
            } else {
                sendUserTransaction()
                setUserDoc({
                    ...userDoc,
                    balance: balanceDeducted
                })
                updateBalance(userFound, balanceDeducted)
            }
            router.push("/my-transactions")
        } else(
            sendUserTransaction(),
            router.push("/my-transactions")
        )
    }

    console.log(userDoc)


    const payRequestButtonStyling = `flex h-16 justify-center items-center bg-blue-400 text-white cursor-pointer focus:outline-none border-none hover:bg-blue-500 peer-checked:bg-blue-700 peer-checked:border-transparent`

    return (
        <div className='w-screen min-h-screen relative font-Hind bg-stone-100'>
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
                    <textarea placeholder="What's it for?" 
                        className='w-full resize-none h-60 text-black border-none focus:border-none active:border-none'
                        id='description'
                    />
                    <div className='w-192'>
                        <ul className="w-192 flex">
                            <li className="w-1/2">
                                <input className="sr-only peer" type="radio" defaultChecked value="yes" name="answer" id="answer_yes"/>
                                <label className={payRequestButtonStyling} htmlFor="answer_yes">Pay</label>
                            </li>
                            <li className="w-1/2">
                                <input className="sr-only peer" type="radio" value="no" name="answer" id="answer_no"/>
                                <label className={payRequestButtonStyling} htmlFor="answer_no">Request</label>
                            </li>
                        </ul>
                    </div>
                    <div className=''>
                        <button
                            onClick={submitForm}
                            className='w-192 h-16 bg-slate-300 rounded-none hover:bg-green-400'
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}