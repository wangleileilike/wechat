import { fetchCalloutDataApi, fetchSourcesApi, fetchSourceDataApi, fetchAnswerResultApi, fetchRecognitionResultApi } from '../services/overview'
import { isSuccess } from '../services/api'
import numeral from 'numeral'

export default {
  namespaced: true,
  state: {
    calloutData: {}, // 外呼数据
    sources: [], // 知识库source数据
    sourceData: {},
    sourceDataCache: {}
  },
  actions: {
    async getCalloutData({ commit, state }, { payload, cb }) {
      const res = await fetchCalloutDataApi(payload)
      if (isSuccess(res)) {
        const data = {...res.data}
        data.connectionRate = data.connectedCalls != null &&
        !!data.callouts &&
        numeral(data.connectedCalls / data.callouts).format('0.00%')
        commit('SAVE_CALLOUT_DATE', data)
      }
      cb && cb(res.data || {})
    },
    async getSources({ commit, state }, { payload, cb }) {
      const res = await fetchSourcesApi(payload)
      if (isSuccess(res)) {
        commit('SAVE_SOURCES', res.data)
      }
      cb && cb(res.data || [])
    },
    async getSourceData({ commit, state }, { payload, cb }) {
      const current = payload.current
      let sourceData = {}
      const sourceDataCache = {...state.sourceDataCache}
      if (sourceDataCache[current]) {
        sourceData = sourceDataCache[current]
      } else {
        const res = await fetchSourceDataApi(payload)
        if (isSuccess(res)) {
          sourceData = res.data
          sourceDataCache[current] = res.data
        }
      }
      commit('SAVE_SOURCE_DATA', { data: sourceData, cache: sourceDataCache })
    },
    // 查询接听统计结果
    async fetchAnswerResult({ commit, state }, { payload, cb }) {
      const res = await fetchAnswerResultApi(payload)
      if (isSuccess(res)) {
        cb && cb(res.data || {})
      } else {
        wx.showToast({title: res && res.msg || '获取接听统计结果失败', icon: 'none', duration: 2000})
      }
    },
    // 查询识别统计结果
    async fetchRecognitionResult({ commit, state }, { payload, cb }) {
      const res = await fetchRecognitionResultApi(payload)
      if (isSuccess(res)) {
        cb && cb(res.data || {})
      } else {
        wx.showToast({title: res && res.msg || '获取识别统计结果失败', icon: 'none', duration: 2000})
      }
    },
  },
  mutations: {
    SAVE_CALLOUT_DATE(state, data) {
      state.calloutData = data
    },
    SAVE_SOURCES(state, data) {
      state.sources = data
    },
    SAVE_SOURCE_DATA(state, { data, cache }) {
      state.sourceData = data
      state.sourceDataCache = cache
    },
    CLEAR_CACHE_DATA(state) {
      state.sourceDataCache = {}
    }
  }
}
