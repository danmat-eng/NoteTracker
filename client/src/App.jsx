import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

// Make global lists or something outside app

function App() {
  const [greeting, setGreeting] = useState("Loading...")

  useEffect(() => {
    axios.get('http://localhost:5000/api/hello')
      .then(res => setGreeting(res.data.message))
      .catch(err => {
        console.error("Error fetching data:", err);
        setGreeting("Server is not responding 😢");
      })
  }, [])

  return (
    <div>
      <div className='filesContainer'>
        <button className='noteFiles'>Math Notes</button>
        <button className='noteFiles'>English Notes</button>
        <button className='noteFiles'>Chem Notes</button>
      </div>
      <div>
        <textarea className='textBox'></textarea>
      </div>
    </div>
  )
}

// to quit/shutdown server, do ctrl c

export default App