import './App.css'
import SearchNavbar from './view/components/searchBar'
import RingText from './view/components/ringText'

function App() {


  
  return (
    <>

    <div className="header">
      <RingText>Jammming</RingText>
    </div>
    <div className="search-bar" 
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
      <SearchNavbar />
    </div> 
    
    </>
  )
}

export default App
