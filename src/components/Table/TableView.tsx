import React, { Component } from 'react';
import StandardTable from '@/components/StandardTable';
import { Card } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import { ColumnProps } from 'antd/lib/table';

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

export interface ITableViewProps {
  fetchAction(param: any): void;

  loading: boolean;
  data: { pagination: PaginationProps, list: Array<any> };
  columns: ColumnProps<any>[];

}

export class TableView extends Component<ITableViewProps, any> {
  state = {
    selectedRows: [],

  };
  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  };
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { fetchAction } = this.props;

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
    console.log(params);
    fetchAction(params);

  };

  render() {
    const { selectedRows } = this.state;
    const { loading, data, columns } = this.props;
    return (
      <div>
        <StandardTable
          selectedRows={selectedRows}
          loading={loading}
          data={data}
          columns={columns}
          onSelectRow={this.handleSelectRows}
          onChange={this.handleStandardTableChange}
        />
      </div>
    );
  }
}

export default TableView;
