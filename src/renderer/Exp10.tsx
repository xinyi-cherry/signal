/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
import Plot from 'react-plotly.js';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { LaptopOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {
  Progress,
  Divider,
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Col,
  Row,
  Button,
  FloatButton,
  Table,
  Spin,
} from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import 'katex/dist/katex.min.css';
import type { ColumnsType } from 'antd/es/table';
import useSWR from 'swr';
import api from './api';

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

interface DataType {
  [prop: string]: string;
}

const MyProgress = ({ uuid }: { uuid: any }) => {
  const { data, error, isLoading } = useSWR(`${api}progress/${uuid}`, fetcher, {
    refreshInterval: 10,
  });
  if (error) return <div>An error has occurred.</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <Row>
      {data.state}
      <Progress percent={data.rate.toFixed(2)} status="active" />
    </Row>
  );
};

const columns = () => {
  const value: ColumnsType<DataType> = [
    {
      title: '信噪比(dB)',
      dataIndex: 'rowName',
      rowScope: 'row',
      ellipsis: true,
      width: 150,
      align: 'center',
      fixed: 'left',
    },
  ];
  for (let i = 0; i < 9; i++) {
    value.push({
      title: `${-20 + 5 * i}dB`,
      dataIndex: `db${i}`,
      width: 77,
      align: 'center',
      render: (text) => {
        return text.toFixed(4);
      },
    });
  }
  return value;
};

const Page1 = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<any>({});
  const [uuid, setUUID] = React.useState('');
  const [showFig, setShowFig] = React.useState(false);
  const [sheetData, setSheetData] = React.useState<DataType[]>([]);
  const handleGen = () => {
    setIsLoading(true);
    const uid = uuidv4();
    setUUID(uid);
    fetch(`${api}exp10?uuid=${uid}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          const mySheetData: DataType[] = [];
          let rowDataVar = { rowName: '方差' };
          let rowDataB = { rowName: 'b' };
          let rowDataVt = { rowName: '阈值' };
          let rowDataTh = { rowName: '理论虚警概率' };
          let rowDataRl = { rowName: '实际虚警概率' };
          for (let i = 0; i < 9; i++) {
            const testkey = `db${i}`;
            const testVar: any = [];
            const testB: any = [];
            const testVt: any = [];
            const testTh: any = [];
            const testRl: any = [];
            testVar[testkey] = 1;
            testB[testkey] = res.bs[i];
            testVt[testkey] = res.points[i];
            testTh[testkey] = res.th_rate[i];
            testRl[testkey] = res.real_rate[i];
            rowDataVar = { ...rowDataVar, ...testVar };
            rowDataB = { ...rowDataB, ...testB };
            rowDataVt = { ...rowDataVt, ...testVt };
            rowDataTh = { ...rowDataTh, ...testTh };
            rowDataRl = { ...rowDataRl, ...testRl };
          }
          mySheetData.push(
            rowDataVar,
            rowDataB,
            rowDataVt,
            rowDataTh,
            rowDataRl
          );
          setSheetData(mySheetData);
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
          <Row>
            <Col span={24} style={{ minHeight: '400px' }}>
              <Plot
                data={[
                  {
                    x: data.w,
                    y: data.H,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  showlegend: false,
                  title: '窄带滤波器幅频响应',
                  xaxis: { title: '频率' },
                  yaxis: { title: 'dB' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '400px' }}
                useResizeHandler
              />
            </Col>
            <Col span={12} style={{ minHeight: '400px' }}>
              <Plot
                data={[
                  {
                    x: data.t,
                    y: data.wgn,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '窄带高斯白噪声',
                  xaxis: { title: '时间' },
                  yaxis: { title: '幅度' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '400px' }}
                useResizeHandler
              />
            </Col>
            <Col span={12} style={{ minHeight: '100px' }}>
              <Plot
                data={[
                  {
                    x: data.w,
                    y: data.wgn_periodgram,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  showlegend: false,
                  title: '功率谱',
                  xaxis: { title: '频率' },
                  yaxis: { title: '功率谱密度' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
            {data.ats.map((item: any, index: any) => {
              return (
                <Col
                  span={12}
                  style={{ minHeight: '100px' }}
                  key={`fig${index}`}
                >
                  <Plot
                    data={[
                      {
                        x: item[0],
                        y: item[1],
                        type: 'scatter',
                        mode: 'lines',
                        marker: { color: 'purple', opacity: 0.5 },
                        name: '有信号',
                      },
                      {
                        x: data.noise_x,
                        y: data.noise_y,
                        type: 'scatter',
                        mode: 'lines',
                        marker: { color: 'orange', opacity: 0.5 },
                        name: '无信号',
                      },
                      {
                        x: data.noise_rice_x,
                        y: data.arice[index],
                        type: 'scatter',
                        mode: 'lines',
                        marker: { color: 'blue', opacity: 0.5 },
                        name: '理论有信号',
                      },
                      {
                        x: data.noise_rice_x,
                        y: data.noise_rice_y,
                        type: 'scatter',
                        mode: 'lines',
                        marker: { color: 'grey', opacity: 0.5 },
                        name: '理论无信号',
                      },
                      {
                        x: [data.points[index], data.points[index]],
                        y: [0, 0.6],
                        type: 'scatter',
                        mode: 'lines',
                        line: { dash: 'dot' },
                        marker: { color: 'green' },
                        name: '阈值',
                      },
                    ]}
                    layout={{
                      autosize: true,
                      title: `${-20 + index * 5}dB下概率密度分布`,
                      xaxis: { title: '幅度', rangemode: 'nonnegative' },
                      yaxis: { title: '概率密度' },
                    }}
                    config={{ responsive: true }}
                    style={{
                      width: '100%',
                      height: '100%',
                      minHeight: '300px',
                    }}
                    useResizeHandler
                  />
                </Col>
              );
            })}
            <Divider />
            <Col span={24} style={{ minHeight: '100px' }}>
              <Plot
                data={[
                  {
                    x: data.snrs,
                    y: data.th_rate,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange', opacity: 0.5 },
                    name: '理论虚警概率',
                  },
                  {
                    x: data.snrs,
                    y: data.real_rate,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'purple', opacity: 0.5 },
                    name: '实际虚警概率',
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '虚警概率',
                  xaxis: { title: '信噪比' },
                  yaxis: { title: '概率' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
          </Row>
          <Divider />
          <Table
            columns={columns()}
            dataSource={sheetData}
            bordered
            size="small"
            pagination={{ position: ['none', 'none'] }}
            scroll={{ x: '100%' }}
          />
        </>
      )}
      {isLoading && (
        <>
          <Row align="middle" justify="center">
            <Spin size="large" />
          </Row>
          <MyProgress uuid={uuid} />
        </>
      )}
      <FloatButton.BackTop visibilityHeight={200} />
    </>
  );
};

export default function Exp5() {
  const pages = ['随机过程的包络检测'];
  const [nowPage, setNowPage] = React.useState(1);
  const items: MenuProps['items'] = [LaptopOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `实验十 随机过程的包络检测`,
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
