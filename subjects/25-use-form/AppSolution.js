import React, {
  Fragment,
  useState,
  useEffect,
  useReducer,
} from 'react';
import axios from 'axios';

// A destructuring statement is used to keep the state object immutable
// -- meaning the state is never directly mutated
// -- to enforce best practices.
//
// the Reducer Hook makes sure that this portion of the state management is encapsulated with its own logic.
// By providing action types and optional payloads, you will always end up with a predicatbale state change.
// In addition, you will never run into invalid states.
// For instance, previously it would have been possible to accidently set the isLoading and isError states to true.
// What should be displayed in the UI for this case?
// Now, each state transition defined by the reducer function leads to a valid state object
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error();
  }
};

const useDataApi = (initialUrl, initialData) => {
  // const [data, setData] = useState(initialData);
  // const [url, setUrl] = useState(initialUrl);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);

  const [url, setUrl] = useState(initialUrl);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

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

    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const result = await axios(url);
        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    fetchData()

    return () => {
      didCancel = true;
    };

  }, [url]);

  // return [ { data, isLoading, isError }, setUrl ]
  return [state, setUrl];
}

function AppSolution() {
  const [query, setQuery] = useState('redux');
  const [ { data, isLoading, isError }, doFetch ] = useDataApi(
    'https://hn.algolia.com/api/v1/search?query=redux',
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
export default AppSolution;
