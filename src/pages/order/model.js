import modelExtend from 'dva-model-extend'
const { pathToRegexp } = require("path-to-regexp")
import api from 'api'
import { pageModel } from 'utils/model'

const {
  queryOrderList,
  createOrder,
  removeUser,
  updateUser,
  removeUserList,
} = api

export default modelExtend(pageModel, {
  namespace: 'order',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathToRegexp('/order').exec(location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 }
          console.log("===0 order path access===")
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {
    *create({ payload }, { call, put }) {
      console.log("===1 order create before===", payload);
      const data = yield call(createOrder, payload)
      console.log("===1 order create===", data);
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },
    *query({ payload = {} }, { call, put }) {
      const data = yield call(queryOrderList, payload)
      console.log("===2 order query list===", data);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },
    
    *update({ payload }, { select, call, put }) {
      const id = yield select(({ user }) => user.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(updateUser, newUser)
      console.log("===3 user update===", data);
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *delete({ payload }, { call, put, select }) {
      const data = yield call(removeUser, { id: payload })
      console.log("===4 user delete===", data);
      const { selectedRowKeys } = yield select(_ => _.user)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload),
          },
        })
      } else {
        throw data
      }
    },

    *multiDelete({ payload }, { call, put }) {
      const data = yield call(removeUserList, payload)
      console.log("===5 user multi delete===", data);
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },
  },

  reducers: {
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },
  },
})
