const ENDPOINT = "/api/v1/";

const getJSON = (url, init) =>
  fetch(url, init)
    .then(resp => {
      if (resp.status !== 200) throw new Error(resp.statusText);
      return resp;
    })
    .then(r => r.json());

const queryOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json" }
};

const API = {
  categories: {
    read: ({ page, rowsPerPage, conditions }) => {
      return getJSON(ENDPOINT, {
        ...queryOptions,
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "readCategory",
          params: {
            conditions: conditions ? conditions : ["id", "IS NOT NULL"],
            perPage: rowsPerPage ? rowsPerPage : 10,
            page: page ? page + 1 : 1,
            fields: ["id", "title", "parent", "messages", "children"]
          }
        })
      });
    },
    create: ({ title, parent }) => {
      return getJSON(ENDPOINT, {
        ...queryOptions,
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "createCategory",
          params: {
            data: {
              title,
              parent: parent ? { id: parent } : null
            }
          }
        })
      });
    },
    update: ({ id, title, parent, conditions }) => {
      return getJSON(ENDPOINT, {
        ...queryOptions,
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "updateCategory",
          params: {
            conditions: conditions ? conditions : ["id", "=", id],
            data: {
              title,
              parent: parent ? { id: Number(parent) } : null
            }
          }
        })
      });
    },
    delete: ({ id, conditions }) => {
      return getJSON(ENDPOINT, {
        ...queryOptions,
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "deleteCategory",
          params: {
            conditions: conditions ? conditions : ["id", "=", id]
          }
        })
      });
    }
  }
};

export default API;
