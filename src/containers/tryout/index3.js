import React from 'react';
import fetch from 'whatwg-fetch';
import { Table } from 'antd';
import './style.less';


class Tryout extends React.Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {},
      loading: false,
    }
  }
  
  componentWillMount() {
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

    const data = [{
      "status": "0",
       "apply_time": "2018-01-15 15:09:17", 
       "contact": null, 
       "qb_user_name": "wangyilin_ruc2017@163.com", 
       "service": null, 
       "occupation": null, 
       "id": "000ef82af9c311e790321866da610fb6", 
       "used": null, 
       "size": null
      }, {
        "status": "1", 
        "apply_time": "2018-08-20 13:15:06", 
        "contact": "0755-23986971", 
        "qb_user_name": "chenguilin@cmwachina.com", 
        "service": "\u7ba1\u7406\u53f0\u8d26", 
        "occupation": "\u4ea4\u6613\u5458", 
        "id": "00207e36a43811e8a34e1866da610fb6", 
        "used": "Excel", 
        "size": "50\u4ebf\u4ee5\u4e0b"
      }, {
        "status": "0", 
        "apply_time": "2018-06-26 14:13:10", 
        "contact": null, 
        "qb_user_name": "hui-1002@163.com", 
        "service": null, 
        "occupation": null, 
        "id": "003c595e790811e8845f1866da610fb6", 
        "used": null, "size": null
      }, {
        "status": "0", 
        "apply_time": "2018-06-19 16:01:41", 
        "contact": null, 
        "qb_user_name": "jbchow@163.com", 
        "service": null,
        "occupation": null, 
        "id": "004a0b60739711e88f2a1866da610fb6", 
        "used": null, 
        "size": null
      }, {
        "status": "0", 
        "apply_time": "2018-02-13 10:02:53",
         "contact": null, 
         "qb_user_name": "qingzhou.wang@ccblifeamc.com", 
         "service": null, 
         "occupation": null, 
         "id": "006d6b34106211e88c721866da610fb6", 
         "used": null, 
         "size": null
        }, {
          "status": "0", 
          "apply_time": "2018-05-03 17:33:13", 
          "contact": null, 
          "qb_user_name": "palmdale@regentcapital.cn", 
          "service": null, 
          "occupation": null, 
          "id": "00854d584eb511e8838c1866da610fb6", 
          "used": null, 
          "size": null
        }, {
          "status": "1", 
          "apply_time": "2018-03-13 17:36:27", 
          "contact": "028-83168025", 
          "qb_user_name": "2776494@qq.com", 
          "service": "\u7ba1\u7406\u53f0\u8d26", 
          "occupation": "\u4ea4\u6613\u5458", 
          "id": "0098371426a211e88c721866da610fb6", 
          "used": "\u4e07\u5f97AMS", 
          "size": "100\u4ebf\u4ee5\u4e0a"
        }]
    this.state.columns = columns;
    this.state.data = data;
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

export default Tryout;