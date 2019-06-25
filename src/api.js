const ENDPOINT = '/api/v1/';

const getJSON = (url, init) => fetch(url, init)
  .then(resp => {
    if (resp.status !== 200) throw new Error(resp.statusText);
    return resp;
  })
  .then(r => r.json());

const queryOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
};

const API = {
  categories: {
    read: ({ page, rowsPerPage, condition }) => {
      return getJSON(ENDPOINT, {
        ...queryOptions,
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'readCategory',
          params: {
            conditions: condition ? condition : ['id', 'IS NOT NULL'],
            perPage: rowsPerPage,
            page: page + 1
          }
        })
      })
    }
  }
};

export default API;