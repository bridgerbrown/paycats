import Footer from '@/components/sections/footer'
import Navbar from '@/components/sections/navbar'
import SearchBar from '@/components/sections/search/search-bar'
import TransactionCard from '@/components/transactions/transaction-card'
import TransactionsSection from '@/components/transactions/transactions'

export default function Home() {
  return (
    <>
      <div className='w-screen relative bg-stone-100'>
        <Navbar />
        <div>
          <SearchBar />
        </div>
        <TransactionsSection />
        <Footer />
      </div>
    </>
  )
}
