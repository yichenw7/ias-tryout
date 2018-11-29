import React from 'react';
import { Table } from 'antd';
import {connect} from 'react-redux';
import './style.less';
class Tryout extends React.Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
  }

  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    console.log(41414, this.props);
    const {dispatch} = this.props;
    const columns = [{
      title: '时间',
      dataIndex: 'apply_time',
      sorter: (a, b) => a.apply_time - b.apply_time,
      width: '10%',
    }, {
      title: '用户名',
      dataIndex: 'qb_user_name',
      width: '10%',
    }, {
      title: '资产规模',
      dataIndex: 'size',
      width: '10%',
    }, {
      title: '联系方式',
      dataIndex: 'contact',
      width: '10%',
    }, {
      title: '职位级别',
      dataIndex: 'occupation',
      width: '10%',
    }, {
      title: '曾经使用过',
      dataIndex: 'used',
      width: '10%',
    }, {
      title: '期望服务',
      dataIndex: 'service',
      width: '10%',
    }, {
      title: '状态',
      dataIndex: 'status',
      width: '10%',
    }];
    
    dispatch({type: 'DEMO', payload: ''});
    // fetch('https://ias.idbhost.com/api/tryout')
    // .then(res => res.json())
    // .then(json => {json.code === '0000' ? json.data : [];
    //     this.setState({data: json.data})    
    // })
    // this.state.columns = columns;
    // this.state.data = data;
  }

render() {
    const {columns, data} = this.state;
    // const columns = this.state.columns;
    // const data = this.state.data;

    return (
      <div>
        <Table columns={columns} dataSource={data} style={{margin:'20px'}} />
      </div>
    );      
  }
}
function mapStateToProps(state, props) {
  return {
  
  };
}

export default connect(mapStateToProps)(Tryout);

//export default Tryout;