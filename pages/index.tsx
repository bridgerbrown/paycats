import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import SearchBar from '@/components/search/search-bar'
import TransactionCard from '@/components/transaction-card'

export default function Home() {
  return (
    <>
      <div className='w-screen relative'>
        <Navbar />
        <div>
          <SearchBar />
        </div>
        <div className='mx-40 pb-60 flex-col justify-center items-center content-center'>
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
        </div>
        <Footer />
      </div>
    </>
  )
}
