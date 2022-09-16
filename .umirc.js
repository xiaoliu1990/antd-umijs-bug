import path from 'path'
import { defineConfig } from 'umi'
import { routes } from './route_config'
import theme from './antd.customize'
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin'//转化antd的日期插件moment为dayjs
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
const isEnvProduction = process.env.NODE_ENV === 'production'
export default defineConfig({
  hash: true,
  history: {
    type: 'hash'
  },
  dynamicImport: {
    loading: '@/components/loading'
  },
  nodeModulesTransform: {
    type: 'all',
  },
  alias: {
    _modal: path.resolve(__dirname, 'src/modal'),
  },
  publicPath: './',
  routes: [{
    path: '/',
    component: '@/layouts/index',
    routes,
  }],
  ignoreMomentLocale: true,
  fastRefresh: {},
  theme,
  chainWebpack(memo) {
    // 修改js，js chunk文件
    memo.output
      .filename('[hash:8].js')
      .chunkFilename('[contenthash:8].chunk.js')
    // 修改css
    memo.plugin('extract-css').tap((args) => [
      {
        ...args[0],
        filename: `[contenthash:8].css`,
        chunkFilename: `[contenthash:8].chunk.css`,
        ignoreOrder: true,
      },
    ])
    memo.merge({
      optimization: {
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          name: true,
          cacheGroups: {
            vendors: {
              name: 'vendors',
              test: /node_modules/,
              minChunks: 1,
              priority: -20
            },
            echarts: {
              name: 'echarts',
              test: /echarts/,
              minChunks: 1,
              priority: -10
            },
            swiper: {
              name: 'swiper',
              test: /swiper/,
              minChunks: 1,
              priority: -10
            },
            mapvgl: {
              name: 'mapvgl',
              test: /mapvgl/,
              minChunks: 1,
              priority: -10
            },
            antd: {
              name: 'antd',
              test: /antd/,
              minChunks: 1,
              priority: -10
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
            }
          }
        }
      },
    });
    memo.plugin('AntdDayjsWebpackPlugin').use(AntdDayjsWebpackPlugin)
    memo.plugin('CleanWebpackPlugin').use(CleanWebpackPlugin)
  },
  // 生产环境去除console日志打印
  terserOptions: {
    compress: {
      drop_console: isEnvProduction,
    },
  },
  analyze: {
    analyzerMode: 'server',
    analyzerPort: 8888,
    openAnalyzer: true,
    generateStatsFile: false,
    statsFilename: 'stats.json',
    logLevel: 'info',
    defaultSizes: 'parsed', // stat  // gzip
  }
});
