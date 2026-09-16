import ProductTable from '../widgets/ProductTable/ProductTable'
import UserStatsComp from '../widgets/UserStats/UserStatsComp'

function App() {

  return (
    <main className='
    bg-linear-to-b from-muted to-background
    flex flex-col justify-center items-center
    min-h-screen 
    bg-muted text-foreground'>

      <div className='my-10'>
        <UserStatsComp />
        <ProductTable />
      </div>

      <div className='hidden fixed min-w-screen min-h-screen'>
        <div className='absolute -bottom-50 -left-50 bg-background w-full h-1/2 rounded-full z-1 blur-3xl'></div>
      </div>
      <span className=' fixed top-0 left-0 text-[4px] text-input'>DEMO...</span>
    </main>
  )
}

export default App
