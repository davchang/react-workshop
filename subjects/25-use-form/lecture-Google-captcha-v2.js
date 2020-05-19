import React, { Fragment, useState} from "react"
import ReactDOM from "react-dom"
import axios from 'axios'
import { useDropzone } from 'react-dropzone'
import serializeForm from "form-serialize"
import ReCAPTCHA from "react-google-recaptcha"

const postRequest = async (url, payload, options) => {
  return await axios.post(url, payload, options)
}

const options = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data'
  }
}

/*
domain: [my-host]


Google captcha V2:

Site key: [my-site-key]
Secret key: [my-secret-v3]
I registered a site in Google: [my-host]

Google captcha V3:

  siteV3: [my-site-key]
	secretV3: [my-secret-v3]

https://www.google.com/recaptcha/api2/reload?k=[my-site-key]
*/
function App() {
  const [message, setMessage] = useState('')
  const recaptchaRef = React.createRef()

  const handlePostCall = async (recaptchaValue) => {
    console.log('--3--')
    const url = 'http://[my-host]:8080/pfd/feedbacks/v2?sheet-id=[my-sheet-id]'
    const columns = {
      "name": 'dchang',
      "status": 'summary...',
      "remaining": 'desc...'
    }
    let payload = new FormData();
    payload.append('columns', JSON.stringify(columns))
    payload.append('g-recaptcha-response', recaptchaValue)
    payload.append('debug', false)
    const doSend = async () => {
      try {
        const result = await postRequest(url, payload, options)
        setMessage('send feedback successfully')

      } catch (error) {
        console.log('--error--', error)
        setMessage('send feedback failed - ' + error)
      }
    }
    doSend()
  }

  const handleRecaptchaChange = (value) => {
    console.log('--2--')
    console.log("Captcha value:", value)
    handlePostCall(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    recaptchaRef.current.execute()
    console.log('--1--')
  }

  return (
    <div>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>

        <br/><br/>

        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey="[my-site-key]"
          onChange={handleRecaptchaChange}>
        </ReCAPTCHA>

        <input type="submit" value="Submit"></input>
      </form>

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("app"));
