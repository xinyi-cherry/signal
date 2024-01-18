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
  Tag,
  Table,
  Spin,
  Flex,
} from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import 'katex/dist/katex.min.css';
import type { ColumnsType } from 'antd/es/table';
import api from './api';

interface DataType {
  [prop: string]: string;
}
const columns = () => {
  const value: ColumnsType<DataType> = [
    {
      title: '',
      dataIndex: 'rowName',
      rowScope: 'row',
      ellipsis: true,
      width: 100,
      align: 'center',
      fixed: 'left',
    },
  ];
  for (let i = 1; i <= 20; i++) {
    value.push({
      title: `试次${i}`,
      dataIndex: `test${i}`,
      onCell: (_, index) => ({
        colSpan: index === 3 ? 2 : 1,
      }),
      width: 100,
      align: 'center',
      render: (text) => (
        <Flex align="center" justify="center">
          <Tag
            bordered={false}
            color={text[0] === text[1] ? 'success' : 'error'}
            style={{ margin: 0 }}
          >
            类型{text[0]}
          </Tag>
        </Flex>
      ),
    });
  }
  return value;
};

const Page1 = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<any>({});
  const [showFig, setShowFig] = React.useState(false);
  const [sheetData, setSheetData] = React.useState<DataType[]>([]);
  const handleGen = () => {
    setIsLoading(true);
    fetch(`${api}exp6`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          const mySheetData: DataType[] = [];
          let rowDataLeft = { rowName: '左眼' };
          let rowDataRight = { rowName: '右眼' };
          let rowDataTotal = { rowName: '综合' };
          for (let i = 0; i < 20; i++) {
            const testkey = `test${i + 1}`;
            const testLeft: any = [];
            const testRight: any = [];
            const testTotal: any = [];
            testLeft[testkey] = [res.category_left[i][39], res.category_ans[i]];
            testRight[testkey] = [
              res.category_right[i][39],
              res.category_ans[i],
            ];
            testTotal[testkey] = [
              res.category_total[i][39],
              res.category_ans[i],
            ];
            rowDataLeft = { ...rowDataLeft, ...testLeft };
            rowDataRight = { ...rowDataRight, ...testRight };
            rowDataTotal = { ...rowDataTotal, ...testTotal };
          }
          mySheetData.push(rowDataLeft, rowDataRight, rowDataTotal);
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
          <Row gutter={[16, 4]}>
            <Col span={24} style={{ minHeight: '100px' }}>
              <Plot
                data={[
                  {
                    x: data.pre_left[0],
                    y: data.pre_left[1],
                    type: 'scatter',
                    mode: 'markers',
                    marker: { color: 'orange' },
                    name: '左眼',
                  },
                  {
                    x: data.pre_right[0],
                    y: data.pre_right[1],
                    type: 'scatter',
                    mode: 'markers',
                    marker: { color: 'purple' },
                    name: '右眼',
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '校准阶段中心位置',
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
            title={() => '40个时间点分类结果'}
          />
          <Divider />
          <Row gutter={[16, 4]}>
            <Col span={8} style={{ minHeight: '200px' }}>
              <Plot
                data={[
                  {
                    x: data.chart_index,
                    y: data.acc_left,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                    name: '左眼',
                  },
                  {
                    x: [
                      data.chart_index[9],
                      data.chart_index[19],
                      data.chart_index[29],
                      data.chart_index[39],
                    ],
                    y: [
                      data.acc_left[9],
                      data.acc_left[19],
                      data.acc_left[29],
                      data.acc_left[39],
                    ],
                    type: 'scatter',
                    mode: 'markers',
                    marker: { color: 'orange' },
                    name: '左眼',
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '左眼正确率',
                  showlegend: false,
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
            <Col span={8} style={{ minHeight: '200px' }}>
              <Plot
                data={[
                  {
                    x: data.chart_index,
                    y: data.acc_right,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'purple' },
                    name: '右眼',
                  },
                  {
                    x: [
                      data.chart_index[9],
                      data.chart_index[19],
                      data.chart_index[29],
                      data.chart_index[39],
                    ],
                    y: [
                      data.acc_right[9],
                      data.acc_right[19],
                      data.acc_right[29],
                      data.acc_right[39],
                    ],
                    type: 'scatter',
                    mode: 'markers',
                    marker: { color: 'purple' },
                    name: '右眼',
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '右眼正确率',
                  showlegend: false,
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
            <Col span={8} style={{ minHeight: '200px' }}>
              <Plot
                data={[
                  {
                    x: data.chart_index,
                    y: data.acc_total,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'green' },
                    name: '联合',
                  },
                  {
                    x: [
                      data.chart_index[9],
                      data.chart_index[19],
                      data.chart_index[29],
                      data.chart_index[39],
                    ],
                    y: [
                      data.acc_total[9],
                      data.acc_total[19],
                      data.acc_total[29],
                      data.acc_total[39],
                    ],
                    type: 'scatter',
                    mode: 'markers',
                    marker: { color: 'green' },
                    name: '联合',
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '联合正确率',
                  showlegend: false,
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
  const pages = ['VR眼动数据的目标识别'];
  const [nowPage, setNowPage] = React.useState(1);
  const items: MenuProps['items'] = [LaptopOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `实验六 VR眼动数据的目标识别`,
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
