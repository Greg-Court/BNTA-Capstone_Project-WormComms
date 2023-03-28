import { useState } from 'react'
import MainPage from './Containers/MainPage'
import MessageContainer from './Containers/MessageContainer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <MainPage></MainPage>
    </>
  )
}

export default App
