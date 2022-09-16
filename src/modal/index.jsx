import { DatePicker, Space } from 'antd';
function Index() {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <Space direction="vertical">
      <DatePicker onChange={onChange} />
      <DatePicker onChange={onChange} picker="week" />
      <DatePicker onChange={onChange} picker="month" />
      <DatePicker onChange={onChange} picker="quarter" />
      <DatePicker onChange={onChange} picker="year" />
    </Space>
  )
}
export default Index