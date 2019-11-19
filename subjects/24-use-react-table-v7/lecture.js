import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import TableSort from './TableSort';
// import TableSortPaging from './TableSortPaging';
import TableSortPagingSearch from './TableSortPagingSearch';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(<TableSortPagingSearch />, document.getElementById('app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
