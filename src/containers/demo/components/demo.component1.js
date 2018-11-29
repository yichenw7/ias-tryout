import React from 'react';
import {
  Table
} from 'antd';
import {
  connect
} from 'react-redux';
import action from '../../../actions';
import './style.less';
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
      users: [],
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
      const user = nextProps.user;
      const tryout = [];
      if (Array.isArray(lst) && lst.length > 0) {
        lst.forEach((item) => {
          if (item.apply_time > '2018-08-01 00:00:00') tryout.push(item);
        })
        const newData = []

        tryout.forEach((item, index) => {
          if (index == 0) {
            let payload = {
              qb_user_name: item.qb_user_name,
            }
            action.emit('demo.demo2', payload);
          }
        })

        this.setState({
          data: newData
        })
      }
    }
    if (nextProps.user !== this.props.user) {
      let users = [];
      console.log(nextProps.user, 4444);
      users.push(nextProps.user);
      this.setState({
        users: users,
      });
    }
  };

  componentWillUpdate (nextProps,nextState) {
    if (nextState.users !== this.state.users) {

    }
  }

  render() {
    const {
      data,
      pagination
    } = this.state;

    return ( <div>
      <Table columns = {
        columns
      }
      dataSource = {
        data
      }
      rowClassName = {
        data => data.qb_user_name.indexOf('@') > -1 ? 'not-sumscope' : ''
      }
      pagination = {
        pagination
      }
      style = {
        {
          margin: '20px'
        }
      }
      rowKey = {
        data => data.id
      }
      bordered />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    tryoutData: state.demo.demo1.result,
    user: state.demo.demo2.result,
  };
}

export default connect(mapStateToProps)(Tryout);
