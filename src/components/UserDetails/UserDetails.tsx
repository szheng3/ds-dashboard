import React, { Component } from 'react';
import { connect } from 'dva';
import { IMLogsState } from '@/pages/Logs/models/log';
import { DvaProps } from '@/utils/DvaProps';
import _ from 'lodash';
import DescriptionList from '@/components/DescriptionList';
import Description from '@/components/DescriptionList/Description';
import { UserModel, UserResponse } from '@/response/currentUser';

interface IUserDetailsProps extends DvaProps {

}

// @ts-ignore
@connect(({ user, loading }) => ({
  user,
  loading: loading.models.user,
}))
class UserDetails extends Component<IUserDetailsProps, any> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchEachUser',
      payload: {
        id: 93,
      },
    });
  }

  render() {
    const userModel: UserModel = _.get(this.props, 'user.eachUser.userModel',
      {});
    const { nickname, details, phone } = userModel;
    return (
      <DescriptionList size="small" title="用户详情"
                       style={{ marginBottom: 32 }}
      >
        <Description term="昵称">{nickname}</Description>
        <Description term="细节">{details}</Description>
        <Description term="手机">{phone}</Description>

      </DescriptionList>

    );
  }
}

export default UserDetails;
