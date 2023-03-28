/* eslint-disable camelcase */
import api from '../wxapi/main'
const { requestJson, request, callboxHost, robotHost, thirdparty_url } = api
const VOICEREVIEW = 'robot-server/platform/mobile/voiceReview'
const VOICESPEECH = 'robot-server/platform/mobile/VoiceSpeech'
const TASK = 'robot-server/platform/mobile/task'

export const fetchCallboxListApi = params => requestJson(`${callboxHost}/callbox-config/formal/page`, 'GET', params, {}, true)
export const fetchSessionListApi = params => request(`${VOICEREVIEW}/getSessionList`, 'GET', params, {source: params.source || ''})
export const getSessionInfoApi = params => request(`${VOICEREVIEW}/getSessionInfo`, 'GET', params, {source: params.source || ''})
export const getOpeningRemarksApi = params => request(`${VOICESPEECH}/getOpeningRemarks`, 'GET', params, {source: params.source || ''})
export const getVoiceSpeechListApi = params => request(`${VOICESPEECH}/getVoiceSpeechList`, 'GET', params, {source: params.source || ''})
export const taskSubmitApi = params => requestJson(`${TASK}/submit`, 'POST', params, {source: params.source || ''})
export const taskResultApi = params => request(`${TASK}/result`, 'POST', params, {source: params.source || ''})
export const fileDownUrl = params => { return `${thirdparty_url}${params}` }
// 根据Id查询电话盒子信息
export const fetchCallboxInfo = params => requestJson(`${callboxHost}/callbox-config/callboxs/batch`, 'GET', params);
// 知识库配置页面接口
export const fetchKnowledgeListApi = params => request(`${robotHost}/platform/mobile/corpus/getQaData`, 'POST', params, {source: params.source || ''});
export const fetchAddKnowledgeApi = params => requestJson(`${robotHost}/platform/mobile/corpus/addQa`, 'POST', params, {source: params.source || ''});
export const fetchEditKnowledgeApi = params => requestJson(`${robotHost}/platform/mobile/corpus/updateAnswer`, 'POST', params, {source: params.source || ''});
export const fetchDeleteKnowledgeApi = params => request(`${robotHost}/platform/mobile/corpus/deleteQa`, 'POST', params, {source: params.source || ''});
// 兜底话术配置恢复默认
export const fetchInitTextApi = params => request(`${robotHost}/platform/mobile/VoiceSpeech/restoreVoiceText`, 'GET', params, {source: params.source || ''});
