import {
  query as queryUsers,
  queryCurrent,
  queryEachCurrent,
} from '@/services/user';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    eachUser: {},
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
    * fetchEachUser({ id }, { call, put }) {
      const response = yield call(queryEachCurrent, id);
      if (response) {
        yield put({
          type: 'saveEachUser',
          payload: response,
        });
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
    saveEachUser(state, action) {
      return {
        ...state,
        eachUser: action.payload || {},
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
