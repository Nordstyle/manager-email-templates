const ENDPOINT = 'https://simple-api.sandbox.movavi.com/api/v1/';

const getJSON = (url, init) => fetch(url, init)
  .then(resp => {
    if (resp.status !== 200) throw new Error(resp.statusText);
    return resp;
  })
  .then(r => r.json());

const queryOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
};

const API = {
  categories: {
    all: (params) => {
      return getJSON(ENDPOINT, {
        ...queryOptions,
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'readCategory',
          params: {
            conditions: ['id', 'IS NOT NULL'],
            perPage: 100
          }
        })
      })
    }
  }
};

export default API;