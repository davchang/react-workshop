import React from 'react'
import styled from 'styled-components'
import { useTable, useSortBy } from 'react-table'
// import ReactTable from 'react-table'

import makeData from './makeData'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

function Table({ columns, data, disableSorting, defaultSorted }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      disableSorting: {disableSorting},
      initialState: { sortBy: defaultSorted },
    },
    useSortBy,
  )

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.slice(0, 20)

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map(
            (row, i) =>
              prepareRow(row) || (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
              )
          )}
        </tbody>
      </table>
      <br />
      <div>Showing the first 20 results of {rows.length} rows</div>
    </>
  )
}

function handleClick(row) {
  // e.preventDefault()
  // e.stopPropagation()
  // console.log('--0--', e)
  console.log('--1--', row.row.values)
  console.log('--1--', row)
}

function TableSort() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'PDF',
        accessor: '',

        Cell: row => (<><button key='' onClick={(e) => { handleClick(row) }}>Click Me</button></>)
        // Cell: row => (<code>{JSON.stringify({ values: row.values }, null, 2)}</code>)
      },
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName'
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
            Cell: row => (<pre
                style={{
                  fontSize: '10px',
                }}
              >
                <code>{JSON.stringify({ values: row.row.values }, null, 2)}</code>
              </pre>)
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
            sortType: 'basic'
          },
          {
            Header: 'Visits',
            accessor: 'visits',
            disableSortBy: true
          },
          {
            Header: 'Status',
            accessor: 'status',
            sortDescFirst: 'true'
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          },
        ],
      },
    ],
    []
  )

  const defaultSorted=[
    {
      id: "age",
      desc: true
    }
  ]

  const data = React.useMemo(() => makeData(2000), [])

  return (
    <>
      <Table columns={columns} data={data} disableSorting={false} defaultSorted={defaultSorted}/>


    </>
  )
}

export default TableSort
