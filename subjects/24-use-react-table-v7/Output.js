import React from 'react';
import styled from 'styled-components'
import TableSortFilter from './TableSortFilter';

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
          Filter: SliderColumnFilter,
          filter: 'equals',
        },
        {
          Header: 'Visits',
          accessor: 'visits',
          Filter: NumberRangeColumnFilter,
          filter: 'between',
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

const data = React.useMemo(() => makeData(2000), [])
