import { resolve } from 'node:path';
import {
  defineConfig,
  type EvolveEntryMap,
  type EvolveEntryItemOption,
} from '@flatjs/evolve';
import { getGlobalData } from './mocks/index.js';

const projectCwd = process.cwd();

const getHeadBeforeScripts = (serveMode: boolean) => {
  return [
    '//file.40017.cn/tcsk/react/dayjs@1.11.7/dayjs.min.js',
    ...(serveMode
      ? [
          '//file.40017.cn/tcsk/react/react@18.2.0/react.development.js',
          '//file.40017.cn/tcsk/react/react-dom@18.2.0/react-dom.development.js',
          '//file.40017.cn/tcsk/react/antd@5.6.1/antd.js',
        ]
      : [
          '//file.40017.cn/tcsk/react/react@18.2.0/react.production.min.js',
          '//file.40017.cn/tcsk/react/react-dom@18.2.0/react-dom.production.min.js',
          '//file.40017.cn/tcsk/react/antd@5.6.1/antd.min.js',
        ]),
  ];
};

const getEntryMap = (
  serveMode: boolean,
  modules: Array<{ name: string; options: EvolveEntryItemOption }>
) => {
  const entryMap: EvolveEntryMap = {};
  modules.forEach((module) => {
    entryMap[`${module.name}`] = {
      entry: [`./src/pages/${module.name}/index`],
      options: {
        favicon: '/favicon.ico',
        headBeforeScripts: getHeadBeforeScripts(serveMode),
        ...module.options,
      },
    };
  });
  return entryMap;
};

export default defineConfig((env) => ({
  projectVirtualPath: `biz/template`,
  devServer: {
    liveReload: true,
    mockOptions: {
      port: 8000,
      staticMap: {
        '/static': 'static',
      },
    },
    defaultServeGlobalData: async (_entry, hostUrl) => {
      return getGlobalData(hostUrl);
    },
  },
  loaderOptions: {
    pixelOptions: false,
    runTsChecker: false,
    postcssOptions: {
      plugins: [['tailwindcss', {}], 'postcss-preset-env'],
    },
    modularImports: [
      {
        libraryName: '@ant-design/icons',
        libraryDirectory: 'es/icons',
        transformToDefaultImport: true,
        camel2DashComponentName: false, // default: true
      },
      {
        libraryName: '@wove/react',
        libraryDirectory: 'cjs',
      },
      {
        libraryName: '@dimjs/secure',
        libraryDirectory: 'cjs',
      },
      {
        libraryName: '@dimjs/lang',
        libraryDirectory: 'cjs',
      },
      {
        libraryName: '@dimjs/utils',
        libraryDirectory: 'cjs',
      },
    ],
  },
  multiHtmlCdn: {
    rc: ['https://file.40017.cn/jinfu/'],
    prod: ['https://file.40017.cn/jinfu/'],
  },
  webpack: {
    externals: {
      antd: 'antd',
      dayjs: 'dayjs',
    },
    resolve: {
      alias: {
        // `@import '~style/mixin.less';`
        style: resolve(projectCwd, './src/style'),
        // `@import '~theme/mixin.less';`
        theme: resolve(projectCwd, './src/theme'),
      },
    },
  },
  entryMap: getEntryMap(env.command === 'serve', [
    {
      name: 'dashboard',
      options: {
        title: '', // 'dashboard',
      },
    },
  ]),
}));
