import Footer from '@/components/general/Footer';
import Navbar from '@/components/general/Navbar';
import TransactionsSection from '@/components/transactions/TransactionsSection';
import { GetServerSideProps, InferGetServerSidePropsType, } from 'next';
import { collection, getDocs} from "firebase/firestore";
import { db } from '@/data/firebase/firebase.config';
import { useAuth } from '@/data/context/AuthContext';
import Loading from '@/components/general/Loading';
import { useEffect, MouseEvent } from 'react';
import { transactions } from '@/data/defaultTransactions';
import Welcome from '@/components/general/Welcome';

export default function Home({users}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {userFound, loading, welcome, setWelcome} = useAuth();
  const findUser = users.find((item: any) => item.email === userFound);

  useEffect(() =>{}, [welcome]);

  function enter(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    setWelcome(false)
  };

  if(loading) return (
    <div>
        <Loading/>
    </div>
  );

  return (
      <div className='w-screen min-h-screen relative bg-stone-100 font-Hind'>
          <Navbar />
          <div className='flex justify-center bg-stone-100'>
                <div className='xs:w-11/12 sm:w-144 lg:w-192 mt-8 mb-4'>
                    <h1 className='text-xl font-normal tracking-wide'>
                        Home
                    </h1>
                </div>
            </div>
          { userFound ?
            <TransactionsSection {...findUser} /> 
            :
            <TransactionsSection transactions={transactions} enter={enter} />
          }
          <Footer />
          {
            welcome ?
            <Welcome enter={enter}/>
            :
            <div></div>
          }
      </div>
  )
}; 

export const getServerSideProps: GetServerSideProps = async () => {
  const usersRef = collection(db, 'users');
  const users : any = [];
  const snapshot = await getDocs(usersRef);
  snapshot.forEach((doc) => {
      users.push({ ...doc.data() })
      })
  return {
      props: {
          users: users
      }
  }
};
