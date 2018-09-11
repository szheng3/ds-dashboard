import * as React from 'react';

export interface IPageHeaderWrapperProps {
  title: string;
  content?: any;
  extraContent?: any;
}

export default class PageHeaderWrapper extends React.Component<IPageHeaderWrapperProps, any> {}
