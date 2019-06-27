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
              parent: parent ? { id: Number(parent) } : null
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
              parent: parent ? { id: Number(parent) } : { id: null }
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
  },

  messages: {
    read: ({ page, rowsPerPage, conditions }) => {
      return getJSON(ENDPOINT, {
        ...queryOptions,
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "readMessage",
          params: {
            conditions: conditions ? conditions : ["id", "IS NOT NULL"],
            perPage: rowsPerPage ? rowsPerPage : 10,
            page: page ? page + 1 : 1,
            fields: ["id", "title", "body", "category"]
          }
        })
      });
    },
    create: ({ title, category, body }) => {
      return getJSON(ENDPOINT, {
        ...queryOptions,
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "createMessage",
          params: {
            data: {
              title,
              body: body ? body : '',
              category: category ? { id: Number(category) } : { id: null }
            }
          }
        })
      });
    },
    update: ({ id, title, category, body, conditions }) => {
      return getJSON(ENDPOINT, {
        ...queryOptions,
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "updateMessage",
          params: {
            conditions: conditions ? conditions : ["id", "=", id],
            data: {
              title,
              body: body ? body : '',
              category: category ? { id: Number(category) } : { id: null }
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
          method: "deleteMessage",
          params: {
            conditions: conditions ? conditions : ["id", "=", id]
          }
        })
      });
    }
  }
};

export default API;
