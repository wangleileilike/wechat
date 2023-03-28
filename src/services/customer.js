import api from '../wxapi/main';
const { requestJson,request, thirdparty_url_api, userHost, taskHost, customerCenterHost } = api;

export const fetchCustomerListApi = params => requestJson(`${customerCenterHost}/customers/key-word-page`, 'GET', params)
// background/wechat/details/query

export const fetchdeptListApi = params => requestJson(`${userHost}/company/dept/list`, 'GET', params)

export const fetchcaListApi = params => requestJson(`${userHost}/company/user/caList`, 'GET', params)

export const fetchDynamicPropApi = params => requestJson(`${taskHost}/background/dynamicProp/page`, 'GET', params)

export const fetchTaskRecordListApi = params => requestJson(`${taskHost}/background/task/record/list`, 'POST', params)

// 新建用户
export const saveAddCustomerApi = params => requestJson(`${customerCenterHost}/customers/customers`, 'POST', params)

// 编辑用户
export const saveEditCustomerApi = params => requestJson(`${customerCenterHost}/customers/${params.id}/wechat-customer`, 'POST', params)

export const queryTaskRecordInfo = params => requestJson(`${taskHost}/background/task/record/${params && params.id}/records`, 'GET')

export const markRead = params => request('znkf-wechat/api/record/mark_read', 'POST', params)

export const fetchTagList = params => request(`${customerCenterHost}/customer-tag/tags`, 'GET', params)

