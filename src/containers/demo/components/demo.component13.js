import React from 'react';
import {Table} from 'antd';
import {connect} from 'react-redux';
import action from '../../../actions';
import './style.less';
import { isNull } from 'util';
export const userUrl = [];

const columns = [{
  title: '时间',
  dataIndex: 'apply_time',
  sorter: (a, b) => a.apply_time > b.apply_time ? -1 : 1,
}, {
  title: '用户名',
  dataIndex: 'qb_user_name',
}, {
  title: '姓名',
  dataIndex: 'displayName',
}, {
  title: '机构',
  dataIndex: 'companyName',
}, {
  title: '部门',
  dataIndex: 'dept',
}, {
  title: '职位',
  dataIndex: 'title',
}, {
  title: '资产规模',
  dataIndex: 'size',
}, {
  title: '联系方式',
  dataIndex: 'contact',
}, {
  title: '职位级别',
  dataIndex: 'occupation',
}, {
  title: '曾经使用过',
  dataIndex: 'used',
}, {
  title: '期望服务',
  dataIndex: 'service',
}, {
  title: '状态',
  dataIndex: 'status',
}];

class Tryout extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {
        pageSize: 20,
      },
      setClassName: '',
      loading: false,
      tryoutData: [],
      user: {},
    }
  }

  componentWillMount() {
    // console.log(41414, this.props);
    // const {dispatch} = this.props;
    action.emit('demo.demo1')
    // dispatch({type: 'DEMO', payload: ''});

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.tryoutData !== this.props.tryoutData) {
      const lst = nextProps.tryoutData;
      let tryout = [];

      if (Array.isArray(lst) && lst.length > 0) {
        lst.forEach((item) => {
          if (item.apply_time > '2018-08-01 00:00:00') tryout.push(item);
        })  
        tryout.sort((a, b) => a.apply_time > b.apply_time ? -1 : 1);
        tryout.forEach((item, index) => {
          let payload = {
            qb_user_name: item.qb_user_name,
          }
          action.emit('demo.demo2', payload);
        })
      }
      this.setState({
        tryoutData: tryout,
      })
    }
    if (nextProps.user !== this.props.user) {
      this.setState({
        user: nextProps.user,
      })
    }
    if(nextProps.resultData.length > 0){
      this.setState({
        data: nextProps.resultData,
      })
    }
  };

  componentWillUpdate (nextProps,nextState) {
    let source = {};

    nextState.tryoutData.map((tryoutData, index)=> {
      if(!tryoutData.flag && nextState.user !== this.state.user && nextState.user && tryoutData.qb_user_name === nextState.user.username){
        tryoutData.flag = true;
        return source = {
          apply_time: tryoutData.apply_time,
          qb_user_name: tryoutData.qb_user_name,
          displayName: nextState.user.displayName,
          companyName: nextState.user.companyName,
          dept: nextState.user.dept,
          title: nextState.user.title,
          size: tryoutData.size,
          contact: tryoutData.contact,
          occupation: tryoutData.occupation,
          used: tryoutData.used,
          service: tryoutData.service,
          status: tryoutData.status,
          id: tryoutData.id,
        }
      } 
      // else if(!tryoutData.flag && nextState.user == null){
      //   tryoutData.flag = true;
      //   return source = {
      //     apply_time: tryoutData.apply_time,
      //     qb_user_name: tryoutData.qb_user_name,
      //     displayName: null,
      //     companyName: null,
      //     dept: null,
      //     title: null,
      //     size: tryoutData.size,
      //     contact: tryoutData.contact,
      //     occupation: tryoutData.occupation,
      //     used: tryoutData.used,
      //     service: tryoutData.service,
      //     status: tryoutData.status,
      //     id: tryoutData.id,
      //   }
      // }
    })
    // console.log(41, source);
    let payload = source;
    console.log(source,'00000000000000')
    // console.log(78, payload, payload.length);

    if (JSON.stringify(payload) !== '{}') {
      // console.log(66, payload);
      action.emit('demo.resultData', payload);
    }
  }
  
  render() {
    const {data,pagination} = this.state;
    // console.log(451, data);

    return ( <div>
      <Table columns = {columns} dataSource = {data}  pagination = {pagination} style = {{margin: '20px'}} rowKey = {data => data.id} bordered />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    tryoutData: state.demo.demo1.result,
    user: state.demo.demo2.result,
    resultData: state.demo.resultData,
  };
}

export default connect(mapStateToProps)(Tryout);
