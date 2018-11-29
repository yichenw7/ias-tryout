export const onEffect = async (action, response) => {
    try {
      const body = await response.json();
      action.status = body.status;
      action.loading = false;
  
      action.success = response.status === 200;
      if (response.status === 200) {
        const {code, data} = body;
        if (code === '0000') {
          action.success = true;
          action.result = data;
        } else {
          action.success = false;
          action.error = '服务端异常';
        }
      } else {
        action.success = false;
        action.error = '服务端异常';
      }
    } catch (err) {
      message.error(err.message);
      action.success = false;
      action.error = '服务端异常';
    }
   
    return action;
  }