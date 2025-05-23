import React from 'react';
import { Space, Table, Tag, Form, Input, Row, Select, Col , Button} from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];




const SearchForm = () => {
  const onFinish = (values) => {
  };

  const onChange = (value) => {
  };
  return (
    <Form
      name="search"
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Col span={6} >
          <Form.Item name="name" label="name" rules={[{ required: true, message: 'Please input your Username!' }]}  >
            <Input placeholder="name" />
          </Form.Item>
        </Col>
        <Col span={6} >
          <Form.Item
            label="age"
            name="age"
            rules={[{ required: true, message: 'Please input your age!' }]}
          >
            <Input type="age" placeholder="age" />
          </Form.Item>
        </Col>
        <Col span={6} >
          <Form.Item
            label="tag"
            name="tag"
            rules={[{ required: false, message: 'Please input your age!' }]}
          >
            <Select onChange={onChange}>
              <Select.Option value="sample" >Sample</Select.Option>
              <Select.Option value="sample2">Sample2</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6} >
          <Form.Item>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button >重置</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
};
const About = () => {
  return (
    <>
      <SearchForm />
      <Table columns={columns} dataSource={data} />
    </>
  )
}
export default About 
