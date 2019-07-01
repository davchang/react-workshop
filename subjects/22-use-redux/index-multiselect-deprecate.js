import React, { useState } from 'react'
import Select from 'react-select'

// class MultiSelect extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       selectedOptions: []
//     }
//   }
//
//   handleChange = (selectedOptions) => {
//     console.log('--selectedOptions--', selectedOptions)
//     this.setState({ selectedOptions })
//   }
//
//   render() {
//     const { selectedOption } = this.state
//     const { defaultValue, options } = this.props
//
//     return (
//       <>
//         <Select
//           isMulti={true}
//           value={selectedOption}
//           defaultValue={defaultValue}
//           onChange={this.handleChange}
//           options={options}
//         />
//       </>
//     )
//   }
// }

function MultiSelect(props) {
  const { value, options } = props   // defaultValue is delimited string 'k,o'
                                            // defaultOptions is [{ value: 'k', label: 'Kiwi' },{ value: 'o', label: 'Orange' }]
  let defaultOptions = null
  if (value && options.length > 0) {
    defaultOptions = value.split(',').map(x => {
      return (options.find((y) => {return y.value === x}))
    })
  } else {
     defaultOptions = options[0]
  }

  const [ selectedOptions, setSelectedOptions ] = useState(defaultOptions)

  function handleChange(selectedOptions) {
    setSelectedOptions( selectedOptions )

    const delimitedString = selectedOptions.reduce(function(result, x, i) {
      return result + (i === 0) ? '' : ',' + x.value
    }, '')
    console.log(delimitedString)
  }

  return (
    <>
      <Select
        isMulti={true}
        value={selectedOptions}
        onChange={handleChange}
        options={options}
      />
    </>
  )
}

/*
[
  { value: 'k', label: 'Kiwi' },
  { value: 'o', label: 'Orange' }]
*/

export default function HelloWorld() {
  return (
      <div>
        <MultiSelect
          value={'k,o'}
          options={[
            { value: 'a', label: 'Apple' },
            { value: 'b', label: 'Banana' },
            { value: 'k', label: 'Kiwi' },
            { value: 'o', label: 'Orange' },
            { value: 't', label: 'Tangerin' }
          ]}
        />
      </div>
  )
}
