import { DSlog } from '@/response/logs';
import { queryLog } from '@/services/api';

export interface IMLogsState {
  logs: DSlog
}

export default {
  namespace: 'logs',

  state: {
    logs: {},
  },

  effects: {
    * fetchLogs({ payload: { pageNum, limit } }, { call, put }) {
      const urlString = `pageNum=${pageNum}&limit=${limit}`;

      const response: DSlog = yield call(queryLog, urlString);
      if (response) {
        yield put({
          type: 'saveLogs',
          payload: response,
        });
      }
    },
  },

  reducers: {
    saveLogs(state, { payload }) {
      return {
        ...state,
        logs: payload,
      };
    },
  },
};
