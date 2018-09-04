import React from 'react';
import { Icon, Modal, Upload } from 'antd';
import { UploadProps } from 'antd/lib/upload/interface';

const uploadButton = (
  <div>
    <Icon type="plus"/>
    <div className="ant-upload-text">Upload</div>
  </div>
);
// const DSUpload = (inputProps) => {
//   const {fileList, previewVisible, onCancel, previewImage} = inputProps;
//   return (
//     <div>
//       <Upload
//         {...inputProps}
//       >
//         {fileList.length >= 1 ? null : uploadButton}
//       </Upload>
//       <Modal visible={previewVisible} footer={null}
//              onCancel={onCancel}>
//         <img alt="example" style={{width: '100%'}}
//              src={previewImage}/>
//       </Modal>
//     </div>
//
//   );
// };

// declare const DSUpload: React.SFC<DSUploadProps>;
// export default DSUpload;

// export interface DSUploadProps extends UploadProps {
//
//   previewImage: string;
//   previewVisible: boolean;
//
//   onCancel();
// }

enum MethodType {
  onCancel,
  onPreview

}

export default class DSUpload extends React.Component<UploadProps, any> {

  state = {
    previewVisible: false,
    previewImage: '',
  };

  handleMethod = (method: MethodType, nextState?) => {
    switch (method) {
      case MethodType.onPreview:
        this.setState(state => {
          state.previewImage = nextState.url ||
            nextState.thumbUrl;
          state.previewVisible = true;
          return state;
        });
        break;
      case MethodType.onCancel:
        this.setState(
          state => (state.previewVisible = false , state),
        );
        break;
      default:
        break;
    }

  };

  render() {
    const { fileList } = this.props;
    const { previewVisible, previewImage } = this.state;
    return (
      <div>

        <Upload
          {...this.props}
          onPreview={(nextState) => {
            this.handleMethod(MethodType.onPreview, nextState);
          }}
        >
          {
            fileList.length >= 1 ? null : uploadButton
          }
        </Upload>

        <Modal visible={previewVisible} footer={null}
               onCancel={() => {
                 this.handleMethod(MethodType.onCancel);
               }}>
          <img alt="example" style={{ width: '100%' }}
               src={previewImage}/>
        </Modal>
      </div>
    );
  }
}


