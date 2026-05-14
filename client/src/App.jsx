import { useEffect, useState } from 'react'
import axios from 'axios' // Make sure you've run: npm install axios

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
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>MERN Stack Test</h1>
      <p>Message from Backend: <strong>{greeting}</strong></p>
    </div>
  )
}

// to quit/shutdown server, do ctrl c

export default App
