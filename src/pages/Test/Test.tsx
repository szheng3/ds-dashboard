import React, { Component } from 'react';
// import PageHeaderWrapper from 'components/PageHeaderWrapper';
import Card from 'antd/lib/card';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import PageHeader from 'components/PageHeader';


export default class Test extends Component {
  componentDidMount() {
    console.log('12');
  }

  render() {
    return (
      <PageHeaderWrapper
        title="？？？"
        content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
      >
        ss
      </PageHeaderWrapper>
    );
  }
}


