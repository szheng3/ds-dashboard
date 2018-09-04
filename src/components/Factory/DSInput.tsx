import * as React from 'react';
import { Input } from 'antd';
import DSBraftEditor from '../Editor/Editor';
import DSUpload from '../Upload/DSUpload';

import { DSBraftEditorProps } from '../Editor/Editor';
import { InputProps } from 'antd/lib/input/Input';
import { UploadProps } from 'antd/lib/upload';

export interface IDSInputProps {
  type: 'editor' | 'upload' | 'input';
  inputProps: UploadProps | DSBraftEditorProps | InputProps | DSInputProps;
  value?: string | number

}

interface DSInputProps extends InputProps {

  placeholder?: string
}

const DSInput: React.SFC<IDSInputProps> = ({ type, inputProps, ...rest }: any) => {
  switch (type) {
    case 'editor':
      return (
        <DSBraftEditor
          {...inputProps}
        />
      );
    case 'upload':
      return (
        <DSUpload
          {...inputProps}
        />
      );
    case 'input':
      return (
        <Input
          {...inputProps}
          {...rest}

        />
      );
    default:
      break;
  }

};
export default DSInput;

