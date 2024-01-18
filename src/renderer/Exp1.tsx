/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
import React from 'react';
import { LaptopOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {
  Breadcrumb,
  Layout,
  Menu,
  Select,
  theme,
  Input,
  Col,
  Row,
  Button,
  Typography,
} from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import api from './api';

const { Text } = Typography;

const Page1 = () => {
  // 计算器页面
  const [op, setOp] = React.useState('+'); // 存储选择的运算符
  const [num1, setNum1] = React.useState(0); // 存储第一位数
  const [num2, setNum2] = React.useState(0); // 存储第二位数
  const [ans, setAns] = React.useState(''); // 存储结果
  const handleChange = (operator: string) => {
    // 运算符改变触发回调
    setOp(operator);
  };
  const num1Change = (event: any) => {
    // 第一个数改变触发回调
    setNum1(event.target.value);
  };
  const num2Change = (event: any) => {
    // 第二个数改变触发回调
    setNum2(event.target.value);
  };
  const handleCalc = () => {
    // 计算按钮回调
    // 向后端Python请求计算结果并保存
    fetch(`${api}exp1?num1=${num1}&num2=${num2}&op=${op.replace('+', '%2B')}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.ans) {
          setAns(res.ans);
        }
      });
  };
  return (
    <>
      <Row gutter={16}>
        <Col span={6}>
          {/* 输入框 */}
          <Input placeholder="Number1" onChange={num1Change} />
        </Col>
        <Col span={2}>
          {/* 符号选择框 */}
          <Select
            defaultValue="+"
            onChange={handleChange}
            options={[
              { value: '+', label: '+' },
              { value: '-', label: '-' },
              { value: '*', label: '*' },
              { value: '/', label: '/' },
            ]}
          />
        </Col>
        <Col span={6}>
          {/* 输入框 */}
          <Input placeholder="Number2" onChange={num2Change} />
        </Col>
        <Col span={2}>
          {/* 计算按钮 */}
          <Button type="primary" onClick={handleCalc}>
            Calculate
          </Button>
        </Col>
      </Row>
      <Text>Ans:{ans}</Text>
    </>
  );
};

export default function Exp1() {
  const pages = ['计算器'];
  const [nowPage, setNowPage] = React.useState(1);
  // 设置实验页面菜单及内容
  const items: MenuProps['items'] = [LaptopOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `实验一 GUI界面设计`,
      children: pages.map((name, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: name,
        };
      }),
    };
  });
  const selectPage = (item: any) => {
    setNowPage(parseInt(item.key, 10));
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider width={320} style={{ background: colorBgContainer }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
          items={items}
          onSelect={selectPage}
        />
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>{pages[nowPage - 1]}</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 660,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflowY: 'auto',
          }}
        >
          {/* 加载实验页面（每一个小项目为一个Page）
              通过判断nowPage决定当前显示的页面
          */}
          {nowPage === 1 && <Page1 />}
        </Content>
      </Layout>
    </Layout>
  );
}
