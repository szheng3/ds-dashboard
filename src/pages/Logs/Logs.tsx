import React, { Component, Fragment } from 'react';
import { Badge, Card, Divider, Modal, Steps } from 'antd';
import { connect } from 'dva';
import { IMLogsState } from '@/pages/Logs/models/log';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableView from '@/components/Table/TableView';
import { PaginationProps } from 'antd/es/pagination';
import Description from '@/components/DescriptionList/Description';
import DescriptionList from '@/components/DescriptionList';
import { DSList, DSlog } from '@/response/logs';
// import moment = require('moment');
import moment from 'moment';

/*
const statusMap = ['default', 'processing', 'success', 'error'];
*/
const statusMap = {
  'GET': 'success',
  'POST': 'processing',
  'PUT': 'default',
  'DELETE': 'error',
};

enum ActionType {
  FETCH,
}

interface IDSProps {
  dispatch: any
  loading: boolean
  logs: IMLogsState
}

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(({ logs, loading }) => ({
  logs,
  loading: loading.models.logs,
}))
export default class Logs extends Component<IDSProps, any> {

  state = {
    selectedRows: [],
    updateModalVisible: false,
    stepFormValues: {},
    tabKey: 'ipDetails',

  };
  columns = [
    {
      title: 'OS',
      dataIndex: 'os',
    },
    {
      title: '客户端',
      dataIndex: 'brower',
    },
    {
      title: '描述',
      dataIndex: 'ip',
      // key: 'ip',
      // render: val => `${val} 万`,

    },
    {
      title: '响应',
      dataIndex: 'duration',
      sorter: true,
      align: 'right' as 'right',
      render: val => `${val} m`,
      // mark to display a total number
      // needTotal: true,
    },
    {
      title: '方法',
      dataIndex: 'method',
      filters: [
        {
          text: 'GET',
          value: 'GET',
        },
        {
          text: 'POST',
          value: 'POST',
        },
        {
          text: 'PUT',
          value: 'PUT',
        },
        {
          text: 'DELETE',
          value: 'DELETE',
        },
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={val}/>;
      },
    },
    // {
    //   title: '方法',
    //   dataIndex: 'method',
    //   // sorter: true,
    //   // render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    // },
    {
      title: '用户ID',
      dataIndex: 'uid',
      // sorter: true,
      // render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '请求状态',
      dataIndex: 'statusCode',
      // sorter: true,
      // render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '国家',
      dataIndex: 'country',
      // sorter: true,
      // render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '城市',
      dataIndex: 'city',
      // sorter: true,
      // render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: 'url',
      dataIndex: 'url',
      // sorter: true,
      // render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '请求时间',
      dataIndex: 'date',
      // sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a
            onClick={() => this.handleUpdateModalVisible(true, record)}>查看详情</a>
          {/*<Divider type="vertical"/>*/}
          {/*<a href="">订阅警报</a>*/}
        </Fragment>
      ),
    },
  ];
  handleUpdateModalVisible = (flag?, record?) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  apiAction = (payload, type: ActionType) => {
    const { dispatch } = this.props;

    switch (type) {
      case ActionType.FETCH:
        dispatch({
          type: 'logs/fetchLogs',
          payload,
        });
        break;
      default:
        break;
    }

  };

  componentDidMount() {
    this.apiAction({ pageNum: 1, limit: 10 }, ActionType.FETCH);
  }

  IpDetails = () => {
    const { stepFormValues } = this.state;
    const { ip } = stepFormValues;
    console.log(ip);
    return (
      <DescriptionList size="small" title="地理详情"
                       style={{ marginBottom: 32 }}>
        <Description term="取货单号">{ip}</Description>
        <Description term="状态">已取货</Description>
        <Description term="销售单号">1234123421</Description>
        <Description term="子订单">3214321432</Description>
      </DescriptionList>
    );

  };
  _renderTab = (key) => {
    const { stepFormValues } = this.state;
    const { ip, country, city, subdivision, latitude, longitude, brower, date, duration, method, statusCode, os, uid, url } = stepFormValues as DSList;
    switch (key) {
      case 'ipDetails':

        return (<DescriptionList size="small" title="IP详情"
                                 style={{ marginBottom: 32 }}>
          <Description term="IP">{ip}</Description>
          <Description term="国家">{country}</Description>
          <Description term="地区">{subdivision}</Description>
          <Description term="城市">{city}</Description>
          <Description term="经度">{latitude}</Description>
          <Description term="纬度">{longitude}</Description>
        </DescriptionList>);
      case 'requestDetails':
        return (
          <DescriptionList size="small" title="请求详情"
                           style={{ marginBottom: 32 }}>
            <Description term="游览器">{brower}</Description>
            <Description term="操作系统">{os}</Description>
            <Description term="时间">{moment(date).format('l')}</Description>
            <Description term="长度">{duration} m</Description>
            <Description term="请求方法">{method}</Description>
            <Description term="状态码">{statusCode}</Description>
            <Description term="请求URL">{url}</Description>
          </DescriptionList>
        );
      default:
        break;
    }

  };

  render() {
    const { logs } = this.props;
    const { updateModalVisible, stepFormValues, tabKey } = this.state;
    const { list, pageSize, total } = logs.logs;

    const paginationProps: PaginationProps = {
      // showSizeChanger: true,
      showQuickJumper: true,
      defaultPageSize: pageSize,
      total: total,
      onChange: (page, pageSize) => {
        this.apiAction({
          pageNum: page,
          limit: pageSize,
        }, ActionType.FETCH);
      },
    };
    const data = { pagination: paginationProps, list };

    const { loading } = this.props;
    // @ts-ignore
    return (
      <PageHeaderWrapper
        title={'日志'}
        content={'http请求记录'}
      >
        <Card>

          <TableView
            fetchAction={param => this.apiAction(param, ActionType.FETCH)}
            loading={loading} data={data} columns={this.columns}/>
        </Card>

        <Modal
          width={640 * 1.5}
          bodyStyle={{ padding: '32px 40px 48px' }}
          destroyOnClose
          title="日志详情"
          visible={updateModalVisible}
          onOk={() => {
            this.handleUpdateModalVisible();
          }}
          // footer={this.renderFooter(currentStep)}
          onCancel={() => this.handleUpdateModalVisible()}
        >
          {/*<Steps style={{ marginBottom: 28 }} size="small" >*/}
          {/*<Step title="基本信息" />*/}
          {/*<Step title="配置规则属性" />*/}
          {/*<Step title="设定调度周期" />*/}
          {/*</Steps>*/}
          {/*{stepFormValues.url}*/}
          <Card
            tabList={[
              { key: 'ipDetails', tab: 'IP详情' },
              { key: 'requestDetails', tab: '请求详情' }]}
            defaultActiveTabKey={'ipDetails'}
            onTabChange={(key) => {

              this.setState({
                tabKey: key,
              });

            }}

            bordered={false}
          >
            {
              this._renderTab(tabKey)
            }


          </Card>
          {/*{this.renderContent(currentStep, formVals)}*/}
        </Modal>

      </PageHeaderWrapper>
    );
  }
}


