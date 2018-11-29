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
        let user_list = [];
        tryout.forEach((item, index) => {
          // let payload = {
          //   qb_user_name: item.qb_user_name,
          // }
          user_list.push(item.qb_user_name);
          
        })
        const userListSet = new Set(user_list);

        let payload = {
          user_list: [...userListSet],
        }
        action.emit('demo.demo2', payload);
      }
      this.setState({
        tryoutData:tryout,
      })
    }
    if(nextProps.users){
      const users = nextProps.users;
      let data = [];
      let list = {};
      this.state.tryoutData.forEach((item, index) => {
        let ls = users.findIndex((value,index) => {
          if(value !==null && value.username == item.qb_user_name){
            return true;
          }
        })
        if(ls > 0){
         list = {
          apply_time: item.apply_time,
          qb_user_name: item.qb_user_name,
          displayName: users[ls].displayName,
          companyName: users[ls].companyName,
          dept: users[ls].dept,
          title: users[ls].title,
          size: item.size,
          contact: item.contact,
          occupation: item.occupation,
          used: item.used,
          service: item.service,
          status: item.status,
          id: item.id,
         }
        }else {
          list = {
            apply_time: item.apply_time,
            qb_user_name: item.qb_user_name,
            displayName: null,
            companyName: null,
            dept: null,
            title: null,
            size: item.size,
            contact: item.contact,
            occupation: item.occupation,
            used: item.used,
            service: item.service,
            status: item.status,
            id: item.id,
           }
        }
        
        data.push(list);
      })
      this.setState({
        data: data,
      })
    }
  };


  render() {
    const {data,pagination} = this.state;                    
    return ( <div>
      <Table columns = {columns} dataSource = {data} rowClassName = {data => data.qb_user_name.indexOf('@') > -1 ? 'not-sumscope' : '' } pagination = {pagination} style = {{margin: '20px'}} rowKey = {data => data.id} bordered />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    tryoutData: state.demo.demo1.result,
    users: state.demo.demo2.result,
  };
}

export default connect(mapStateToProps)(Tryout);
