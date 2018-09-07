// import "babel-polyfill"
import React from 'react';
import BraftEditor, { EditorState } from 'braft-editor';
import { ContentUtils } from 'braft-utils';

import CustomAtomic from './CustomAtomic';
import { message } from 'antd';
import { DSBraftEditorProps } from './Editor';

export interface DSBraftEditorProps {
  url: string;
  headers?: object;
  htmlContent: string;
  initialContent: string

  onHTMLChange(htmlContent): void;

}

export default class DSBraftEditor extends React.Component<DSBraftEditorProps, any> {

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.initialContent !== nextProps.initialContent) {
  //
  //     this.editorInstance.setContent(nextProps.initialContent);
  //
  //   }
  //
  // }
  //
  // preview = () => {
  //   if (window.previewWindow) {
  //     window.previewWindow.close();
  //   }
  //   window.previewWindow = window.open();
  //   window.previewWindow.document.write(this.buildPreviewHtml());
  // };
  // uploadFn = (param) => {
  //
  //   const xhr = new XMLHttpRequest;
  //   const fd = new FormData();
  //   const mediaLibrary = this.editorInstance.getMediaLibraryInstance();
  //   // const {Uploading} = this.props;
  //
  //   const successFn = (response) => {
  //     // Uploading(false);
  //     message.destroy();
  //     message.success('上传成功');
  //     param.success({
  //       url: JSON.parse(xhr.responseText).path,
  //       meta: {
  //         controls: true,
  //         loop: true,
  //         autoPlay: false,
  //         poster: '',
  //       },
  //     });
  //   };
  //
  //   const progressFn = (event) => {
  //
  //     message.loading('上传中', 0);
  //     // Uploading(true);
  //     param.progress(event.loaded / event.total * 100);
  //
  //   };
  //
  //   const errorFn = (response) => {
  //     // Uploading(false);
  //     message.destroy();
  //     message.error('上传失败');
  //
  //     param.error({
  //       msg: 'unable to upload.',
  //     });
  //
  //   };
  //
  //   xhr.upload.addEventListener('progress', progressFn, false);
  //   xhr.addEventListener('load', successFn, false);
  //   xhr.addEventListener('error', errorFn, false);
  //   xhr.addEventListener('abort', errorFn, false);
  //
  //   fd.append('file', param.file);
  //   xhr.open('POST', this.props.url, true);
  //   const { headers } = this.props;
  //   Object.keys(headers).map(key => { // important check that this is objects own property
  //
  //       xhr.setRequestHeader(key.toString(), headers[key]);
  //
  //     },
  //   );
  //
  //   xhr.send(fd);
  //
  // };
  // validateFn = (file) => file.size <= 1024 * 100;
  // insertHTMLContent = () => {
  //   // this.editorInstance.insertHTML('<p><img src="https://cdn.dribbble.com/users/1224447/screenshots/4576582/800x600_1x.png" /></p><p>12312312312<a href="123123123">baidu.com</a></p><p>asdasdas<u><span style="text-decoration:line-through;"><strong>da<em><span style="font-size:32px;color:#fdda00;background-color:#07a9fe;">s</span>d</em>ad</strong>asdas</span></u>d</p>')
  //   // this.editorInstance.insertHTML(
  //   //   '<p><span style="color:#ff0000;">Hello World!</span></p>');
  //   // this.editorInstance.setContent(
  //   //   '<p><span style="color:#ff0000;">Hello World!</span></p>');
  //   // this.editorInstance.forceRender();
  // };
  // editorInstance;
  //
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     contentFormat: 'html',
  //     initialContent: '',
  //     htmlContent: '',
  //   };
  // }
  //
  //
  //
  // buildPreviewHtml() {
  //
  //   const { htmlContent } = this.props;
  //
  //   return `
  //     <!Doctype html>
  //     <html>
  //       <head>
  //         <title>内容预览</title>
  //         <style>
  //           html,body{
  //             height: 100%;
  //             margin: 0;
  //             padding: 0;
  //             overflow: auto;
  //             background-color: #f1f2f3;
  //           }
  //           .container{
  //             box-sizing: border-box;
  //             width: 1000px;
  //             max-width: 100%;
  //             min-height: 100%;
  //             margin: 0 auto;
  //             padding: 30px 20px;
  //             overflow: hidden;
  //             background-color: #fff;
  //             border-right: solid 1px #eee;
  //             border-left: solid 1px #eee;
  //           }
  //           .container img,
  //           .container audio,
  //           .container video{
  //             max-width: 100%;
  //             height: auto;
  //           }
  //         </style>
  //       </head>
  //       <body>
  //           <div class="container">${htmlContent}</div>
  //       </body>
  //     </html>
  //   `;
  //
  // }
  //
  // render() {
  //
  //   const extendAtomics = [
  //     {
  //       mediaType: 'HELLO',
  //       component: CustomAtomic,
  //     },
  //   ];
  //
  //   return (
  //     <div>
  //       {/*<div>*/}
  //       {/*<button onClick={this.insertHTMLContent}>Insert Html Fragment</button>*/}
  //       {/*</div>*/}
  //       <BraftEditor
  //         initialContent={this.props.initialContent}
  //         forceNewLine
  //         onHTMLChange={this.props.onHTMLChange}
  //         contentFormat={this.state.contentFormat}
  //         ref={(instance) => { this.editorInstance = instance;}}
  //         // extendControls={extendControls}
  //         extendAtomics={extendAtomics}
  //         media={{ uploadFn: this.uploadFn }}
  //       />
  //
  //     </div>
  //   );
  //
  // }

  constructor(props) {

    super(props);
    this.state = {
      editorState: EditorState.createFrom(this.props.htmlContent),
    };
    // this.editorInstance = null;

  }

  // handleChange = (editorState) => {
  //   this.setState({ editorState });
  // };

  // insertText = (text) => {
  //   this.setState({
  //     editorState: ContentUtils.insertText(this.state.editorState, text),
  //   });
  // };
  uploadFn = (param) => {

    const xhr = new XMLHttpRequest;
    const fd = new FormData();
    // const mediaLibrary = this.editorInstance.getMediaLibraryInstance();
    // const {Uploading} = this.props;

    const successFn = (response) => {
      // Uploading(false);
      message.destroy();
      message.success('上传成功');
      param.success({
        url: JSON.parse(xhr.responseText).path,
        meta: {
          controls: true,
          loop: true,
          autoPlay: false,
          poster: '',
        },
      });
    };

    const progressFn = (event) => {

      message.loading('上传中', 0);
      // Uploading(true);
      param.progress(event.loaded / event.total * 100);

    };

    const errorFn = (response) => {
      // Uploading(false);
      message.destroy();
      message.error('上传失败');

      param.error({
        msg: 'unable to upload.',
      });

    };

    xhr.upload.addEventListener('progress', progressFn, false);
    xhr.addEventListener('load', successFn, false);
    xhr.addEventListener('error', errorFn, false);
    xhr.addEventListener('abort', errorFn, false);

    fd.append('file', param.file);
    xhr.open('POST', this.props.url, true);
    const { headers } = this.props;
    Object.keys(headers).map(key => { // important check that this is objects own property

        xhr.setRequestHeader(key.toString(), headers[key]);

      },
    );

    xhr.send(fd);

  };
  // uploadFn = (param) => {
  //
  //   const xhr = new XMLHttpRequest;
  //   const fd = new FormData();
  //
  //   const successFn = () => {
  //     param.success({
  //       url: JSON.parse(xhr.responseText)[0].url,
  //       meta: {
  //         controls: true,
  //         loop: true,
  //         autoPlay: false,
  //       },
  //     });
  //   };
  //
  //   const progressFn = (event) => {
  //     param.progress(event.loaded / event.total * 100);
  //   };
  //
  //   const errorFn = () => {
  //     param.error({
  //       msg: 'unable to upload.',
  //     });
  //   };
  //
  //   xhr.upload.addEventListener('progress', progressFn, false);
  //   xhr.addEventListener('load', successFn, false);
  //   xhr.addEventListener('error', errorFn, false);
  //   xhr.addEventListener('abort', errorFn, false);
  //
  //   fd.append('file', param.file);
  //   xhr.open('POST', this.props.url, true);
  //   const { headers } = this.props;
  //   Object.keys(headers).map(key => { // important check that this is objects own property
  //
  //       xhr.setRequestHeader(key.toString(), headers[key]);
  //
  //     },
  //   );
  //   xhr.send(fd);
  //
  // };

  hooks = {
    'change-block-type': console.log,
    'insert-emoji': (fontSize) => {
      return '123';
    },
    'insert-medias': console.log,
    'exec-editor-command': console.log,
    'select-medias': console.log,
    'remove-medias': (medias) => {
      return [medias[0]];
    },
    'deselect-medias': console.log,
    'toggle-link': () => {
      return {
        href: 'http://www.baidu.com',
        target: '_blank',
      };
    },
  };

  render() {

    const controls = BraftEditor.defaultProps.controls.map(item => {
      return item === 'bold' ? {
        key: 'bold', // 使用key来指定控件类型
        title: '加粗选中文字哦', // 自定义控件title
        text: '点我加粗', // 使用自定义文案来代替默认图标(B)，此处也可传入jsx
      } : item;
    });

    // const extendControls = [
    //   {
    //     key: 'insert-123',
    //     type: 'button',
    //     text: 'Insert 123',
    //     onClick: () => {
    //       this.insertText('123');
    //     },
    //   },
    // ];

    return (
      <div>
        <div className="demo" id="demo">
          <BraftEditor
            hooks={this.hooks}
            controls={controls}
            // extendControls={extendControls}
            media={{
              uploadFn: this.uploadFn,
            }}
            onChange={this.props.onHTMLChange}
            defaultValue={this.state.editorState}
          />
        </div>
      </div>
    );

  }

}
