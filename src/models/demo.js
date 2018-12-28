import {
  demo,
  demo2,
} from './urls';

export default [{
    key: 'demo.demo1',
    method: 'get',
    url: () => `${demo}`,
  },
  {
    key: 'demo.demo2',
    method: 'post',
    url: () => `${demo2}`,
  },
  {
    key: 'demo.resultData',
    loading: (state, action) => {
      const { payload } = action;   
      let Arrs = [];

      if (state.resultData && Array.isArray(state.resultData) && state.resultData.length > 0) {
       Arrs = [...state.resultData]
      } else {
      }
      Arrs.push(payload);
      return Arrs;
    }
  },
];
