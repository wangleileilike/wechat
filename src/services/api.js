import api from '../wxapi/main';
const { thirdparty_url, fileHost } = api;

export function isSuccess(data) {
    return data && (data.code === 0 || data.code === '0');
}

export const fileDownUrl = `${thirdparty_url}/${fileHost}/common/download`;