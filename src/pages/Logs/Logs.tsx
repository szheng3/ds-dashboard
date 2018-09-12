import React, { Component, Fragment } from 'react';
import { Card } from 'antd';
import StandardTable from '@/components/StandardTable';
import { connect } from 'dva';
import { IMLogsState } from '@/pages/Logs/models/log';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

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
      align: 'right',
      render: val => `${val} m`,
      // mark to display a total number
      // needTotal: true,
    },
    // {
    //   title: '状态',
    //   dataIndex: 'status',
    //   filters: [
    //     {
    //       text: status[0],
    //       value: 0,
    //     },
    //     {
    //       text: status[1],
    //       value: 1,
    //     },
    //     {
    //       text: status[2],
    //       value: 2,
    //     },
    //     {
    //       text: status[3],
    //       value: 3,
    //     },
    //   ],
    //   render(val) {
    //     return <Badge status={statusMap[val]} text={status[val]} />;
    //   },
    // },
    {
      title: '方法',
      dataIndex: 'method',
      // sorter: true,
      // render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '用户ID',
      dataIndex: 'uid',
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
  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  apiAction = (payload, type: ActionType) => {
    switch (type) {
      case ActionType.FETCH:
        this.props.dispatch({
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

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    // const {formValues} = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params: any = {
      // currentPage: pagination.current,
      limit: pagination.pageSize,
      pageNum: pagination.current,

      // ...formValues,
      ...filters,
    };
    if (sorter.field) {
      const orderBy = sorter.order === 'ascend' ? 'ASC' : 'DESC';
      params.orderBy = `${sorter.field} ${orderBy}`;
    }
    this.apiAction(params, ActionType.FETCH);

  };

  render() {
    const { logs } = this.props;
    const { selectedRows } = this.state;
    const { list, pageSize, total } = logs.logs;

    const paginationProps = {
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
    return (
      <PageHeaderWrapper title={'日志'}>
        <Card>
          <StandardTable
            selectedRows={selectedRows}
            loading={loading}
            data={data}
            columns={this.columns}
            onSelectRow={this.handleSelectRows}
            onChange={this.handleStandardTableChange}
          />
        </Card>

      </PageHeaderWrapper>
    );
  }
}


