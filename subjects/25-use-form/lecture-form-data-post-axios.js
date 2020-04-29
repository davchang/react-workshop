import React, { Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from 'axios'
import serializeForm from "form-serialize"

function App() {
  const [name, setName] = useState('David')
  const [status, setStatus] = useState('dchang test')
  const [remaining, setRemaining] = useState('test desc')
  const [filename, setFilename] = useState('')


  const postRequest = async (url, payload, options) => {
    return await axios.post(url, payload, options)
  }

  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  }

  function handleNameChange(e) {
    setName(e.target.value)
  }
  function handleStatusChange(e) {
    setStatus(e.target.value)
  }
  function handleRemainingChange(e) {
    setRemaining(e.target.value)
  }
  function handleFileLoad(e) {
    setFilename(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation()

    const url = 'http://dvrapiqas01:8080/pfd/feedbacks/v2?sheet-id=1321178162849668'
    const columns = {
      "name": name,
      "status": status,
      "remaining": remaining
    }

    let payload = new FormData();
    payload.append('columns', JSON.stringify(columns))
    payload.append('files', filename)

    const doSend = async () => {
      try {
        const result = await postRequest(url, payload, options)
      } catch (error) {
        console.log('--error--', error)
      }
    }

    doSend()
  }

  return (
    <>
      <form onSubmit={handleSubmit}>

        Name: <input type="text" name="name" onChange={handleNameChange} value={name}></input>
        <br/>
        Status: <input type="text" name="status" onChange={handleStatusChange} value={status}></input>
        <br/>
        Remaining: <input type="text" name="remaining" onChange={handleRemainingChange} value={remaining}></input>
        <br/>

        Files: <input type="file" name="files" autoComplete="off" tabIndex="-1" onChange={handleFileLoad}/>
        <br/>

        <input type="submit" value="Submit"></input>

      </form>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("app"));
