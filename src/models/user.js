import { query as queryUsers, queryCurrent } from '@/services/user';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    * fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    * fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      if (response) {
        yield put({
          type: 'saveCurrentUser',
          payload: response,
        });
        yield put({
          type: 'login/changeLoginStatus',
          payload: {
            status: true,
            currentAuthority: response.userModel.role,
          },
        });
        reloadAuthorized();
      }

    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
