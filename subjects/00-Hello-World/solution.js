import React, { useState } from "react";
import ReactDOM from "react-dom";
import sortBy from "sort-by";
import { search } from "./utils/searchWikipedia";

const SearchBox = ({ updateData }) => {
  const [ value, setValue ] = useState('')

  function handleChange(e) {
    setValue(e.target.value)
  }

  function callback(err, results) {
    updateData(results)
  }

  function handleClick(e) {
    search(value, callback);
  }

  return (
    <div>
      <input value={value} onChange={handleChange}>
      </input>
      &nbsp;
      <button onClick={handleClick}>Search</button>
    </div>
  )
}

const SortBox = ({ updateSeq }) => {
  const [ value, setValue ] = useState(false)

  function handleChange(e) {
    setValue(e.target.checked)
    if (e.target.checked) {
      updateSeq('-')
    } else {
      updateSeq('')
    }
  }

  return (
    <label>
      <input type="checkbox" checked={value} onChange={handleChange}></input>
      &nbsp;
      Sort Descending
    </label>
  )
}

const ResultLine = (props) => {
  const { entry } = props
  const [ value, setValue ] = useState(false)

  function handleClick() {
    setValue(!value)
  }

  return (
    <>
      {entry.title}
      <button onClick={handleClick}>Show More</button> <br/>
      { value ? <br/> : null }
      { value ?
        entry.description: null
      }
      { value ? <br/> : null }
      { value ? <br/> : null }
    </>
  )
}

const ResultBox = ({ data, seq }) => {
  return (
    <ul>
      {
        data.sort(sortBy(seq + 'title')).map(function(entry, index) {
          return (
            <li key={index}>
              <ResultLine entry={entry} />
            </li>
          )
        })
      }
    </ul>
  )
}

function App() {
  const [ data, setData ] = useState([])
  const [ seq, setSeq ] = useState('')

  return (
    <>
      <SearchBox updateData={setData} />
      <SortBox updateSeq={setSeq} />
      <ResultBox data={data} seq={seq} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("app"));
