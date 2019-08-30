import React, { useEffect } from 'react'
import $ from 'jquery'
import Datatables from 'datatables.net'
import Responsive from 'datatables.net-responsive/js/dataTables.responsive'

$.DataTable = Datatables
$.DataTable.responsive = Responsive

export default function HelloWorld() {
  const tableHeader = [{ title: 'PDF Summary' },{ title: 'Post Size' }]
  const tableData = [['mypdf','2.5']]

  useEffect(() => {
    $('table#foo').DataTable( {
      destroy: true,
      empty: true,
      paging: false,
      searching: false,
      data: tableData,
      columns: tableHeader,
      responsive: false,
      language: {
        searchPlaceholder: "Search Table",
        search: "<span class=\"iconic\" data-glyph=\"magnifying-glass\" title=\"magnifying glass\" aria-hidden=\"true\"></span>"
      },
      bSort: false
    } )
  })

  return (
    <>
      <table id={'foo'} className='display' width='100%'>
      </table>
    </>
  )
}
