import modelExtend from 'dva-model-extend'
const { pathToRegexp } = require("path-to-regexp")
import api from 'api'
import { pageModel } from 'utils/model'

const {
  queryOrderList,
  createOrder,
  removeOrder,
  updateOrder,
  removeOrderList,
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
      // console.log("===1 order create before===", payload);
      const data = yield call(createOrder, payload)
      console.log("===model: order create===", data);
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },
    *query({ payload = {} }, { call, put }) {
      const data = yield call(queryOrderList, payload)
      console.log("===model: order list===", data);
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
      const id = yield select(({ order }) => order.currentItem.id)
      const newOrder = { ...payload, id }
      const data = yield call(updateOrder, newOrder)
      console.log("===model: order update===", data);
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *delete({ payload }, { call, put, select }) {
      // console.log("===4 order delete=== befor", payload);
      const data = yield call(removeOrder, { id: payload })
      console.log("===model: order delete===", data);
      const { selectedRowKeys } = yield select(_ => _.order)
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
      const data = yield call(removeOrderList, payload)
      console.log("===model: order multi delete===", data);
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
