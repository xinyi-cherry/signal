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
  FloatButton,
  Spin,
} from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import api from './api';

const Page1 = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<any>({});
  const [showFig, setShowFig] = React.useState(false);
  const handleGen = () => {
    setIsLoading(true);
    fetch(`${api}exp9`, {
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
          <Row gutter={[16, 4]} align="middle" justify="center">
            <Col span={16} style={{ minHeight: '400px' }}>
              <Row
                gutter={[16, 4]}
                align="middle"
                justify="center"
                style={{ minHeight: '400px' }}
              >
                <Col span={24}>
                  <div style={{ fontSize: '24px' }}>
                    <BlockMath
                      math={`\\begin{bmatrix}
                            x_1(t) \\cr
                            x_2(t)
                          \\end{bmatrix}
                          =
                          \\begin{bmatrix}
                            a(30°)&a(20°)
                          \\end{bmatrix}
                          \\begin{bmatrix}
                            s(t) \\cr
                            i_1(t)
                          \\end{bmatrix}
                          +
                          \\begin{bmatrix}
                            n_1(t) \\cr
                            n_2(t)
                          \\end{bmatrix}`}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col span={8} style={{ minHeight: '400px' }}>
              {data.wreal[0].map((item: any, index: any) => {
                return (
                  <BlockMath
                    key={`formula-${index}`}
                    math={`w_{${index}}=${item.toFixed(4)}${
                      data.wimg[0][index] >= 0 ? '+' : ''
                    }${data.wimg[0][index].toFixed(4)}j`}
                  />
                );
              })}
            </Col>
          </Row>
          <Divider />
          <Row gutter={[16, 4]}>
            <Col span={16} style={{ minHeight: '400px' }}>
              <Plot
                data={[
                  {
                    x: data.powern,
                    y: data.power,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                  {
                    x: [data.powern[200], data.powern[210]],
                    y: [data.power[200], data.power[210]],
                    type: 'scatter',
                    mode: 'markers',
                    marker: { color: 'purple' },
                  },
                ]}
                layout={{
                  autosize: true,
                  showlegend: false,
                  title: '方向图',
                  xaxis: { title: '角度(deg)' },
                  yaxis: { title: 'dB' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '400px' }}
                useResizeHandler
              />
            </Col>
            <Col span={8} style={{ minHeight: '400px' }}>
              <Plot
                data={[
                  {
                    theta: data.powern,
                    r: data.power,
                    type: 'scatterpolar',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '方向图',
                  xaxis: { title: '角度(deg)' },
                  yaxis: { title: 'dB' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '400px' }}
                useResizeHandler
              />
            </Col>
            <Col span={24} style={{ minHeight: '100px' }}>
              <Plot
                data={[
                  {
                    x: data.t,
                    y: data.x[0],
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                  {
                    x: data.t,
                    y: data.x[1],
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'blue' },
                  },
                  {
                    x: data.t,
                    y: data.x[2],
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'green' },
                  },
                  {
                    x: data.t,
                    y: data.x[3],
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'red' },
                  },
                  {
                    x: data.t,
                    y: data.x[4],
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'purple' },
                  },
                  {
                    x: data.t,
                    y: data.x[5],
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'yellow' },
                  },
                  {
                    x: data.t,
                    y: data.x[6],
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'black' },
                  },
                  {
                    x: data.t,
                    y: data.x[7],
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'grey' },
                  },
                  {
                    x: data.t,
                    y: data.x[8],
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'pink' },
                  },
                  {
                    x: data.t,
                    y: data.x[9],
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'aqua' },
                  },
                  {
                    x: data.t,
                    y: data.x[10],
                    type: 'scatter',
                    mode: 'lines',
                  },
                  {
                    x: data.t,
                    y: data.x[11],
                    type: 'scatter',
                    mode: 'lines',
                  },
                ]}
                layout={{
                  autosize: true,
                  showlegend: false,
                  title: '接收信号',
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
                    x: data.t,
                    y: data.y[0],
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  showlegend: false,
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
                    x: data.t,
                    y: data.s1[0],
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  showlegend: false,
                  title: '预期信号',
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
                    x: data.t,
                    y: data.s2[0],
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  showlegend: false,
                  title: '干扰信号',
                  xaxis: { title: '时间' },
                  yaxis: { title: '幅度' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
          </Row>
          <Divider />
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
  const pages = ['空域滤波器设计'];
  const [nowPage, setNowPage] = React.useState(1);
  const items: MenuProps['items'] = [LaptopOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `实验九 空域滤波器设计`,
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
