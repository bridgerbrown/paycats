import Navbar from '@/components/navbar'
import SearchBar from '@/components/search/search-bar'
import TransactionCard from '@/components/transaction-card'

export default function Home() {
  return (
    <>
      <div className='w-screen'>
        <Navbar />
        <div>
          <SearchBar />
        </div>
        <div className='mx-40 my-10 flex-col justify-center items-center content-center'>
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
        </div>
      </div>
    </>
  )
}
