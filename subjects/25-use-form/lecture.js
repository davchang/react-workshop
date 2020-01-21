////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Change the contents of the render function and save the file
// - See the updates automatically in your browser without refreshing!
////////////////////////////////////////////////////////////////////////////////
import React, { Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import serializeForm from "form-serialize"
import axios from 'axios'
// import postAPI from './utils/postApi'

function App() {
  const [data, setData] = useState('')
  const [payload, setPayload] = useState('')

  // async function postAPI(url, payload) {
  //   const options = {
  //     method: 'POST',
  //     url: url,
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json;charset=UTF-8'
  //     },
  //     data: payload
  //   }
  //
  //   let response = await axios(options)
  //   let responseOK = response && response.status === 200 && response.statusText === 'OK';
  //   if (responseOK) {
  //       let data = await response.data;
  //       setMsg(data.statusText)
  //   }
  // }

  function handleSubmit(event) {
    // event.preventDefault();
    const payload = serializeForm(event.target, { hash: true });
    setPayload(JSON.stringify(payload))
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post('http://localhost:8765/testForm', payload);
      // setData(result.data.statusText);
    };

    if (payload !== '') {
      fetchData()
    }
  }, [payload]);

  return (
    <>
      {data ? <p>{data}</p> : <p>{'---'}</p>}

      <h2>HTML Forms</h2>
      {/* <form action="http://localhost:8765/testForm" method='post'>   */}
      <form onSubmit={handleSubmit}>
        First name:<br/>
        <input type="text" name="firstname" defaultValue="Mickey3"></input>
        <br/>
        Last name:<br/>
        <input type="text" name="lastname" defaultValue="Mouse4"></input>
        <br/><br/>
        <input type="submit" value="Submit"></input>
      </form>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("app"));
