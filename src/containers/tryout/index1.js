import './style.less';
import React from 'react';
import fetch from 'whatwg-fetch';
import { Table } from 'antd';
import reqwest from 'reqwest';


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
    const columns = [{
      title: '时间',
      dataIndex: 'apply_time',
      sorter: true,
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
    },{
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
    this.state.columns = columns;
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }

  fetch = (params = {}) => {
    console.log('params:', params);
    this.setState({ loading: true });
    reqwest({
      url: 'https://randomuser.me/api',
      method: 'get',
      data: {
        results: 10,
        ...params,
      },
      type: 'json',
    }).then((data) => {
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = 200;
      this.setState({
        loading: false,
        data: data.results,
        pagination,
      });
    });
  }

  componentDidMount() {
    this.fetch();
  }

  getData(){ //请求数据函数
    fetch(`https://ias.idbhost.com/api/tryout/`)
    .then(res => res.json())
      .then(json =>  { console.log(json)
        // json.code === '0000' ? json.data : [];
        // this.setState({data: json.data})
    })
}

  
  // getTryoutList() {
  //   fetch('https://ias.idbhost.com/api/tryout')
  //   .then(res => res.json())
  //   .then(json => json.code === '0000' ? json.data : [])  
  // }

  // getQBUserInfo(username) {
  //   fetch('http://192.168.1.212:5678/user/'.concat(username))
  //   .then(res => res.json())
  // }
  // dealData() {
  //     this.getTryoutList().then(data =>{
  //         const lst = [];
  //         data.forEach(item => {
  //             if (item.apply_time >'2018-08-01 00:00:00') lst.push(item);
  //         })
  //         lst.sort((a, b) => a.apply_time > b.apply_time ? -1 : 1)
  //     })
  // }
   
render() {
    const {columns, data} = this.state;
    // const columns = this.state.columns;
    // const data = this.state.data;

    return (
      <div>
        <Table
          columns={columns}
          rowKey={record => record.login.uuid}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
      />
      </div>
    );      
  }
}

export default Tryout;