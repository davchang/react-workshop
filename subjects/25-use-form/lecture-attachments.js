import React, { Fragment, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import axios from 'axios'
import { useDropzone } from 'react-dropzone'
import serializeForm from "form-serialize"

const postRequest = async (url, payload, options) => {
  return await axios.post(url, payload, options)
}

const options = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data'
  }
}

// let attachments = []


function App() {
  console.log('------0------')
  const [ attachments, setAttachments ] = useState([])
  let myFile = {}

  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader()
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = (e) => {
      e.preventDefault()
      e.stopPropagation()
      // Do whatever you want with the file contents
      myFile.result = reader.result
      // attachments.push(myFile)
      console.log('---onDrop get result--', myFile.result)
      // fileContent = binaryStr
      // dispatch({type: 'UPLOAD', payload: JSON.parse(binaryStr)})
    }
    // acceptedFiles.forEach(file => reader.readAsBinaryString(file))
    acceptedFiles.forEach(( file ) => {
      myFile = {}
      myFile.path = file.path
      myFile.type = file.type
      myFile.size = file.size
      setAttachments([ myFile ].concat(attachments))

      if ((file.type).indexOf('image') > -1) {
        reader.readAsArrayBuffer(file)   // for PNG file
      } else {
        reader.readAsBinaryString(file)  // for text file
      }
    })

    console.log('---onDrop--acceptedFiles--', acceptedFiles)
  }, [])


  // {noDragEventsBubbling: true}
  // {noClick: true}
  // const options = Object.assign({}, {onDrop}, {noDragEventsBubbling: true})
  const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({onDrop}) // {onDrop})
  const getDropzoneInputProps = Object.assign({}, getInputProps(), {multiple: false})

  function handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation()

    // // fileInput is a HTMLInputElement: <input type="file" multiple id="myfileinput">
    // const fileInput = document.getElementById("myfileinput");
    // // files is a FileList object (simliar to NodeList)
    // const files = fileInput.files;
    // console.log('--files--', files)

    const url = 'http://[my-host]:8080/pfd/feedbacks/v2?sheet-id=[my-sheet-id]'
    const columns = {
      "name": 'name from UI',
      "status": 'status from UI',
      "remaining": 'remaining from UI'
    }

    // const blob = new Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'});
    console.log('--handleSubmit--attachments--', attachments)
    let payload = new FormData();
    payload.append('columns', JSON.stringify(columns))
    attachments.forEach((file) => {
      const blob = new Blob([ file.result ], { type: file.type });
      payload.append('files', blob, file.path)
    })
    payload.append('emails', '[email address xxx@eee.ReactDOM]')

    const doSend = async () => {
      try {
        const result = await postRequest(url, payload, options)
      } catch (error) {
        console.log('--error--', error)
      }
    }

    doSend()
  }

  console.log('---attachments--', attachments)
  const files = attachments.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))

  return (
    <>
{/*
      <section className="container">
        <div {...getRootProps()} style={{border: '1px dotted red', paddings: '20px 20px 20px 20px'}}>
          <input {...getDropzoneInputProps} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      </section>
*/}

      <form onSubmit={handleSubmit}>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
        <div className="fileUploadZone" {...getRootProps()}>
          <span className="">
            <span>Drag and drop a file here or </span>
            <button type="button" className="button -link">
              <span className="button__text">browse files</span>
            </button>
          </span>
          <input id='myfileinput' {...getDropzoneInputProps} />
        </div>

        <input type="submit" value="Submit"></input>
      </form>

    </>
  )
}

ReactDOM.render(<App />, document.getElementById("app"));
