/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
import Plot from 'react-plotly.js';
import React from 'react';
import { LaptopOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {
  Divider,
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Col,
  Row,
  Button,
  Typography,
  FloatButton,
  Spin,
} from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import 'katex/dist/katex.min.css';
import api from './api';

const { Text } = Typography;

const Page1 = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<any>({});
  const [showFig, setShowFig] = React.useState(false);
  const handleGen = () => {
    setIsLoading(true);
    fetch(`${api}exp8`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setData(res);
          setIsLoading(false);
          setShowFig(true);
        }
      });
  };
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Button type="primary" onClick={handleGen}>
            Generate
          </Button>
        </Col>
      </Row>
      {!isLoading && showFig && (
        <>
          <Text>低通阶数{data.lowpass.N}</Text>
          <Row gutter={[16, 4]}>
            <Col span={12} style={{ minHeight: '100px' }}>
              <Plot
                data={[
                  {
                    x: data.lowpass.x,
                    y: data.lowpass.y,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '低通滤波器',
                  xaxis: { title: '频率/Hz' },
                  yaxis: { title: '幅度' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
            <Col span={12} style={{ minHeight: '100px' }}>
              <Plot
                data={[
                  {
                    x: data.lowpass.x,
                    y: data.lowpass.p,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '低通滤波器-相频',
                  xaxis: { title: '频率/Hz' },
                  yaxis: { title: '相位' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
          </Row>
          <Text>高通阶数{data.highpass.N}</Text>
          <Row gutter={[16, 4]}>
            <Col span={12} style={{ minHeight: '100px' }}>
              <Plot
                data={[
                  {
                    x: data.highpass.x,
                    y: data.highpass.y,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '高通滤波器',
                  xaxis: { title: '频率/Hz' },
                  yaxis: { title: '幅度' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
            <Col span={12} style={{ minHeight: '100px' }}>
              <Plot
                data={[
                  {
                    x: data.highpass.x,
                    y: data.highpass.p,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '高通滤波器-相频',
                  xaxis: { title: '频率/Hz' },
                  yaxis: { title: '相位' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
          </Row>
          <Divider />
          <Row gutter={[16, 4]}>
            <Col span={24} style={{ minHeight: '100px' }}>
              <Plot
                data={[
                  {
                    x: data.n,
                    y: data.data,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                    line: { width: 0.5 },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '原始信号',
                  xaxis: { title: '时间' },
                  yaxis: { title: '幅度' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
            <Col span={24} style={{ minHeight: '100px' }}>
              <Plot
                data={[
                  {
                    x: data.w,
                    y: data.data_fft,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                    line: { width: 0.5 },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '原始信号频域',
                  xaxis: { title: '频率/Hz' },
                  yaxis: { title: '幅度' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
          </Row>
          <Row gutter={[16, 4]}>
            <Col span={24} style={{ minHeight: '100px' }}>
              <Plot
                data={[
                  {
                    x: data.n,
                    y: data.data_filtered,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                    line: { width: 0.5 },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '滤波后信号',
                  xaxis: { title: '时间' },
                  yaxis: { title: '幅度' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
            <Col span={24} style={{ minHeight: '100px' }}>
              <Plot
                data={[
                  {
                    x: data.w,
                    y: data.data_filtered_fft,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                    line: { width: 0.5 },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '滤波后信号频域',
                  xaxis: { title: '频率/Hz' },
                  yaxis: { title: '幅度' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
          </Row>
          <Row gutter={[16, 4]}>
            <Col span={12} style={{ minHeight: '100px' }}>
              <Plot
                data={[
                  {
                    x: data.time_slice,
                    y: data.rate_time,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'red' },
                    line: { width: 0.5 },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '时域法-峰值个数',
                  xaxis: { title: '时间' },
                  yaxis: { title: '心率/分钟' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
            <Col span={12} style={{ minHeight: '100px' }}>
              <Plot
                data={[
                  {
                    x: data.time_slice,
                    y: data.rate_time_freq,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'red' },
                    line: { width: 0.5 },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '时域法-峰值间隔时间',
                  xaxis: { title: '时间' },
                  yaxis: { title: '心率/分钟' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
            <Col span={24} style={{ minHeight: '100px' }}>
              <Plot
                data={[
                  {
                    x: data.time_slice,
                    y: data.rate_freq,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'red' },
                    line: { width: 0.5 },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '频域法',
                  xaxis: { title: '时间' },
                  yaxis: { title: '心率/分钟' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
          </Row>
        </>
      )}
      {isLoading && (
        <Row align="middle" justify="center">
          <Spin size="large" />
        </Row>
      )}
      <FloatButton.BackTop visibilityHeight={200} />
    </>
  );
};

export default function Exp5() {
  const pages = ['心电信号心率检测方法'];
  const [nowPage, setNowPage] = React.useState(1);
  const items: MenuProps['items'] = [LaptopOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `实验八 心电信号心率检测方法`,
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
            minHeight: 720,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {nowPage === 1 && <Page1 />}
        </Content>
      </Layout>
    </Layout>
  );
}
