import {
  fetchCallboxListApi,
  fetchPermissionApi,
  fetchSessionListApi,
  getSessionInfoApi,
  getOpeningRemarksApi,
  getVoiceSpeechListApi,
  taskSubmitApi,
  taskResultApi,
  fetchCallboxInfo,
  fetchKnowledgeListApi,
  fetchAddKnowledgeApi,
  fetchEditKnowledgeApi,
  fetchDeleteKnowledgeApi,
  fetchInitTextApi
} from '../services/callbox'
import { isSuccess } from '../services/api'

export default {
  namespaced: true,
  state: {
    callboxes: [],
    currentBox: null,
    permissions: [],
    sessionList: {},
    sessionInfo: {},
    // sessionInfo: {'userCode': '#28534359#', 'audioPath': '/znkf1/M00/23/E1/CgpRJV_5OKmAbuzaAASyrFlf_as885.WAV', 'sessionInfo': [{'userText': '你好', 'robotText': ['你好', '你好', '你好', '你好']}, {'userText': '你好', 'robotText': ['你好', '你好', '你好', '你好']}]},
    // openingRemarks: {voiceText: '12311123', title: '智能开场白', voiceType: 0},
    openingRemarks: {},
    voiceSpeechList: [],
    // voiceSpeechList: [{voiceTime: '0:05', title: '苕地方就开始大家', voiceText: 'jfdkfds', voiceType: 11}]
  },
  actions: {
    async getCallboxList({ commit, state }, { payload, cb }) {
      const res = await fetchCallboxListApi(payload)
      if (isSuccess(res)) {
        commit('SAVE_CALLBOX_LIST', res.data)
      }
      cb && cb(res.data || {})
    },
    // 获取来电记录列表
    async fetchSessionList({ commit, state }, { payload, cb }) {
      const res = await fetchSessionListApi(payload)
      if (isSuccess(res)) {
        commit('SAVE_SESSION_LIST', res.data)
        cb && cb(res.data || {})
      } else {
        wx.showToast({title: res && res.msg || '获取列表失败', icon: 'none', duration: 2000})
      }
    },
    // 获取来电记录详情
    async getSessionInfo({ commit, state }, payload) {
      const res = await getSessionInfoApi(payload)
      if (isSuccess(res)) {
        commit('SAVE_SESSION_INFO', res.data)
        return Promise.resolve(res)
      } else {
        wx.showToast({title: res && res.msg || '获取数据失败', icon: 'none', duration: 2000})
      }
    },
    // 获取开场白数据
    async getOpeningRemarks({ commit, state }, { payload, cb }) {
      const res = await getOpeningRemarksApi(payload)
      if (isSuccess(res)) {
        commit('SAVE_OPEN_REMARKS', res.data)
        cb && cb(res.data || {})
      } else {
        wx.showToast({title: res && res.msg || '获取开场白失败', icon: 'none', duration: 2000})
      }
    },
    // 获取兜底话术列表
    async getVoiceSpeechList({ commit, state }, payload) {
      const res = await getVoiceSpeechListApi(payload)
      if (isSuccess(res)) {
        commit('SAVE_SPEECH_LIST', res.data)
        return Promise.resolve(res)
        // cb && cb(res.data || {})
      } else {
        wx.showToast({title: res && res.msg || '获取数据失败', icon: 'none', duration: 2000})
      }
    },
    // 异步任务创建，拿到任务id
    async taskSubmit({ commit, state }, payload) {
      const res = await taskSubmitApi(payload)
      if (isSuccess(res)) {
        return Promise.resolve(res)
      } else {
        wx.showToast({title: res && res.msg || '获取接口失败', icon: 'none', duration: 2000})
        return Promise.reject(res)
      }
    },
    // 轮询任务查询接口
    async taskResult({ commit, state }, payload) {
      const res = await taskResultApi(payload)
      return res
    },
    // 根据Id查询电话盒子信息
    async fetchCallboxInfo({ commit, state }, payload) {
      const res = await fetchCallboxInfo(payload);
      if (isSuccess(res)) {
        commit('UPDATE_CURRENT_BOX', res.data[0] || {});
      } else {
        wx.showToast({title: res && res.msg || '获取电话机详情失败', icon: 'none', duration: 2000})
      }
    },
    // 查询知识库列表
    async fetchKnowledgeList({ commit, state }, { payload, cb }) {
      const res = await fetchKnowledgeListApi(payload)
      if (isSuccess(res)) {
        cb && cb(res.data || {})
      } else {
        wx.showToast({title: res && res.msg || '获取知识库列表失败', icon: 'none', duration: 2000})
      }
    },
    // 增加知识库
    async fetchAddKnowledge({ commit, state }, payload) {
      const res = await fetchAddKnowledgeApi(payload)
      if (isSuccess(res)) {
        return Promise.resolve(res)
      } else {
        wx.showToast({title: res && res.msg || '增加知识库失败', icon: 'none', duration: 2000})
        return Promise.reject(res)
      }
    },
    // 编辑知识库
    async fetchEditKnowledge({ commit, state }, payload) {
      const res = await fetchEditKnowledgeApi(payload)
      if (isSuccess(res)) {
        return Promise.resolve(res)
      } else {
        wx.showToast({title: res && res.msg || '编辑知识库失败', icon: 'none', duration: 2000})
        return Promise.reject(res)
      }
    },
    // 删除知识库
    async fetchDeleteKnowledge({ commit, state }, payload) {
      const res = await fetchDeleteKnowledgeApi(payload)
      if (isSuccess(res)) {
        return Promise.resolve(res)
      } else {
        wx.showToast({title: res && res.msg || '删除知识库失败', icon: 'none', duration: 2000})
        return Promise.reject(res)
      }
    },
    // 兜底话术配置恢复默认
    async fetchInitText({ commit, state }, payload) {
      const res = await fetchInitTextApi(payload)
      if (isSuccess(res)) {
        return Promise.resolve(res)
      } else {
        wx.showToast({title: res && res.msg || '恢复默认失败', icon: 'none', duration: 2000})
        return Promise.reject(res)
      }
    },
  },
  mutations: {
    SAVE_CALLBOX_LIST(state, data) {
      state.callboxes = data.list || []
    },
    UPDATE_CURRENT_BOX(state, item) {
      state.currentBox = item
    },
    SAVE_SESSION_LIST(state, data) {
      state.sessionList = data
    },
    SAVE_SESSION_INFO(state, data) {
      state.sessionInfo = data
    },
    SAVE_OPEN_REMARKS(state, data) {
      state.openingRemarks = data
    },
    SAVE_SPEECH_LIST(state, data) {
      state.voiceSpeechList = data
    },
  }
}
