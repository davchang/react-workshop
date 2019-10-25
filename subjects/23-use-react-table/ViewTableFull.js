import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
// import namor from 'namor'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

// Now let's mock the server.  It's job is simple: use the table model to sort and return the page data
const requestData = (pageSize, page, sorted, filtered, searchValue, searched, rawData) => {
  return new Promise((resolve, reject) => {
    // On the server, you'll likely use SQL or noSQL or some other query language to do this.
    // For this mock, we'll just use lodash
    let filteredData = rawData
    if (filtered.length) {
      filteredData = filtered.reduce(
        (filteredSoFar, nextFilter) => {
          return filteredSoFar.filter(
            (row) => {
              console.log('nextFilter.id=', nextFilter.id, '  nextFilter.value=', nextFilter.value)
              return (row[nextFilter.id] + '').includes(nextFilter.value)
            })
        }
        , filteredData)
    } else if (searchValue && searched.length) {
      filteredData = filteredData.filter((row) => {
        return (
          searched.some(x => (row[x] + '').includes(searchValue))
        )
      })
    }

    const sortedData = _.orderBy(filteredData, sorted.map(sort => {
      return row => {
        if (row[sort.id] === null || row[sort.id] === undefined) {
          return -Infinity
        }
        return typeof row[sort.id] === 'string' ? row[sort.id].toLowerCase() : row[sort.id]
      }
    }), sorted.map(d => d.desc ? 'desc' : 'asc'))

    // Be sure to send back the rows to be displayed and any other pertinent information, like how many pages there are total.
    const res = {
      rows: sortedData.slice(pageSize * page, (pageSize * page) + pageSize),
      pages: Math.ceil(filteredData.length / pageSize)
    }

    // Here we'll simulate a server response with 500ms of delay.
    setTimeout(() => resolve(res), 500)
  })
}

class ViewTableFull extends React.PureComponent {
  constructor () {
    super()
    this.state = {
      data: [],
      pages: null,
      loading: true
    }
    this.fetchData = this.fetchData.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.displaySearchBox = this.displaySearchBox.bind(this)
  }

  fetchData (state, instance) {
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({loading: true})
    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    //Todo: use instance variable for the searchValue
    requestData(state.pageSize, state.page, state.sorted, state.filtered, this.searchValue, this.searched, this.props.data)
      .then((res) => {
        // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
        this.setState({
          data: res.rows,
          pages: res.pages,
          loading: false
        })
      })
  }

  createSearchColumnNames(columns, initialResult) {
    const that = this
    return columns.reduce(function(result, line) {
      if (line.columns) {
        return that.createSearchColumnNames(line.columns, result)
      }
      let name = null
      if (line.id) {
        name = line['id']
      } else {
        name = line['accessor']
      }
      result.push(name)
      return result
    }, initialResult);
  }

  handleSearch(value, instance) {
    // setState() is an async event, let's use an instance variable instead
    this.searchValue = value
    console.log('--handleSearch-- value=', value)

    this.searched = this.createSearchColumnNames(this.props.columns, [])
    console.log('--handleSearch-- this.searched=', this.searched)

    instance.fireFetchData()
  }

  displaySearchBox(state, makeTable, instance) {
    return (
      <div>
        <input style={{width: '100%', padding: '5px'}} type="search" className='' placeholder='Search Table' defaultValue='' onChange={(event) => this.handleSearch(event.target.value, instance)} />
        {makeTable()}
      </div>
    )
  }

  render () {
    return (
      <div className='table-wrap'>
        <ReactTable
          className='-striped -highlight'
          columns={this.props.columns}
          manual // Forces table not to paginate or sort automatically, so we can handle it server-side
          defaultPageSize={10}
          //filterable
          data={this.state.data} // Set the rows to be displayed
          pages={this.state.pages} // Display the total number of pages
          onFetchData={this.fetchData}> // Request new data when things change
          {this.displaySearchBox}
        </ReactTable>
      </div>
    )
  }
}

export default ViewTableFull
