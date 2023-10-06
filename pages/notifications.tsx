import Footer from '../components/general/Footer';
import Navbar from '../components/general/Navbar';
import React, { useEffect } from 'react';
import Notification from '../components/notifications/Notification';
import { GetServerSideProps, InferGetServerSidePropsType, } from 'next';
import { collection, getDocs} from "firebase/firestore";
import { db } from '../data/firebase/firebase.config';
import { useAuth } from '../data/context/AuthContext';
import { updateNotifications, updateUnread } from '../data/firebase/firestore';

export default function Notifications({users}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { userFound, setUnreadBell } = useAuth();
    const findUser = users.find((item: any) => item.email === userFound);
    const userNotifications = findUser.notifications;
    const sortedNotifications = userNotifications.sort(
        (p1: any, p2: any) => (p1.id < p2.id) ? 1 : (p1.id > p2.id) ? -1 : 0
    );

    useEffect(() => {}, []);

    function markAllRead() {
        const allRead = userNotifications.map((obj: any) => ({...obj, read: true}))
        updateNotifications(userFound, allRead)
        updateUnread(findUser.email, false)
        setUnreadBell(false)
    };
    markAllRead();

    return (
        <div className='min-h-screen w-screen relative font-Hind bg-stone-100'>
            <Navbar />
                <div className='flex justify-center'>
                    <div className='sm:w-144 lg:w-192 mt-8 mb-4'>
                        <h1 className='text-xl font-normal tracking-wide'>Notifications</h1>
                    </div>
                </div>
                <div className='flex justify-center'>
                <div className='shadow-md mb-60 rounded-lg border border-slate-300 flex py-4 font-Hind bg-white mx-20 sm:w-144 lg:w-192'>
                    <div className='flex flex-col'>
                            <div className='mt-4 mb-6 flex flex-col'>
                            { userNotifications.length > 0 ?
                                userNotifications.map((userNotification: any) => <Notification key={userNotification.id} userNotification={userNotification} findUser={findUser} /> )
                                :
                                <div className='sm:w-144 lg:w-192 justify-center mt-8 mb-2 flex items-center'>
                                    <h2 className='text-lg text-slate-500'>No notifications...</h2>
                                </div>
                            }
                            </div>
                        </div>
                    </div>
                </div>
            <Footer />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
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
