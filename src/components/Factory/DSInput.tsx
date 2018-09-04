import * as React from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input/Input';
import { UploadProps } from 'antd/lib/upload';
import DSBraftEditor, { DSBraftEditorProps } from '../Editor/Editor';
import DSUpload from '../Upload/DSUpload';

export interface IDSInputProps {
  type: 'editor' | 'upload' | 'input';
  inputProps: UploadProps | DSBraftEditorProps | InputProps | DSInputProps;
  value?: string | number

}

interface DSInputProps extends InputProps {
  placeholder?: string
}

const DSInput: React.SFC<IDSInputProps> = ({ type, inputProps, ...rest }) => {
  switch (type) {
    case 'editor':
      return (

        <DSBraftEditor
          {...inputProps as DSBraftEditorProps}
        />
      );
    case 'upload':
      return (
        <DSUpload
          {...inputProps as UploadProps}
        />
      );
    case 'input':
      return (
        <Input
          {...inputProps as InputProps}
          {...rest}

        />
      );
    default:
      break;
  }

};
export default DSInput;

