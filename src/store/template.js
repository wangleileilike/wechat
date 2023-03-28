import * as templateApi from "../wxapi/templateApi";
import { isSuccess } from '../services/api';

export default {
    namespaced: true,
    state: {
      templatePage: {},
      voiceDetail: {}
    },
    actions: {
      // 获取模板列表
      async fetchTemplateList({ commit, state }, { payload, cb }) {
        const res = await templateApi.fetchTemplateList(payload);
        if (isSuccess(res)) {
            commit({
              type: 'saveTemplateList',
              data: res && res.data || {}
          });   
          cb && cb(res.data || {})
        } else {
          wx.showToast({title: res && res.message || '获取模板列表失败', icon: 'none', duration: 2000})
        }
      },
      // 获取模板详情
      async fetchTemplateDetail({ commit, state }, { payload, cb }) {
        const res = await templateApi.fetchTemplateDetail(payload);
          if (isSuccess(res)) {
            cb && cb(res.data || {})
          } else {
            wx.showToast({title: res && res.message || '查询模板详情失败', icon: 'none', duration: 2000})
          }
      },
      // 获取模板的录音列表
      async fetchVoiceList({ commit, state }, { payload, cb }) {
        const res = await templateApi.fetchVoiceList(payload);
          if (isSuccess(res)) {
            cb && cb(res.data || {})
          } else {
            wx.showToast({title: res && res.message || '查询模板录音失败', icon: 'none', duration: 2000})
          }
      },
      // 录音上传
      async batchUpload({ commit, state }, { payload, cb }) {
        const res = await templateApi.batchUpload(payload);
          if (isSuccess(res)) {
            cb && cb(res.data || {})
          } else {
            wx.showToast({title: res && res.message || '录音上传失败', icon: 'none', duration: 2000})
          }
      },
      async auditTemplate({ commit, state }, { payload, cb }) {
        const res = await templateApi.auditTemplate(payload);
          if (isSuccess(res)) {
            cb && cb(res.data || {})
          } else {
            wx.showToast({title: res && res.message || '模板审核失败', icon: 'none', duration: 2000})
          }
      },
      // 获取未通过模板信息
      async queryAuditHistory({ commit, state }, { payload, cb }) {
        const res = await templateApi.queryAuditHistory(payload);
          if (isSuccess(res)) {
            cb && cb(res.data || [])
          } else {
            wx.showToast({title: res && res.message || '获取模板审核信息失败', icon: 'none', duration: 2000})
          }
      },
      // 获取单个录音文本信息
      async fetchVoiceSingleInfo({ commit, state }, { payload, cb }) {
        const res = await templateApi.fetchVoiceSingleInfo(payload);
          if (isSuccess(res)) { 
            cb && cb(res.data || {})
          } else {
            wx.showToast({title: res && res.message || '获取单个录音文本信息失败', icon: 'none', duration: 2000})
          }
      },
      // 给单个录音文本编号
      async formatVoiceId({ commit, state }, { payload, cb }) {
        const res = await templateApi.formatVoiceId(payload);
          if (isSuccess(res)) { 
            cb && cb(res)
          } else {
            wx.showToast({title: res && res.message || '录音编号失败', icon: 'none', duration: 2000})
          }
      },
       // 判断模板是否处在任务中
       async checkTemplateInTask({ commit, state }, { payload, cb }) {
        const res = await templateApi.checkTemplateInTask(payload);
          if (isSuccess(res)) { 
            cb && cb(res &&  res.data || {})
          } else {
            wx.showToast({title: res && res.message || '判断模板是否在任务中失败', icon: 'none', duration: 2000})
          }
      },
  },
    mutations: {
        saveTemplateList(state, data) {
          state.templatePage = data;
        },
        saveVoiceDetail(state, data) {
          state.voiceDetail = data;
      },
    }
  };