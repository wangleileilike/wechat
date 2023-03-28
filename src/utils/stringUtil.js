import { stringify } from 'qs';


//将url与params拼接
export function concatUrlParam(url, params) {
    return `${url}?${stringify(params, { arrayFormat: 'repeat' })}`
}