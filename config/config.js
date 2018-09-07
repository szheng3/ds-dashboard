// https://umijs.org/config/
import os from 'os';
import {resolve} from "path";
import pageRoutes from './router.config';
import webpackplugin from './plugin.config';
import defaultSettings from '../src/defaultSettings';


export default {
  // add for transfer to umi
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          hmr: true,
        },
        locale: {
          enable: true, // default false
          default: 'zh-CN', // default zh-CN
          baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
        },
        dynamicImport: {
          loadingComponent: './components/PageLoading/index',
        },
        polyfills: ['ie11'],
        ...(!process.env.TEST && os.platform() === 'darwin'
          ? {
            dll: {
              include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
              exclude: ['@babel/runtime'],
            },
            hardSource: true,
          }
          : {}),
      },
    ],
  ],
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },
  // 路由配置
  routes: pageRoutes,
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  externals: {
    '@antv/data-set': 'DataSet',
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);
      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = antdProPath.split('/').
          map(a => a.replace(/([A-Z])/g, '-$1')).
          map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }
      return localName;
    },
  },
  manifest: {
    name: 'ant-design-pro',
    background_color: '#FFF',
    description: 'An out-of-box UI solution for enterprise applications as a React boilerplate.',
    display: 'standalone',
    start_url: '/index.html',
    icons: [
      {
        src: '/favicon.png',
        sizes: '48x48',
        type: 'image/png',
      },
    ],
  },

  chainWebpack: webpackplugin,
  cssnano: {
    mergeRules: false,
  },
  alias: {
    // themes: resolve(__dirname, './src/themes'),
    components: resolve(__dirname,"./src/components"),
    // utils: resolve(__dirname,"./src/utils"),
    // config: resolve(__dirname,"./src/utils/config"),
    // enums: resolve(__dirname,"./src/utils/enums"),
    // services: resolve(__dirname,"./src/services"),
    // models: resolve(__dirname,"./src/models"),
    // routes: resolve(__dirname,"./src/routes"),
  },
  //
  // alias: {
  //   // utils: path.resolve(__dirname, 'src/utils/'),
  //   // assets: path.resolve(__dirname, 'src/assets/'),
  //   // components: path.resolve(__dirname, 'src/components/'),
  //   // common: path.resolve(__dirname, 'src/common/'),
  //   // services: path.resolve(__dirname, 'src/services/'),
  //   // layouts: path.resolve(__dirname, 'src/layouts/'),
  //   // containers: path.resolve(__dirname, 'src/containers/'),
  //   // response: path.resolve(__dirname, 'src/response/'),
  // },
  'exportStatic': {},




  proxy: {
    '/api': {
      target: 'http://sszzz.me:8080/',
      // target: 'http://localhost:8080/',
      changeOrigin: true,
      pathRewrite: {'^/': ''},
    },
    '/oauth': {
      target: 'http://sszzz.me:8080/',
      // target: 'http://localhost:8080/',
      changeOrigin: true,
      pathRewrite: {'^/': ''},
    },
  },
  // history: 'hash',
  // exportStatic: true,

};
