import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import SearchBar from '@/components/search/search-bar'
import TransactionCard from '@/components/transaction-card'

export default function Home() {
  return (
    <>
      <div className='w-screen relative bg-stone-100'>
        <Navbar />
        <div>
          <SearchBar />
        </div>
        <div className='pb-60 flex flex-col justify-center items-center'>
            <div className='rounded-t-lg border-slate-300 border-x border-t h-6 bg-white w-192'></div>
            <TransactionCard />
            <TransactionCard />
            <TransactionCard />
            <TransactionCard />
            <TransactionCard />
            <div className='rounded-b-lg border-slate-300 border-x border-b h-16 bg-white w-192'></div>
        </div>
        <Footer />
      </div>
    </>
  )
}
