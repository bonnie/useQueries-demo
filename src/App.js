import * as React from "react";

import { QueryClient, QueryClientProvider, useQueries } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const fetchPersonById = (personId) => {
  console.log(`https://swapi.dev/api/people/${personId + 1}`);
  return fetch(`https://swapi.dev/api/people/${personId + 1}`).then((res) =>
    res.json()
  );
};

function Example() {
  // presumably this number (10) would be user update-able
  const arr = Array.from(new Array(10));
  const queries = arr.map((_, i) => {
    return {
      queryKey: ["person", i],
      queryFn: () => fetchPersonById(i + 1),
    };
  });

  const queryResults = useQueries(queries) || [];
  console.log("QUERY RESULTS:", queryResults);

  return (
    <div>
      <h1>People</h1>
      <ul>
        {queryResults.map((query) => (
          <li key={query.data.name}>{query.data.name}</li>
        ))}
      </ul>
      <h2>Loading</h2>
      <ul>
        {queryResults.map((query, i) => (
          <li key={i}>
            Query {i}: {query.isLoading ? "loading" : "not loading"}
          </li>
        ))}
      </ul>
      <h2>Errors</h2>
      <ul>
        {queryResults.map((query, i) => (
          <li key={i}>
            Query {i}: {query.isError ? query.error : "no error"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}
