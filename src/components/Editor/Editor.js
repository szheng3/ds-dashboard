// import "babel-polyfill"
import React from 'react';
import BraftEditor from 'braft-editor';
import CustomAtomic from './CustomAtomic';
import { message } from 'antd';

export default class DSBraftEditor extends React.Component {
  preview = () => {
    if (window.previewWindow) {
      window.previewWindow.close();
    }
    window.previewWindow = window.open();
    window.previewWindow.document.write(this.buildPreviewHtml());
  };
  uploadFn = (param) => {

    const xhr = new XMLHttpRequest;
    const fd = new FormData();
    const mediaLibrary = this.editorInstance.getMediaLibraryInstance();
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
  validateFn = (file) => file.size <= 1024 * 100;
  insertHTMLContent = () => {
    // this.editorInstance.insertHTML('<p><img src="https://cdn.dribbble.com/users/1224447/screenshots/4576582/800x600_1x.png" /></p><p>12312312312<a href="123123123">baidu.com</a></p><p>asdasdas<u><span style="text-decoration:line-through;"><strong>da<em><span style="font-size:32px;color:#fdda00;background-color:#07a9fe;">s</span>d</em>ad</strong>asdas</span></u>d</p>')
    // this.editorInstance.insertHTML(
    //   '<p><span style="color:#ff0000;">Hello World!</span></p>');
    // this.editorInstance.setContent(
    //   '<p><span style="color:#ff0000;">Hello World!</span></p>');
    // this.editorInstance.forceRender();
  };
  editorInstance;

  constructor(props) {
    super(props);
    this.state = {
      contentFormat: 'html',
      initialContent: '',
      htmlContent: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.initialContent !== nextProps.initialContent) {

      this.editorInstance.setContent(nextProps.initialContent);

    }

  }

  buildPreviewHtml() {

    const { htmlContent } = this.props;

    return `
      <!Doctype html>
      <html>
        <head>
          <title>内容预览</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
          </style>
        </head>
        <body>
            <div class="container">${htmlContent}</div>
        </body>
      </html>
    `;

  }

  render() {

    const extendAtomics = [
      {
        mediaType: 'HELLO',
        component: CustomAtomic,
      },
    ];

    return (
      <div>
        {/*<div>*/}
        {/*<button onClick={this.insertHTMLContent}>Insert Html Fragment</button>*/}
        {/*</div>*/}
        <BraftEditor
          initialContent={this.props.initialContent}
          forceNewLine
          onHTMLChange={this.props.onHTMLChange}
          contentFormat={this.state.contentFormat}
          ref={(instance) => { this.editorInstance = instance;}}
          // extendControls={extendControls}
          extendAtomics={extendAtomics}
          media={{ uploadFn: this.uploadFn }}
        />

      </div>
    );

  }

}
