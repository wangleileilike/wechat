import { fetchCustomerListApi, fetchdeptListApi, fetchcaListApi, fetchDynamicPropApi, fetchTaskRecordListApi,
  saveAddCustomerApi, saveEditCustomerApi, queryTaskRecordInfo, markRead, fetchTagList } from '../services/customer'
import { isSuccess } from '../services/api'

export default {
  namespaced: true,
  state: {
    customerList: {},
    customerInfo: {}, // 当前用户详请
    calloutInfo: {} // 当前对话详请
  },
  actions: {
    async fetchCustomerList({ commit, state }, {payload, cb}) {
      const res = await fetchCustomerListApi(payload)
      if (isSuccess(res)) {
        commit('saveCustomerList', res.data)
      }
      cb && cb(res.data || null)
    },
    async fetchCustomerAll({ commit, state }, {payload, cb}) {
      const res = await fetchCustomerListApi(payload)
      if (isSuccess(res)) {
        cb && cb(res.data && res.data.list)
      }
    },
    async fetchDeptList({ commit, state }, {payload, cb}) {
      const res = await fetchdeptListApi(payload)
      if (isSuccess(res)) {
        cb && cb(res.data)
      }
    },
    async fetchcaList({ commit, state }, {payload, cb}) {
      const res = await fetchcaListApi(payload)
      if (isSuccess(res)) {
        cb && cb(res.data)
      }
    },
    async fetchDynamicProp({ commit, state }, {payload, cb}) {
      const res = await fetchDynamicPropApi(payload)
      if (isSuccess(res)) {
        cb && cb(res.data)
      }
    },
    async fetchTaskRecordList({ commit, state }, {payload, cb}) {
      const res = await fetchTaskRecordListApi(payload)
      if (isSuccess(res)) {
        cb && cb(res.data)
        return
      }
      cb && cb()
    },
    async saveAddCustomer({ commit, state }, {payload, cb}) {
      const res = await saveAddCustomerApi(payload)
      if (isSuccess(res)) {
        cb && cb(res.data)
      } else {
        wx.showToast({title: res && res.message || '新建客户失败', icon: 'none', duration: 2000})
        return Promise.reject(res)
      }
    },
    async saveEditCustomer({ commit, state }, {payload, cb}) {
      const res = await saveEditCustomerApi(payload)
      if (isSuccess(res)) {
        cb && cb(res.data)
      } else {
        wx.showToast({title: res && res.message || '编辑客户失败', icon: 'none', duration: 2000})
        return Promise.reject(res)
      }
    },
    async fetchTaskRecordInfo({ commit, state }, {payload, cb}) {
      const res = await queryTaskRecordInfo(payload)
      if (isSuccess(res)) {
        cb && cb(res.data)
      } else {
        wx.showToast({title: res && res.message || '查询通话记录失败', icon: 'none', duration: 2000})
      }
    },
    async markRead({ commit, state }, {payload, cb}) {
      const res = await markRead(payload)
    },
    // 查询客户标签
    async fetchTagList({ commit, state }, {payload, cb}) {
      const res = await fetchTagList(payload);
      if (isSuccess(res)) {
        cb && cb(res.data)
      } else {
        wx.showToast({title: res && res.message || '查询客户标签失败', icon: 'none', duration: 2000})
      }
    },
  },
  mutations: {
    saveCustomerList (state, data) {
      state.customerList = data
    },
    saveDetailCustomerInfo (state, data) {
      state.customerInfo = data
    },
    saveCalloutInfo (state, data) {
      state.calloutInfo = data
    }
  }
}
