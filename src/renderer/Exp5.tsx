/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
import Plot from 'react-plotly.js';
import React from 'react';
import { LaptopOutlined } from '@ant-design/icons';
import type { MenuProps, TabsProps } from 'antd';
import {
  Progress,
  Segmented,
  Divider,
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Col,
  Row,
  Button,
  Typography,
  Tabs,
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

const { Text } = Typography;
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
      children: [
        {
          title: '基频',
          dataIndex: `base${i}`,
          onCell: (_, index) => ({
            colSpan: index === 9 ? 2 : 1,
          }),
          width: 75,
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
        },
        {
          title: '倍频',
          dataIndex: `bonus${i}`,
          onCell: (_, index) => ({
            colSpan: index === 9 ? 0 : 1,
          }),
          width: 75,
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
        },
      ],
    });
  }
  return value;
};

const Page1 = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<any>({});
  const [tAcc, settAcc] = React.useState(0);
  const [tabData, setTabData] = React.useState<TabsProps['items']>([]);
  const [tabDataT, setTabDataT] = React.useState<TabsProps['items']>([]);
  const [sheetData, setSheetData] = React.useState<DataType[]>([]);
  const [showFig, setShowFig] = React.useState(false);
  const [stage, setStage] = React.useState(0);
  const [showState, setShowState] = React.useState(1);
  const [baseAcc, setBaseAcc] = React.useState(0);
  const [bonusAcc, setBonusAcc] = React.useState(0);
  const handleGen = () => {
    setIsLoading(true);
    fetch(`${api}exp5_new`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setData(res);
          setStage(res.N);
          let totalAcc = 0;
          let totalBaseAcc = 0;
          let totalBonusAcc = 0;
          const tabItems: TabsProps['items'] = [];
          const mySheetData: DataType[] = [];
          for (let i = 0; i < 8; i++) {
            let rowData = { rowName: `通道${i + 1}` };
            for (let j = 0; j < 20; j++) {
              const basekey = `base${j + 1}`;
              const bonuskey = `bonus${j + 1}`;
              const basetmp: any = [];
              const bonustmp: any = [];
              basetmp[basekey] = [res.freq_result[i][j][0], res.freq_ans[j]];
              bonustmp[bonuskey] = [res.freq_result[i][j][1], res.freq_ans[j]];
              rowData = { ...rowData, ...basetmp, ...bonustmp };
            }
            mySheetData.push(rowData);
            const tabContent = {
              key: `${i + 1}`,
              label: `通道${i + 1}`,
              children: (
                <>
                  <Row gutter={[16, 4]} style={{ minHeight: '100%' }}>
                    {res.filtered.y[i].map((item: any, key: number) => {
                      return (
                        <Col
                          span={12}
                          style={{ minHeight: '100px' }}
                          key={`fig-${key}`}
                        >
                          <Row>
                            <Col span={24} style={{ minHeight: '100px' }}>
                              <Plot
                                data={[
                                  {
                                    x: res.filtered.x,
                                    y: item,
                                    type: 'scatter',
                                    mode: 'lines',
                                    marker: { color: 'orange' },
                                  },
                                  {
                                    x: [res.freq_peaks[i][key][0] / 8],
                                    y: [item[res.freq_peaks[i][key][0]]],
                                    type: 'scatter',
                                    mode: 'text+markers',
                                    marker: { color: 'rgb(47,135,255)' },
                                    text: [
                                      `(${res.freq_peaks[i][key][0] / 8},${item[
                                        res.freq_peaks[i][key][0]
                                      ].toFixed(2)})`,
                                    ],
                                    textposition: 'bottom right',
                                    name: '基频峰值',
                                  },
                                  {
                                    x: [res.freq_peaks[i][key][1] / 8],
                                    y: [item[res.freq_peaks[i][key][1]]],
                                    type: 'scatter',
                                    mode: 'text+markers',
                                    marker: { color: 'rgb(83,29,171)' },
                                    text: [
                                      `(${res.freq_peaks[i][key][1] / 8},${item[
                                        res.freq_peaks[i][key][1]
                                      ].toFixed(2)})`,
                                    ],
                                    textposition: 'top center',
                                    name: '倍频峰值',
                                  },
                                ]}
                                layout={{
                                  autosize: true,
                                  showlegend: false,
                                  title: `试次${key + 1}`,
                                  xaxis: { title: '频率', range: [7, 25] },
                                  yaxis: { title: '功率' },
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
                            <Col span={24}>
                              <Row align="middle" justify="center">
                                <Col span={5}>基频类型</Col>
                                <Col span={3}>
                                  <Tag bordered={false} color="processing">
                                    {res.freq_result[i][key][0]}
                                  </Tag>
                                </Col>
                                <Col span={5}>倍频类型</Col>
                                <Col span={3}>
                                  <Tag bordered={false} color="purple">
                                    {res.freq_result[i][key][1]}
                                  </Tag>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      );
                    })}
                  </Row>
                </>
              ),
            };
            tabItems.push(tabContent);
          }
          let rowData = { rowName: `通道联合` };
          for (let j = 0; j < 20; j++) {
            const basekey = `base${j + 1}`;
            const bonuskey = `bonus${j + 1}`;
            const basetmp: any = [];
            const bonustmp: any = [];
            basetmp[basekey] = [res.base_result_total[j], res.freq_ans[j]];
            bonustmp[bonuskey] = [res.bonus_result_total[j], res.freq_ans[j]];
            rowData = { ...rowData, ...basetmp, ...bonustmp };
          }
          mySheetData.push(rowData);
          rowData = { rowName: `基倍频联合` };
          for (let j = 0; j < 20; j++) {
            const basekey = `base${j + 1}`;
            const bonuskey = `bonus${j + 1}`;
            const basetmp: any = [];
            const bonustmp: any = [];
            basetmp[basekey] = [res.final_result_total[j], res.freq_ans[j]];
            bonustmp[bonuskey] = [res.final_result_total[j], res.freq_ans[j]];
            rowData = { ...rowData, ...basetmp, ...bonustmp };
          }
          mySheetData.push(rowData);
          const tabItemsT: TabsProps['items'] = [];
          for (let i = 0; i < 20; i++) {
            if (res.base_result_total[i] === res.freq_ans[i]) {
              totalBaseAcc++;
            }
            if (res.bonus_result_total[i] === res.freq_ans[i]) {
              totalBonusAcc++;
            }
            if (res.final_result_total[i] === res.freq_ans[i]) {
              totalAcc++;
            }
            const tabContent = {
              key: `${i + 1}`,
              label: `试次${i + 1}`,
              children: (
                <>
                  <Row gutter={[16, 4]} style={{ minHeight: '100%' }}>
                    {res.filteredT.y[i].map((item: any, key: number) => {
                      return (
                        <Col
                          span={12}
                          style={{ minHeight: '100px' }}
                          key={`fig-${key}`}
                        >
                          <Row>
                            <Col span={24} style={{ minHeight: '100px' }}>
                              <Plot
                                data={[
                                  {
                                    x: res.filtered.x,
                                    y: item,
                                    type: 'scatter',
                                    mode: 'lines',
                                    marker: { color: 'orange' },
                                  },
                                  {
                                    x: [res.freq_peaksT[i][key][0] / 8],
                                    y: [item[res.freq_peaksT[i][key][0]]],
                                    type: 'scatter',
                                    mode: 'text+markers',
                                    marker: { color: 'rgb(47,135,255)' },
                                    text: [
                                      `(${
                                        res.freq_peaksT[i][key][0] / 8
                                      },${item[
                                        res.freq_peaksT[i][key][0]
                                      ].toFixed(2)})`,
                                    ],
                                    textposition: 'bottom right',
                                    name: '基频峰值',
                                  },
                                  {
                                    x: [res.freq_peaksT[i][key][1] / 8],
                                    y: [item[res.freq_peaksT[i][key][1]]],
                                    type: 'scatter',
                                    mode: 'text+markers',
                                    marker: { color: 'rgb(83,29,171)' },
                                    text: [
                                      `(${
                                        res.freq_peaksT[i][key][1] / 8
                                      },${item[
                                        res.freq_peaksT[i][key][1]
                                      ].toFixed(2)})`,
                                    ],
                                    textposition: 'top center',
                                    name: '倍频峰值',
                                  },
                                ]}
                                layout={{
                                  autosize: true,
                                  showlegend: false,
                                  title: `通道${key + 1}`,
                                  xaxis: { title: '频率', range: [7, 25] },
                                  yaxis: { title: '功率' },
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
                            <Col span={24}>
                              <Row align="middle" justify="center">
                                <Col span={5}>基频类型</Col>
                                <Col span={3}>
                                  <Tag bordered={false} color="processing">
                                    {res.freq_resultT[i][key][0]}
                                  </Tag>
                                </Col>
                                <Col span={5}>倍频类型</Col>
                                <Col span={3}>
                                  <Tag bordered={false} color="purple">
                                    {res.freq_resultT[i][key][1]}
                                  </Tag>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      );
                    })}
                  </Row>
                </>
              ),
            };
            tabItemsT.push(tabContent);
          }
          setTabData(tabItems);
          setTabDataT(tabItemsT);
          setSheetData(mySheetData);
          setBaseAcc(totalBaseAcc);
          setBonusAcc(totalBonusAcc);
          settAcc(totalAcc);
          setIsLoading(false);
          setShowFig(true);
        }
      });
  };
  const tabChange = (now: any) => {
    if (now === '按试次') {
      setShowState(0);
    } else {
      setShowState(1);
    }
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
          <Text>滤波器阶数：{stage}</Text>
          <Row gutter={[16, 4]}>
            <Col span={12} style={{ minHeight: '100px' }}>
              <Plot
                data={[
                  {
                    x: data.filter.x,
                    y: data.filter.y,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '滤波器幅频响应',
                  xaxis: { title: '频率' },
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
                    x: data.filter_phase.x,
                    y: data.filter_phase.y,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '滤波器相频响应',
                  xaxis: { title: '频率', range: [0, 40], autorange: false },
                  yaxis: { title: '相位' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
          </Row>
          <Divider />
          <Row justify="center">
            <Segmented options={['按通道', '按试次']} onChange={tabChange} />
          </Row>
          {showState === 1 && (
            <Tabs
              defaultActiveKey="1"
              items={tabData}
              centered
              tabPosition="left"
            />
          )}
          {showState === 0 && (
            <Tabs
              defaultActiveKey="1"
              items={tabDataT}
              centered
              tabPosition="left"
            />
          )}
          <Divider />
          <Table
            columns={columns()}
            dataSource={sheetData}
            bordered
            size="small"
            pagination={{ position: ['none', 'none'] }}
            scroll={{ x: '100%' }}
          />
          <Divider />
          <Row align="middle" justify="center" gutter={[16, 16]}>
            <Col span={8} style={{ textAlign: 'center' }}>
              基频正确率
            </Col>
            <Col span={8} style={{ textAlign: 'center' }}>
              倍频正确率
            </Col>
            <Col span={8} style={{ textAlign: 'center' }}>
              基倍频正确率
            </Col>
            <Col span={8} style={{ textAlign: 'center' }}>
              <Progress type="circle" percent={baseAcc * 5} />
            </Col>
            <Col span={8} style={{ textAlign: 'center' }}>
              <Progress type="circle" percent={bonusAcc * 5} />
            </Col>
            <Col span={8} style={{ textAlign: 'center' }}>
              <Progress type="circle" percent={tAcc * 5} />
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
  const pages = ['脑电信号的提取'];
  const [nowPage, setNowPage] = React.useState(1);
  const items: MenuProps['items'] = [LaptopOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `实验五 脑电信号的提取`,
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
