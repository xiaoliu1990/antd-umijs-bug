import React, { useEffect } from 'react';
import { useLocation } from 'umi'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
export default ({ children }) => (
  <ConfigProvider locale={zhCN}>
    <div className="container">
      {children}
    </div>
  </ConfigProvider>
);