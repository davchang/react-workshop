import React, { useState } from 'react'
import ReactDOM from "react-dom"
import './styles.scss'
import { debounce } from '../../utils/debounce'

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = debounce(searchTerm => {
      setSearchTerm( searchTerm )
      console.log('--here--')
  }, 500)

  return (
    <div>
      <p>Search Term: {searchTerm}</p>
      <input onChange={e => {handleChange(e.target.value)}} />
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('main'))
