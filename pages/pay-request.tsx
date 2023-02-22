import Footer from '@/components/sections/footer'
import Navbar from '@/components/sections/navbar'
import UserSelectDropdown from '@/components/sections/user-dropdown/user-select-dropdown'
import React, { useState, MouseEvent, useEffect } from 'react'
import Image from 'next/image'
import { useAuth } from '@/components/context/AuthContext'
import { updateTransactions, updateBalance, updateNotifications } from '@/components/firebase/firestore'
import { useRouter } from 'next/router'
import { GetServerSideProps, InferGetServerSidePropsType, } from 'next'
import { collection, getDocs} from "firebase/firestore";
import { db } from '@/components/firebase/firebase.config'
import { catUsers } from '@/components/data/catUsers'
import { updateUnread } from '@/components/firebase/firestore'
import LoadingCircle from '@/components/features/loading-circle'

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

export default function PayRequest({users}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter()
    const { userFound, setUnreadBell } = useAuth()
    const findUser = users.find((item: any) => item.email === userFound)
    const [toDropdown, setToDropdown] = useState<boolean>(false)
    const [toImage, setToImage] = useState<string | null>(null)
    const [radioState, setRadioState] = useState<string>("pay")
    const [loadingTransition, setLoadingTransition] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [formContents, setFormContents] = useState<FormType>({    
        id: findUser.transactions.length,   
        from: userFound.substring(0, userFound.lastIndexOf("@")),
        to: "",
        payRequest: radioState,
        amount: 0,
        description: "",
        likes: 0,
        likedByUser: false,
        comments: []
    })

    useEffect(() => {}, [errorMessage])

    function recipientImagePreview(image: string, name: string) {
        setToImage(image)
        setFormContents({...formContents, to: name})
    }

    function cancelSelection() {
        setToDropdown(false)
        setFormContents({...formContents, to: ""})
        setToImage(null)
    }

    const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRadioState(e.currentTarget.value)
    }
    console.log(radioState)

    const getNewComment = (toUser: string) => {
        const getRandomInt = (max: number) => {return Math.floor(Math.random() * max)}
        let findMessage
        let findCat: any = catUsers.find((item) => item.name === toUser)
        if(radioState == "pay"){
            findMessage = findCat.paidComments[getRandomInt(1)]
            console.log(findMessage)
        } else{
            findMessage = findCat.requestedComments[getRandomInt(1)]
            console.log(findMessage)
        }
        return {
            from: toUser,
            message: findMessage,
        }
    }

    const getNewNotification = (toUser: string) => {
        let notificationMessage
        let type
        if(radioState == "pay"){
            notificationMessage = `You successfully paid ${toUser}!`
            type = 'payment'
        } else {
            if(toUser === "Mr. Bitters"){
                notificationMessage = `Mr. Bitters has denied your payment request! Typical...`
                type = "requestDenied"
            } else {
                notificationMessage = `${toUser} accepted your payment request!`
                type = "requestApproved"
            }
        }
        updateUnread(findUser.email, true)
        setUnreadBell(true)
        return {
            message: notificationMessage,
            type: type,
            id: findUser.notifications.length,
            read: false,
        }
    }

    function sendUserTransaction() {
        const amountValue = parseInt((document.getElementById("amount") as HTMLInputElement).value)
        const descriptionValue = (document.getElementById("description") as HTMLInputElement).value
        const payRequestValue = (document.getElementById("paySelect") as HTMLInputElement).value
        console.log(payRequestValue)
        setFormContents({
            ...formContents,
            id: findUser.transactions.length,
            amount: amountValue,
            description: descriptionValue,
            payRequest: radioState,
        })
        const allTransactions = [...findUser.transactions, {
            ...formContents,
            id: findUser.transactions.length,
            amount: amountValue,
            description: descriptionValue,
            payRequest: radioState,
            comments: [getNewComment(formContents.to)]
        }]
        const commentNotification: any= {
            message: `${formContents.to} commented on your transaction!`,
            type: "commented",
            id: findUser.notifications.length + 1,
            read: false
        }
        updateTransactions(userFound, allTransactions)
        const allNotifications = [
                ...findUser.notifications, commentNotification, getNewNotification(formContents.to)
        ]
        updateNotifications(userFound, allNotifications)
    }

    function checkFields(){
        const amountValue = parseInt((document.getElementById("amount") as HTMLInputElement).value)
        const descriptionValue = (document.getElementById("description") as HTMLInputElement).value
        const correctTo = formContents.to !== "" ? true : false
        const correctAmount = Number.isInteger(amountValue) ? true : false
        const correctDescription = descriptionValue ? true : false
        console.log("to: " + correctTo)
        console.log("amount: " + correctAmount)
        console.log("desc: " + correctDescription)
        if(!correctTo){
            setErrorMessage("Set a user to make a transaction with!")
            return false
        } else if(!correctAmount){
            setErrorMessage("Make sure to set a correct amount.")
            return false
        } else if(!correctDescription){
            setErrorMessage("Make sure to set a description!")
            return false
        } else {
            return true
        }
    }


    async function submitForm(e: MouseEvent<HTMLButtonElement>) {
        const amountValue = parseInt((document.getElementById("amount") as HTMLInputElement).value)
        const balanceDeducted = parseInt(findUser.balance) - amountValue
        const balanceAdded = parseInt(findUser.balance) + amountValue
        checkFields()
        if(checkFields()){
            setErrorMessage("")
            if(radioState == "pay") {
                if (balanceDeducted <= 0) {
                    alert("Not enough money in your balance.")
                } else {
                    sendUserTransaction();
                    updateBalance(userFound, balanceDeducted);
                    setTimeout(() => {router.push("/my-transactions");}, 1000)
                }
            } else {
                if (formContents.to === "Mr. Bitters"){
                    console.log("denied")
                    const allNotifications = [
                        ...findUser.notifications, getNewNotification(formContents.to)
                    ]
                    updateNotifications(userFound, allNotifications)
                    setTimeout(() => {router.push("/my-transactions");}, 1000)
                } else {
                    sendUserTransaction();
                    updateBalance(userFound, balanceAdded);
                    setTimeout(() => {router.push("/my-transactions");}, 1000)
                }
            }
            setLoadingTransition(true)
        }
    }

    const payRequestButtonStyling = `flex h-16 justify-center items-center bg-blue-400 text-white cursor-pointer focus:outline-none border-none hover:bg-blue-500 peer-checked:bg-blue-600 peer-checked:border-transparent`

    return (
        <div className='w-screen min-h-screen relative font-Hind bg-stone-100'>
            <Navbar />
            <div className='flex justify-center'>
                <div className='xs:w-11/12 sm:w-144 lg:w-192 mt-8 mb-4'>
                    <h1 className='text-xl font-normal tracking-wide'>Pay/Request</h1>
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='xs:w-11/12 sm:w-144 lg:w-192 rounded-lg border border-slate-300 pt-4 mt-0 xs:mb-4 sm:mb-10 font-Hind bg-white'>
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
                                    alt="pay request recipient option"
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
                        <div className="mr-2 before:text-xl before:ml-3 before:mt-1.25 relative before:absolute before:content-['$']">
                            <input className='w-24 pl-7 flex justify-end items-end active:outline-none focus:outline-none border-none text-black text-xl' 
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
                        className='w-full px-4 py-4 resize-none h-60 text-black border-none focus:border-none active:border-none'
                        id='description'
                    />
                    <div className='xs:w-full sm:w-144 lg:w-192'>
                        <form action="">
                            <ul className="flex">
                                <li className="xs:w-1/2 sm:w-1/2">
                                    <input onChange={(e) => onRadioChange(e)} className="sr-only peer" type="radio" defaultChecked value="pay" name="payRequest" id="paySelect"/>
                                    <label className={payRequestButtonStyling} htmlFor="paySelect">Pay</label>
                                </li>
                                <li className="xs:w-1/2 sm:w-1/2">
                                    <input onChange={(e) => onRadioChange(e)} className="sr-only peer" type="radio" value="request" name="payRequest" id="requestSelect"/>
                                    <label className={payRequestButtonStyling} htmlFor="requestSelect">Request</label>
                                </li>
                            </ul>
                        </form>
                    </div>
                    <div className=''>
                        <button
                            onClick={submitForm}
                            className='xs:w-full sm:w-144 lg:w-192 h-16 bg-blue-800 text-white rounded-none hover:bg-blue-700'
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            <div className='w-screen flex justify-center items-center pt-4 pb-60'>
                {
                    loadingTransition ?
                    <LoadingCircle />
                    :
                    <div className='pb-32'><h2 className='text-red-500'>{errorMessage}</h2></div>
                }
            </div>
            <Footer />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const usersRef = collection(db, 'users')
    const users: any = []
    const snapshot = await getDocs(usersRef)
    snapshot.forEach((doc) => {
        users.push({ ...doc.data() })
        })
    return {
        props: {
            users: users
        }
    }
}