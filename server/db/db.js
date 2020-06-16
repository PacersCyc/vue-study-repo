const sha1 = require('sha1')
const axios = require('axios')

const className = 'todo'

const request = axios.create({
  baseURL: 'https://d.apicloud.com/mcm/api'
})

const createError = (code, resp) => {
  const error = new Error(resp.message)
  error.code = code
  return error
}

const handleResponse = ({ status, data, ...rest }) => {
  if (status === 200) {
    return data
  } else {
    throw createError(status, rest)
  }
}

module.exports = (appId, appKey) => {
  const getHeaders = () => {
    const now = Date.now()
    return {
      'X-APICloud-AppId': appId,
      'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
    }
  }
  return {
    async getAllTodos () {
      return handleResponse(await request.get(`/${className}`, {
        headers: getHeaders()
      }))
    },
    async addTodo (todo) {
      return handleResponse(await request.post(`/${className}`, todo, {
        headers: getHeaders()
      }))
    },
    async updateTodo (id, todo) {
      return handleResponse(await request.put(`/${className}/${id}`, todo, {
        headers: getHeaders()
      }))
    },
    async deleteTodo (id) {
      return handleResponse(await request.delete(`/${className}/${id}`, {
        headers: getHeaders()
      }))
    },
    async deleteCompleted (ids) {
      const requests = ids.map(id => {
        return {
          method: 'DELETE',
          path: `/mcm/api/${className}/${id}`
        }
      })
      return handleResponse(await request.post('/batch', { requests }, {
        headers: getHeaders()
      }))
    }
  }
}
