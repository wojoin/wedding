const { pathToRegexp } = require("path-to-regexp")
import api from 'api'

const { queryHotel } = api

export default {
  namespace: 'hotelDetail',

  state: {
    data: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/hotel/:id').exec(pathname)
        if (match) {
          console.log("===query hotel detail===", match)
          dispatch({ type: 'query', payload: { id: match[1] } })
        }
      })
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      // console.log("===query hotel detail payload before===", payload)
      const data = yield call(queryHotel, payload)
      const { success, message, status, ...other } = data
      // console.log("===query hotel detail payload after===", data)
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: other,
          },
        })
      } else {
        throw data
      }
    },
  },

  reducers: {
    querySuccess(state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },
  },
}
