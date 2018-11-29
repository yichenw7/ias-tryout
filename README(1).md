# Sumscope Web 前端轻量级脚手架

---

### App 初始化使用示例
```javascript
import App from 'ss-web-start';

async function onEffect(action, res) { // redux-saga 拦截器
  if (action.url.startsWith('/api/')) {
      return action
  } else {
      // 设置相对应得action
  }
  return action;
}

function onReducer(newState, state, action, type) { // reducer 拦截器
    // type 包含 loading success fail
}

function onFetchOption(option, item) {
  if (item.key !== 'user.login') {
      option.headers = option.headers || {};
      option.headers.userId = userId;
  }
  return option;
}

function routes() {
  return (
    <Router>
      <Route path='/login' exact component={login} />
    </Router> 
  )
}

const app = new App({
    onEffect, 
    onReducer, 
    onFetchOption,
});
app.models(models);
app.router((app, Routers) => {
  return routes(Routers, history);
});
app.start('#app');
```

### model 示例

```javascript
export default [
  {
    key: 'user.login',
    method: 'post',
    url: () => '/api/user/login',
  },
  {
    key: 'user.info',
  },
  {
    key: 'user.info',
    url: () => '',
    loading: (state, action) => {return {}},
    success: (state, action) => {return {}},
    fail: (state, action) => {return {}},
    onEffect: (arg1, arg2, arg3, arg4) => {
        // arg1 即为当前redux action
        // arg2 为一个Object {fetch， option}
        // arg3 是redux effect集合， 提供 put 等方法
        // arg4 是对应的model
    }
  }
];
```
