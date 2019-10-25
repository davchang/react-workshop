import React from "react";
import ReactDOM from "react-dom";
import ReactTable from 'react-table'
import 'react-table/react-table.css'

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

function TableExample() {

  return <ReactTable
    data={data}
    columns={columns}
    pageSize={5} // the number of rows per page to be displayed
    // sortable={true}
    // resizable={false}
    // filterable={true}
    sorted={[{ // the sorting model for the table
        id: 'name'
      }, {
        id: 'age',
        desc: true
    }]}
    expanded={{ // The nested row indexes on the current page that should appear expanded
      1: true,
      4: true,
      5: {
        2: true,
        3: true
      }
    }}
    filtered={[{ // the current filters model
      id: 'name',
      value: ''
    }]}
    resized={[{ // the current resized column model
      "id": "age",
      "value": 10.25
    }]}
  />
}

ReactDOM.render(<TableExample />, document.getElementById("app"));
