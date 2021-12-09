import modelExtend from 'dva-model-extend'
const { pathToRegexp } = require("path-to-regexp")
import api from 'api'
import { pageModel } from 'utils/model'
import moment from 'moment'

const {
  queryHotelList,
  createHotel,
  removeHotel,
  updateHotel,
  removeHotelList,
} = api

export default modelExtend(pageModel, {
  namespace: 'hotel',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathToRegexp('/hotel').exec(location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 }
          console.log("===modal: hotel path access===")
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
      const data = yield call(createHotel, payload)
      console.log("===modal: hotel create===", data);
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *query({ payload = {} }, { call, put }) {
      const data = yield call(queryHotelList, payload)
      console.log("===modal: hotel list===", data);
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
      const id = yield select(({ hotel }) => hotel.currentItem.id)
      const newHotel = { ...payload, id }
      const data = yield call(updateHotel, newHotel)
      console.log("===modal: hotel update===", data);
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *delete({ payload }, { call, put, select }) {
      const data = yield call(removeHotel, { id: payload })
      console.log("===modal: hotel delete===", data);
      const { selectedRowKeys } = yield select(_ => _.hotel)
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
      const data = yield call(removeHotelList, payload)
      console.log("===modal: hotel multi delete===", data);
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

  },

  reducers: {
    showModal(state, { payload }) {
      // console.log("===hotel reducers, payload ===", payload)
      let payloadItem = {...payload["currentItem"]}
      // 时间的数据必须通过 moment() 函数转换成 DatePicker的标准格式
      payloadItem["weddingdate"] = moment(payloadItem["weddingdate"], 'YYYY-MM-DD HH:mm:ss')
      payloadItem["weddingtime"] = moment(payloadItem["weddingtime"], 'YYYY-MM-DD HH:mm:ss')
      // console.log("===hotel reducers, payload 2===", payloadItem)
      let payloadConverted = {
        modalType: payload.modalType,
        currentItem: payloadItem,
        // weddingdate: moment(),
        // weddingtime: moment(),
      }

      // console.log("===hotel reducers, payload 3 ===", payloadConverted)
      return { ...state, ...payloadConverted, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },
  },
})
