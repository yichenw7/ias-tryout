import React from 'react';
import Bundle from 'react-router-bundle';

export default props => (
  <Bundle load={() => import('@containers/tryout/index')}>
    {(COM) => <COM {...props} title='Demo' prefixCls='ss' />}
  </Bundle>
)
