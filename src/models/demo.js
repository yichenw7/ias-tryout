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
      // console.log('11111111', state, action);
      const { payload } = action;   

      let Arrs = [];

      if (state.resultData && Array.isArray(state.resultData) && state.resultData.length > 0) {
        // console.log(11113333);
       Arrs = [...state.resultData]
      } else {
      }
      Arrs.push(payload);
      // console.log('44444', state);
      return Arrs;
    }
    // loading: (state, action) => {
    //   console.log(74, state, action);
    //   let {payload} = action;
    //   let {resultData} = state;
    //   resultData.userContents = [];
    //   resultData.userContents.push(resultData);
    //   return resultData.userContents;
    // }
  },
];
