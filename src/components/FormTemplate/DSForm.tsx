import React from 'react';
import { connect } from 'dva';
import { Icon, Input, Tooltip, Button, Form } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import styles from './DSForm.less';
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form';
import { default as DSInput, IDSInputProps } from '../Factory/DSInput';
import _ from 'lodash';

export interface IDSFormProps {
  inputs?: IDSInputsProps[];
  form: WrappedFormUtils;
  onSubmit: (e) => void;
  reset: () => void;
}

interface IDSFormTableProps {
  id: string;
  label: string;
  optional?: {
    message: string
  }
}

interface IDSInputsProps {
  input: IDSInputProps;
  form: IDSFormTableProps;
  option?: GetFieldDecoratorOptions;

}

const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 7, offset: 5 },
  },
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const DSForm: React.SFC<IDSFormProps> = ({ inputs, form, onSubmit, reset }) => {

  const { getFieldDecorator } = form;

  return (
    <Form
      style={{ marginTop: 8 }}
      onSubmit={onSubmit}
    >
      {
        inputs.map((dsinput, index) => {
          const { form, input, option } = dsinput;

          const { optional, id, label } = form;
          const rules = _.get(option, 'rules', []);
          return (
            <FormItem
              {...formItemLayout}
              label={
                <span>
            {label}

                  <em className={styles.optional}>
                        {_.filter(rules, { required: true }).length
                          ? ''
                          : '（选填）'}
                    {
                      optional && <Tooltip title={optional.message}>
                        <Icon type="info-circle-o" style={{ marginRight: 4 }}/>
                      </Tooltip>

                    }
                      </em>

          </span>
              }
              key={index}
            >
              {getFieldDecorator(id, option)(
                <DSInput {...input}/>,
              )}
            </FormItem>
          );
        })
      }

      <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
        <Button style={{ marginLeft: 30 }} onClick={reset}>重置</Button>
      </FormItem>
    </Form>

  );
};

export default DSForm;
