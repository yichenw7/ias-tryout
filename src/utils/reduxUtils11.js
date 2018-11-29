import UserCache from '@caches/UserCache';
import ErrorCode from '@constants/ErrorCode';
import { message } from 'antd';

const webBondApi = ['/bond/api/bondMarket', '/bond/api/bondIssuer', '/bond/api/webBond', '/bond/api/bondMassAPI'];
export const onEffect = async (action, res) => {
  try {
    const body = await res.json();
    const { url } = action;
    action.status = res.status;
    action.loading = false;
    if (url.startsWith('/bond/api/webBond/subscribe')) {
      const { code, message: msg, result } = body;
      action.message = msg;
      if (code === 0) {
        action.success = true;
        action.result = result;
      } else {
        action.success = false;
        action.status = code;
        action.message = msg;
      }
      return action;
    }
    if (webBondApi.some(api => url.startsWith(api))) {
      action.success = res.status === 200;
      if (res.status === 200) {
        const { meta, data } = body;
        if (meta && meta.errNum) {
          action.success = false;
          action.error = ErrorCode[meta.errNum];
        } else {
          action.result = data;
          action.success = true;
        }
      } else {
        action.success = false;
        action.error = '服务端异常';
      }
      return action;
    }
    if (url.startsWith('/bond/api/')) {
      action.status = body.status;
      action.message = body.message;
      action.success = body.status === 200;
      action.result = body.content;
      if (action.status === 401) {
        UserCache.user = null;
        UserCache.permission = null;
      }
      return action;
    }
  } catch (err) {
    message.error(err.message);
    action.success = false;
    action.error = '服务端异常';
  }
  return action;
};

export const onFetchOption = (option, item) => {
  if (item.key !== 'user.login') {
    if (UserCache.user) {
      option.headers = option.headers || {};
      option.headers.userId = UserCache.user.userId;
    }
  }
  return option;
};