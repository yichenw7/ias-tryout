import * as Types from '@constants/ActionTypes';

export default [
  {
    key: 'filter.isCredibility',
    action: Types.FILTER_ISCREDIBILITY,
    initialState: {
      isCredibility: 'RCMD',
    },
    loading: (state, action) => {
      const { payload } = action;
      return {
        isCredibility: payload,
      };
    },
  },
  {
    key: 'filter.bondHisChartSelected',
    action: Types.BOND_HIS_CHART_CLICK,
    initialState: {
      date: '',
    },
    loading: (state, action) => ({
      date: action.payload,
    }),
  },
  {
    key: 'filter.bondValuationChartSelected',
    action: Types.BOND_VALUATION_CHART_CLICK,
    initialState: {
      date: '',
    },
    loading: (state, action) => {
      const { payload } = action;
      return {
        date: payload,
      };
    },
  },
];