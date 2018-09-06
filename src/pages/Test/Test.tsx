import React from 'react';
import { connect } from 'dva';
// import PageHeaderLayout, {IPageHeaderLayoutProps} from '@/layouts/PageHeaderLayout';
import { buildAuthorization } from '@/utils/request';
import { Card, Form, Spin } from 'antd';
import { CurrentUserProps, UserModel } from '@/models/user';
import _ from 'lodash';
import DSForm, { IDSFormProps } from '@/components/FormTemplate/DSForm';
import { WrappedFormUtils } from 'antd/lib/form/Form';

enum MethodType {
  initialName,
  initialEditorHTML,
  initialAvatar,
  editorHTMLChange,
  uploadChange,
  resetEditor,
  resetAll,

}

interface IUserProfileProps {
  user: CurrentUserProps;
  loading: boolean;
  form: WrappedFormUtils;
  dispatch: any
}

interface IUserProfileState {
  layout: any;
  form?: IDSFormProps;
}

@connect(({ user, loading }) => ({
  user,
  loading: loading.models.user,
}))
// @ts-ignore
@Form.create()
export default class Test extends React.Component<IUserProfileProps, any> {

  state: IUserProfileState = {
    layout: {
      title: '用户详情',
      content: '我的详情资料。',
      breadcrumbList: [
        {
          title: '首页',
          href: '/dashboard',
        },
        {
          title: '用户详情',
          href: 'userProfile',
        },
      ],
    },
    form: {
      form: this.props.form,
      onSubmit: (e) => {
        this.handleSubmit(e);
      },
      reset: () => {
        this.handleState(MethodType.resetAll);
      },
      inputs: [
        {
          // 上传图片
          input: {
            type: 'upload',
            inputProps: {
              fileList: [],
              action: '/api/uploadImage',
              headers: { Authorization: buildAuthorization() },
              listType: 'picture-card',
              onChange: ({ fileList }) => {
                this.handleState(MethodType.uploadChange, fileList);
              },
            },
          },
          form: {
            label: '头像',
            id: 'avatar',
            optional: {

              message: '这里是名字',
            },
          },
        },
        {
          // 普通input
          input: {
            type: 'input',
            inputProps: {
              placeholder: '请输入姓名',
            },
          },
          form: {
            label: '名字',
            id: 'nickname',
            optional: {
              message: '这里是名字',
            },
          },
          option: {
            initialValue: '',
            rules: [
              {
                required: true, message: '请输入衡量标准,', max: 4,
              }],
          },
        },
        {
          // 富文本
          input: {

            type: 'editor',
            inputProps: {
              htmlContent: '',
              initialContent: '',
              url: '/api/uploadImage',
              headers: { Authorization: buildAuthorization() },
              onHTMLChange: (htmlContent) => {
                this.handleState(MethodType.editorHTMLChange, htmlContent);
              },
            },

          },
          form: {
            label: '个人描述',
            id: 'htmlContent',
          },
        },
      ],
    },
  };

  handleState = (type: MethodType, nextState?) => {
    switch (type) {
      case MethodType.initialAvatar:
        this.setState(state => {
          state.form.inputs.map((input) => {
            if (input.input.type === 'upload') {
              if (nextState) {
                input.input.inputProps.fileList = [
                  {
                    uid: -1,
                    size: 123,
                    name: 'Upload',
                    status: 'done',
                    url: nextState,
                    type: 'png',
                  },
                ];
              } else {
                input.input.inputProps.fileList = [];
              }
            }
            return input;
          });
          return state;
        });

        return;
      case MethodType.initialName:

        this.setState(state => {
          state.form.inputs.map((input) => {
            if (input.input.type === 'input') {
              input.option.initialValue = nextState;
            }
            return input;
          });
          return state;
        });

        return;
      case MethodType.initialEditorHTML:

        this.setState(state => {
          state.form.inputs.map((input) => {
            if (input.input.type === 'editor') {
              input.input.inputProps.initialContent = nextState;
            }
            return input;
          });
          return state;
        });

        return;
      case MethodType.uploadChange:
        this.setState(state => {
          state.form.inputs.map((input) => {
            if (input.input.type === 'upload') {
              input.input.inputProps.fileList = nextState;
            }
            return input;
          });
          return state;
        });

        // this.setState(
        //   state => (state.uploads.inputProps.fileList = nextState, state),
        // );
        return;
      case MethodType.editorHTMLChange:

        this.setState(state => {
          state.form.inputs.map((input) => {
            if (input.input.type === 'editor') {
              input.input.inputProps.htmlContent = nextState;
            }
            return input;
          });
          return state;
        });

        this.props.form.setFieldsValue({ 'htmlContent': nextState });

        return;
      case MethodType.resetEditor:

        this.setState(state => {
          state.form.inputs.map((input) => {
            if (input.input.type === 'editor') {
              input.input.inputProps.initialContent += ' ';
            }
            return input;
          });
          return state;
        });
        return;
      case MethodType.resetAll:
        const { avatar }: UserModel = _.get(
          this.props, 'user.currentUser', {},
        );
        this.props.form.resetFields();
        this.handleState(MethodType.resetEditor);
        this.handleState(MethodType.initialAvatar, avatar);

        return;

    }

  };

  handleSubmit = (e) => {
    const { details } = this.props.user.currentUser;
    const { path } = _.get(this.state,
      'form.inputs[0].input.inputProps.fileList[0].response', {});
    const { url } = _.get(this.state,
      'form.inputs[0].input.inputProps.fileList[0]', {});

    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const { nickname, htmlContent } = values;

      if (!err) {
        this.props.dispatch({
          type: 'user/updateUser',
          payload: {
            user: {
              nickname: nickname,
              avatar: path || url || '',
              details: htmlContent || details,
            },
          },
        });
      }
    });
  };

  UNSAFE_componentWillMount() {
    const { avatar, details, nickname }: UserModel = _.get(
      this.props, 'user.currentUser', {},
    );

    if (avatar) {
      this.handleState(MethodType.initialAvatar, avatar);

    }
    if (details) {

      this.handleState(MethodType.initialEditorHTML, details);
    }
    if (nickname) {

      this.handleState(MethodType.initialName, nickname);
    }

  }

  UNSAFE_componentWillReceiveProps(nextProps: IUserProfileProps) {
    const { avatar: thisAvatar, details: thisDetails, nickname: thisNickName }: UserModel = _.get(
      this.props,
      'user.currentUser',
      {});

    const { avatar: nextAvatar, details: nextDetails, nickname: nextNickName }: UserModel = _.get(
      nextProps,
      'user.currentUser',
      {});

    if (thisAvatar !== nextAvatar) {

      this.handleState(MethodType.initialAvatar, nextAvatar);

    }
    if (thisDetails !== nextDetails) {

      this.handleState(MethodType.initialEditorHTML, nextDetails);

    }
    if (thisNickName !== nextNickName) {

      this.handleState(MethodType.initialName, nextNickName);
    }

  }

  render() {

    const { loading } = this.props;
    const { layout, form } = this.state;

    return (

      <div {...layout}>
        <Spin spinning={loading}>


          <Card bordered={false}>


            <DSForm
              {
                ...form
              }

            />


          </Card>


        </Spin>
      </div>
    );
  }
}


