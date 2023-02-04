import Footer from '@/components/sections/footer'
import Navbar from '@/components/sections/navbar'
import SearchBar from '@/components/sections/search/search-bar'
import TransactionCard from '@/components/sections/transactions/transaction-card'
import TransactionsSection from '@/components/sections/transactions/transactions-section'
import { GetServerSideProps, InferGetServerSidePropsType, } from 'next'
import { collection, getDocs} from "firebase/firestore";
import { db } from '@/components/firebase/firebase.config'
import { useAuth } from '@/components/context/AuthContext'

export default function Home({users}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {user, userDoc} = useAuth()
  const findUser = users.find((item: any) => item.email === user)
  console.log(userDoc)
  return (
      <div className='w-screen min-h-screen relative bg-stone-100'>
          <Navbar />
          <div>
            <SearchBar />
          </div>
          {userDoc ? <TransactionsSection {...findUser}/> : <div></div>}
          <Footer />
      </div>
  )
}  

export const getServerSideProps: GetServerSideProps = async (context) => {
  const usersRef = collection(db, 'users')
  const users : any = []
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
