import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [list, setList] = useState([])
  console.log('list:', list)
  
  useEffect(() => {
    fetch('/api/v1')
      .then((res) => res.json())
      .then((res) => setList(res))
  }, [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <ul>
          {list.map(({ id, name, age }) => (
            <li key={id}>
              id: {id} -- name: {name} -- age: {age}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
