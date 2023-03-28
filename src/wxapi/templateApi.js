import api from '../wxapi/main';
const { thirdparty_url_api, request, requestJson, taskHost, templateHost } = api;

// 模板列表
export const fetchTemplateList = payload => request(`${templateHost}/template/list`, 'GET', payload);
// 查询模板详情
export const fetchTemplateDetail = payload => request(`${templateHost}/template/detail`, 'GET', payload);
// 查询模板录音(列表)
export const fetchVoiceList = payload => request(`${templateHost}/record/queryText`, 'GET', payload);
// 录音上传
export const batchUpload = ({ formData, data }) => request(`${templateHost}/record/batchUpload?templateId=${data.templateId}&uploadSrc=${data.uploadSrc}&voiceSetId=${data.voiceSetId}`, 'POST', formData, {'Content-Type': 'multipart/form-data'});
// 录音上传地址
export const batchUrl = `${templateHost}/record/batchUpload`;
// 模板审核
export const auditTemplate = payload => request(`${templateHost}/audit/updateTemplateAuditStatus`, 'POST', payload);
// 获取未通过模板信息
export const queryAuditHistory = payload => request(`${templateHost}/audit/queryAuditHistory`, 'POST', payload);
// 查找单条录音信息
export const fetchVoiceSingleInfo = payload => request(`${templateHost}/record/single-text`, 'GET', payload);
// 给指定的录音文本更新录音编号
export const formatVoiceId = payload => request(`${templateHost}/record/voiceId?templateId=${payload.templateId}&type=${payload.type}&id=${payload.id}`, 'POST', {});
// 判断模板是否处在任务中
export const checkTemplateInTask = payload => request(`${taskHost}/background/task/checkTemplateInTask`, 'GET', payload);