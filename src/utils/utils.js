import moment from 'moment';
import { find } from 'lodash';
/**
 * 号码脱敏
 */
export function numberDesensitization(number, replacement='*') {
  if (!number) {
    return;
  }
  let str = String(number);
  if (str.indexOf('-') === -1) {
    const startIndex = str.length > 3 ? 3 : 0;
    const endIndex = str.length > 3 ? (str.length > 6 ? 6 : str.length - 1) : str.length - 1;
    for (let index = startIndex; index <= endIndex; index++) {
      str = replaceStrByIndex(str, index, replacement);
    }
  } else if (str.indexOf('-') !== -1 && str.length && str.length >= 4 && str.split('-'[1])) {
    const rightStr = str.split('-')[str.split('-').length - 1];
    const startIndex = rightStr.length >= 4 ? str.length - 4 : str.length - rightStr.length;
    for (let index = startIndex; index < str.length; index++) {
      str = replaceStrByIndex(str, index, replacement);
    }
  } else {
    return number;
  }

  return str;
}

export function replaceStrByIndex(phoneStr, index, replacement='*') {
  if (typeof phoneStr !== 'string' || index > phoneStr.length - 1) {
    return;
  }

  return phoneStr.substr(0, index) + replacement + phoneStr.substr(index + 1);
}

export function getTimeDistance(type) {
    if(type === 'all') {
        return;
    }
    const now = new Date();
    const oneDay = 1000 * 60 *60 *24;

    if (type === 'today') {
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        return [moment(now), moment(now.getTime() + (oneDay - 1000))]
    }

    if (type === 'yesterday') {
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        const beginTime = moment(now).subtract(1, 'day');
        const endTime = moment(now.getTime() + (oneDay - 1000)).subtract(1, 'day');
        return [beginTime, endTime]
    }
}

export function hasAuthority(authority) {
  return function(authArray) {
    return authority && (authArray || []).indexOf(authority) >= 0;
  }
}

// 从voiceUrlList里面查询符合voiceSetId条件的voiceUrl
export function findVoiceUrl(voiceSetId, voiceUrlList) {
  const voiceInfo = find(voiceUrlList, { voiceSetId });
  return voiceInfo && voiceInfo.voiceUrl
}

// 从voice里面查找对应的录音文件名和录音地址
export function findVoiceIdAndUrl(voiceSetId, voices) {
 if (voices && voices.length) {
   for (let index = 0; index < voices.length; index++) {
     const voice = voices[index];
     const voiceUrl = voice.voiceUrlList && findVoiceUrl(voiceSetId, voice.voiceUrlList); // 筛选出录音数据url
      if (voiceUrl) {
        const voiceId = voices[index.toString()].voiceId;
        return { voiceUrl, voiceId }
      }     
   }
 }
}