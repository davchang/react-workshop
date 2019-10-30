import React from 'react';
import TableView, { DefaultColumnFilter, SliderColumnFilter, SelectColumnFilter, NumberRangeColumnFilter, filterGreaterThan  } from './TableView';
import makeData from './makeData'

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

  // const data = React.useMemo(() => makeData(2), [])
  // console.log('--data--', data)

  const data = [{
    age: 24,
    firstName: "painting",
    lastName: "parcel",
    progress: 9,
    status: "single",
    visits: 48
  }, {
    age: 26,
    firstName: "sock",
    lastName: "creature",
    progress: 63,
    status: "relationship",
    visits: 56
  }]


  return (
    <TableView columns={columns} data={data} disableFilters={false} disableSorting={false} />
  )
}

export default Output
