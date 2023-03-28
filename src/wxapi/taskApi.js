import api from '../wxapi/main';
const { lineHost, userHost, taskHost, templateHost, customerCenterHost } = api;
export const baseUrl = '';
export const robotHost = 'robot-service';


// 任务列表
export const queryTask = `${taskHost}/background/task/list`
//wechat/details/query
// 任务详情
export const queryTaskInfo = `${taskHost}/background/task/record/list`

//消息
export const message=`znkf-wechat/api/records`

// 意向
export const intentions =`${templateHost}/template/intentions`

// 规则名称
export const  queryRuleNames=`${taskHost}/background/rule/list`
///rule/queryRuleNames

// 模板名称
export const listTemplateNames =`${templateHost}/template/listTemplateNames`


// 部门
export const listDept = `${userHost}/company/dept/listDeptNames`

// 任务名称是否存在
export const isRuleExists=`${taskHost}/background/rule/isExists`

//
export const createRule=`${taskHost}/background/rule/create`

// 任务名称是否存在
export const isTaskExists=`${taskHost}/background/task/isExists`

// 创建任务
export const createTask = `${customerCenterHost}/customers/create-task`
// 查询机器人数量
export const companyRobotNum = `${robotHost}/robot/companyRobotNum`

// 分配机器人iD
export const queryRobotId =   `${robotHost}/robot/wechatDistribution` 

export const getUserInfo = `${userHost}/company/user/accountInfo`

export const getProp = `speech-service/composite/getProp`;

export const voicePacketQuery= `speech-service/voicepacket/query`;
// 查询机器人
export const robotList =`${robotHost}/robot/list`;
// 机器人数量 
export const getRobotNum = `${robotHost}/robot/nums`;
// 获取主叫号码列表 
export const getCaller = `${lineHost}/ipcc/caller/callers`;
