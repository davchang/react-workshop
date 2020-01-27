import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // const fetchData = async () => {
    //   setIsError(false);
    //   setIsLoading(true);
    //   try {
    //     const result = await axios(url);
    //     setData(result.data);
    //   } catch (error) {
    //     setIsError(true);
    //   }
    //   setIsLoading(false);
    // };

    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);
        setData(result.data);
      } catch(e) {
        setIsError(true);
        if (e && e.response && e.response.data) {
          console.log(e.response.data);
          console.log(e.response.status);
          console.log(e.response.headers);
        } else if (e.request) {
          console.log(e.request);
        } else if (e.name === 'Error' && e.message ) {
          console.log('Error', error.message);
        }
      }

      setIsLoading(false);
    };

    fetchData()
  }, [url]);

  return [ { data, isLoading, isError }, setUrl ]
}

function App() {
  const [query, setQuery] = useState('redux');
  const [ { data, isLoading, isError }, doFetch ] = useDataApi(
    'https://hn.algolia.com/api/v1/search?query=redux',
    // 'http://localhost:8765/search',
    { hits: [] },
  );

  return (
    <Fragment>
      <form
        onSubmit={event => {
          event.preventDefault();
          doFetch(`http://hn.algolia.com/api/v1/search?query=${query}`)
      }}>
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}/>

        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {(data && data.hits) ? data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          )) : <></>}
        </ul>
      )}
    </Fragment>
  );
}
export default App;
