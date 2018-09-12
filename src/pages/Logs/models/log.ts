import { DSlog } from '@/response/logs';
import { queryLog } from '@/services/api';

export interface IMLogsState {
  logs: DSlog
}

const takeLatest = { type: 'takeLatest' };

export default {
  namespace: 'logs',

  state: {
    logs: {},
  },

  effects: {
    fetchLogs: [
      function* ({ payload: { pageNum, limit, orderBy } }, { call, put }) {

        const params = {
          pageNum: pageNum ? `pageNum=${pageNum}` : pageNum,
          limit: limit ? `limit=${limit}` : limit,
          orderBy: orderBy ? `orderBy=${orderBy}` : orderBy,
        };
        // @ts-ignore
        const urlString = Object.values(params).filter(url => url).join('&');

        const response: DSlog = yield call(queryLog, urlString);
        if (response) {
          yield put({
            type: 'saveLogs',
            payload: response,
          });
        }
      },
      takeLatest,
    ],
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
