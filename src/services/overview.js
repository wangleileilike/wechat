/* eslint-disable camelcase */
import api from '../wxapi/main'
const { requestJson, request, statisHost } = api
const thirdparty_url_api = 'unified-service'
const source_host = 'source-service'
const robotHost = 'robot-server';

// function getMockSourceData() {
//   const phoneNumber = Math.floor(Math.random() * 1000)
//   const phoneToManualNumber = Math.floor(Math.random() * 100)
//   const phoneToManualNumberRate = (phoneToManualNumber / phoneNumber).toFixed(2) + '%'

//   return {
//     phoneNumber,
//     phoneToManualNumber,
//     phoneToManualNumberRate
//   }
// }

export const fetchCalloutDataApi = params => request(`${statisHost}/statistics/robot/calldata/summary`, 'get', params)

export const fetchSourcesApi = params => requestJson(`${source_host}/source/phone/listNames`, 'GET', params, {}, true)
export const fetchSourceDataApi = ({params, header}) => request('robot-server/platform/mobile/report/getData', 'GET', { name: 'index', ...params }, header)

export const fetchAnswerResultApi = params => requestJson(`${robotHost}/platform/report/histogramQuery`, 'POST', params,  {source: params.source || ''})
export const fetchRecognitionResultApi = params => requestJson(`${robotHost}/platform/mobile/report/listQuery`, 'POST', params,  {source: params.source || ''})
