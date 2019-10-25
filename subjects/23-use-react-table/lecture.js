import React from "react";
import ReactDOM from "react-dom";
import ReactTable from 'react-table'
// import 'react-table/react-table.css'
// import { ReactTableDefaults } from 'react-table'

const data = [{
  name: 'Tanner Linsley',
  age: 26,
  friend: {
    name: 'Jason Maurer',
    age: 23,
  }
},{
  name: 'Foo',
  age: 30,
  friend: {
    name: 'Bar',
    age: 23,
  }
}]

const columns = [{
  Header: 'Name',
  accessor: 'name' // String-based value accessors!
}, {
  Header: 'Age',
  accessor: 'age',
  Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
}, {
  id: 'friendName', // Required because our accessor is not a string
  Header: 'Friend Name',
  accessor: d => d.friend.name // Custom value accessors!
}, {
  Header: props => <span>Friend Age</span>, // Custom header components!
  accessor: 'friend.age'
}]

// Object.assign(ReactTableDefaults, {
//   data: data,
//   columns: columns,
//   defaultPageSize: 10,
//   minRows: 3
//   // etc...
// })

function TableExample() {

  return (
    <>
      <ReactTable
        data={data}
        columns={columns}
        defaultPageSize={10}
        minRows={3}
      />
    </>
  )
}

ReactDOM.render(<TableExample />, document.getElementById("app"));
