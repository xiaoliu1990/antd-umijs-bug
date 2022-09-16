import { Result } from 'antd';
function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      style={{
        background: 'none',
      }}
      subTitle="抱歉，您访问的页面不存在."
    />
  );
}

export default NotFound