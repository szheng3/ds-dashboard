import React from 'react';
import { INoticeIconData } from '../NoticeIcon/NoticeIconTab';

export interface DSBraftEditorProps {
  url: String;
  headers?: Object;
  htmlContent: String;
  initialContent: String

  onHTMLChange(htmlContent): void;

}

export default class DSBraftEditor extends React.Component<DSBraftEditorProps, any> {
}
