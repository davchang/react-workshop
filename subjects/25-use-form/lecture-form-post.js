import React, { Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from 'axios'
import serializeForm from "form-serialize"

function App() {
  const [name, setName] = useState('David')
  const [status, setStatus] = useState('dchang test')
  const [remaining, setRemaining] = useState('test desc')
  const [filename, setFilename] = useState('')

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

  // this is optional
  // - browser automatically send submit() call
  // - catch submit event to run validation on input fields
  function handleSubmit(e) {
    // e.preventDefault()
    // e.stopPropagation()

    console.log('--handleSubmit--', e.target)
    serializeForm(event.target, { hash: true });
    const payloadData = serializeForm(event.target, { hash: true });
    console.log(payloadData)
    console.log(JSON.stringify(payloadData))

    // const postData = async () => {
    //   const result = await axios.post('http://localhost:8765/testForm', payloadData);
    // };
    //
    // postData()

    // document.forms["myform"].submit()
    // document.getElementById('myFormId').submit()
  }

  return (
    <>
      <form id={'myFormId'} name={'columns'} action="http://[my-host]:8080/pfd/feedbacks/v2?sheet-id=[my-sheet-id]"
            method='post' onSubmit={handleSubmit} encType="multipart/form-data">

        Name: <input type="text" name="name" onChange={handleNameChange} value={name}></input>
        <br/>
        Status: <input type="text" name="status" onChange={handleStatusChange} value={status}></input>
        <br/>
        Remaining: <input type="text" name="remaining" onChange={handleRemainingChange} value={remaining}></input>
        <br/>
{/*
        Files: <input type="file" name="files" autoComplete="off" tabIndex="-1" onChange={handleFileLoad}/>
        <br/>
*/}
        <input type="submit" value="Submit"></input>
      </form>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("app"));
