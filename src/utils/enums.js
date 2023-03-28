const enums = {
  ACCOUNT_TYPE: {
    ADMIN: {code: 0, desc: '超管平台'},
    DEALER: {code: 1, desc: '代理商'},
    COMPANY: {code: 2, desc: '公司'},
    DEPARTMENT: {code: 3, desc: '部门'},
    TEST: {code: 3, desc: '体验帐号'}
  },
  TEMPLATE_STATUES: {
    "pass": "已通过",
    "noPass": "未通过",
    "Editing": "编辑中",
    "Audit": "待审核"
  },
  VOICE_TEXT_TYPE: {
    "multinode": "多轮",
    "similar": "单轮",
    "bootstrap": "兜底"
  }
}

export const isDepartmentAccount = (code) => {
  return code && code === enums.ACCOUNT_TYPE.DEPARTMENT.code;
}

export default enums