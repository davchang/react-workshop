import React from 'react';
import TableView, { DefaultColumnFilter, SliderColumnFilter, SelectColumnFilter, NumberRangeColumnFilter, filterGreaterThan  } from './TableView';
// import makeData from './makeData'

function Output(props) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
            Filter: DefaultColumnFilter
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
            sortType: 'basic',
            Filter: SliderColumnFilter,
            filter: 'equals',
          },
          {
            Header: 'Visits',
            accessor: 'visits',
            disableSorting: true,
            disableFilters: true,
            // Filter: NumberRangeColumnFilter,
            // filter: 'between',
          },
          {
            Header: 'Status',
            accessor: 'status',
            Filter: SelectColumnFilter,
            filter: 'includes',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
            Filter: SliderColumnFilter,
            filter: filterGreaterThan,
          },
        ],
      },
    ],
    []
  )

  // const data = React.useMemo(() => makeData(10), [])
  // console.log('--data--', JSON.stringify(data))

  const data = [{
      "firstName": "burn",
      "lastName": "class",
      "age": 24,
      "visits": 56,
      "progress": 47,
      "status": "complicated"
    },
    {
      "firstName": "college",
      "lastName": "hill",
      "age": 13,
      "visits": 46,
      "progress": 35,
      "status": "relationship"
    },
    {
      "firstName": "earthquake",
      "lastName": "group",
      "age": 11,
      "visits": 54,
      "progress": 35,
      "status": "relationship"
    },
    {
      "firstName": "historian",
      "lastName": "island",
      "age": 0,
      "visits": 42,
      "progress": 18,
      "status": "single"
    },
    {
      "firstName": "trip",
      "lastName": "software",
      "age": 4,
      "visits": 71,
      "progress": 60,
      "status": "relationship"
    },
    {
      "firstName": "attraction",
      "lastName": "wall",
      "age": 7,
      "visits": 54,
      "progress": 0,
      "status": "complicated"
    },
    {
      "firstName": "moment",
      "lastName": "eggnog",
      "age": 6,
      "visits": 82,
      "progress": 23,
      "status": "relationship"
    },
    {
      "firstName": "cork",
      "lastName": "beginner",
      "age": 15,
      "visits": 90,
      "progress": 66,
      "status": "relationship"
    },
    {
      "firstName": "sticks",
      "lastName": "conclusion",
      "age": 0,
      "visits": 96,
      "progress": 74,
      "status": "relationship"
    },
    {
      "firstName": "flock",
      "lastName": "furniture",
      "age": 3,
      "visits": 55,
      "progress": 78,
      "status": "relationship"
    }
  ]

  return (
    <TableView columns={columns} data={data} disableFilters={true} disableSorting={true} disableSearch={true}>
    </TableView>
  )
}

export default Output
