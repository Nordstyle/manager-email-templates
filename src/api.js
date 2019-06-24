const ENDPOINT = 'https://simple-api.sandbox.movavi.com/api/v1/';

const testFetch = fetch('https://simple-api.sandbox.movavi.com/api/v1/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jsonrpc: '2.0',
    id: 'test',
    method: 'readCategory',
    params: {
      conditions: ['id', '=', '114']
    }
  })
}).then(resp => resp.json()).then(data => console.log(data.result));