import React from 'react'
import styled from 'styled-components'
import { useTable, useSortBy } from 'react-table'

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

function Table( props ) {
  const { columns, data, disableSorting, disableSearch, fetchData, loading } = props

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
      disableSorting: disableSearch,
    },
    useSortBy,
  )

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  // const firstPageRows = rows.slice(0, 20)

  const [searchValue, setSearchValue] = React.useState('');
  const handleSearch = (event) => {
    setSearchValue(event.target.value)
  }

  React.useEffect(() => {
    // console.log(pageIndex);
    fetchData( searchValue );
  }, [ searchValue ]);

  return (
    <>
      {(!disableSearch) ?  (
       <div className=''>
         <input type="search" className='' placeholder='Search Table' value={searchValue} onChange={handleSearch} />
         <button className=''><span className='' />Search</button>
       </div>
      ) : null}
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
          {rows.map(
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

function TableSort() {
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
            disableSorting: true
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

  const serverData = React.useMemo(() => makeData(200), [])
  const [data, setData] = React.useState([]);
  const fetchIdRef = React.useRef(0);

  console.log('--serverData[0]--', serverData[0])

  const fetchData = React.useCallback(( searchValue ) => {
    const myPageRows = serverData.filter((row) => {
     return Object.values(row).toString().includes(searchValue)
    })
    setData(myPageRows);
  }, []);

  return (
    <Styles>
      <Table columns={columns} data={data} fetchData={fetchData} disableSorting={false} disableSearch={false}/>
    </Styles>
  )
}

export default TableSort
