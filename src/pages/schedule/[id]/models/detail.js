const { pathToRegexp } = require("path-to-regexp")
import api from 'api'

const { querySchedule } = api

export default {
  namespace: 'scheduleDetail',

  state: {
    data: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/schedule/:date').exec(pathname)
        // const match = pathToRegexp('/schedule/2021-09-04').exec(pathname)
        console.log("=== ScheduleDetail match===", match)
        if (match) {
          // console.log("=== ScheduleDetail match===", match)
          dispatch({ type: 'query', payload: { date: match[1] } })
        }
      })
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      console.log("=== ScheduleDetail query before===", payload)
      const data = yield call(querySchedule, payload)
      console.log("=== ScheduleDetail query after===", payload)
      const { success, message, status, ...other } = data
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: other,
          },
        })
      } else {
        console.log("=== ScheduleDetail query error===")
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
