/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
import Plot from 'react-plotly.js';
import React from 'react';
import { LaptopOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Input,
  Col,
  Row,
  Button,
  Typography,
} from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import api from './api';

const { Text } = Typography;

const Page1 = () => {
  const [data, setData] = React.useState<any>({});
  const [showFig, setShowFig] = React.useState(false);
  const [fc, setFc] = React.useState(1000);
  const [f1, setF1] = React.useState(30);
  const [f2, setF2] = React.useState(300);
  const [fs, setFs] = React.useState(100);
  const [fstop, setFstop] = React.useState(200);
  const [t, setT] = React.useState(1);
  const [stage, setStage] = React.useState(0);
  const tChange = (event: any) => {
    setT(event.target.value);
  };
  const fcChange = (event: any) => {
    setFc(event.target.value);
  };
  const fsChange = (event: any) => {
    setFs(event.target.value);
  };
  const f1Change = (event: any) => {
    setF1(event.target.value);
  };
  const f2Change = (event: any) => {
    setF2(event.target.value);
  };
  const fstopChange = (event: any) => {
    setFstop(event.target.value);
  };
  const handleGen = () => {
    fetch(
      `${api}exp4_1?fc=${fc}&fs=${fs}&f1=${f1}&f2=${f2}&l=${t}&fstop=${fstop}`,
      {
        method: 'GET',
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setData(res);
          setStage(res.N);
          setShowFig(true);
        }
      });
  };
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Input
            placeholder="采样频率"
            addonBefore={
              <>
                采样频率
                <InlineMath math="f_s" />
              </>
            }
            onChange={fcChange}
            defaultValue={1000}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="截止频率"
            addonBefore={
              <>
                截止频率
                <InlineMath math="f_c" />
              </>
            }
            onChange={fsChange}
            defaultValue={100}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="阻带频率"
            addonBefore={
              <>
                阻带频率
                <InlineMath math="f_{st}" />
              </>
            }
            onChange={fstopChange}
            defaultValue={200}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="混合信号频率1"
            addonBefore={
              <>
                混合信号频率1
                <InlineMath math="f_1" />
              </>
            }
            onChange={f1Change}
            defaultValue={30}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="混合信号频率2"
            addonBefore={
              <>
                混合信号频率2
                <InlineMath math="f_2" />
              </>
            }
            onChange={f2Change}
            defaultValue={300}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="时间"
            addonBefore={
              <>
                时长
                <InlineMath math="L" />
              </>
            }
            onChange={tChange}
            defaultValue={1}
          />
        </Col>
        <Col span={8}>
          <Button type="primary" onClick={handleGen}>
            Generate
          </Button>
        </Col>
      </Row>
      {showFig && (
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <Text>滤波器阶数：{stage}</Text>
          <Row gutter={[16, 4]} style={{ minHeight: '100%' }}>
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
                  xaxis: { title: '频率' },
                  yaxis: { title: '相位' },
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
                    x: data.signal_time.x,
                    y: data.signal_time.y,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '正弦混合信号',
                  xaxis: { title: '时间' },
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
                    x: data.signal_freq.x,
                    y: data.signal_freq.y,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '正弦混合信号幅频响应',
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
                    x: data.filtered_time.x,
                    y: data.filtered_time.y,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
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
            <Col span={12} style={{ minHeight: '100px' }}>
              <Plot
                data={[
                  {
                    x: data.filtered_freq.x,
                    y: data.filtered_freq.y,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '滤波后幅频响应',
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
                    x: data.signal_phase.x,
                    y: data.signal_phase.y,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '滤波前相频响应',
                  xaxis: { title: '频率' },
                  yaxis: { title: '相位' },
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
                    x: data.filtered_phase.x,
                    y: data.filtered_phase.y,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '滤波后相频响应',
                  xaxis: { title: '频率' },
                  yaxis: { title: '相位' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

const Page2 = () => {
  const [data, setData] = React.useState<any>({});
  const [showFig, setShowFig] = React.useState(false);
  const [fc, setFc] = React.useState(1000);
  const [f1, setF1] = React.useState(30);
  const [f2, setF2] = React.useState(300);
  const [fs, setFs] = React.useState(100);
  const [fstop, setFstop] = React.useState(250);
  const [t, setT] = React.useState(1);
  const [stage, setStage] = React.useState(27);
  const fstopChange = (event: any) => {
    setFstop(event.target.value);
  };
  const tChange = (event: any) => {
    setT(event.target.value);
  };
  const fcChange = (event: any) => {
    setFc(event.target.value);
  };
  const fsChange = (event: any) => {
    setFs(event.target.value);
  };
  const f1Change = (event: any) => {
    setF1(event.target.value);
  };
  const f2Change = (event: any) => {
    setF2(event.target.value);
  };
  const handleGen = () => {
    fetch(
      `${api}exp4_2?fc=${fc}&fs=${fs}&f1=${f1}&f2=${f2}&l=${t}&fst=${fstop}`,
      {
        method: 'GET',
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setData(res);
          setStage(res.N);
          setShowFig(true);
        }
      });
  };
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Input
            placeholder="采样频率"
            addonBefore={
              <>
                采样频率
                <InlineMath math="f_s" />
              </>
            }
            onChange={fcChange}
            defaultValue={1000}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="截止频率"
            addonBefore={
              <>
                截止频率
                <InlineMath math="f_c" />
              </>
            }
            onChange={fsChange}
            defaultValue={100}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="通带频率"
            addonBefore={
              <>
                通带频率
                <InlineMath math="f_p" />
              </>
            }
            onChange={fstopChange}
            defaultValue={250}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="混合信号频率1"
            addonBefore={
              <>
                混合信号频率1
                <InlineMath math="f_1" />
              </>
            }
            onChange={f1Change}
            defaultValue={30}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="混合信号频率2"
            addonBefore={
              <>
                混合信号频率2
                <InlineMath math="f_2" />
              </>
            }
            onChange={f2Change}
            defaultValue={300}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="时间"
            addonBefore={
              <>
                时长
                <InlineMath math="L" />
              </>
            }
            onChange={tChange}
            defaultValue={1}
          />
        </Col>
        <Col span={8}>
          <Button type="primary" onClick={handleGen}>
            Generate
          </Button>
        </Col>
      </Row>
      {showFig && (
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <Text>滤波器阶数：{stage}</Text>
          <Row gutter={[16, 4]} style={{ minHeight: '100%' }}>
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
                  xaxis: { title: '频率' },
                  yaxis: { title: '相位' },
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
                    x: data.signal_time.x,
                    y: data.signal_time.y,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '正弦混合信号',
                  xaxis: { title: '时间' },
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
                    x: data.signal_freq.x,
                    y: data.signal_freq.y,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '正弦混合信号幅频响应',
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
                    x: data.filtered_time.x,
                    y: data.filtered_time.y,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
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
            <Col span={12} style={{ minHeight: '100px' }}>
              <Plot
                data={[
                  {
                    x: data.filtered_freq.x,
                    y: data.filtered_freq.y,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '滤波后幅频响应',
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
                    x: data.signal_phase.x,
                    y: data.signal_phase.y,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '滤波前相频响应',
                  xaxis: { title: '频率' },
                  yaxis: { title: '相位' },
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
                    x: data.filtered_phase.x,
                    y: data.filtered_phase.y,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '滤波后相频响应',
                  xaxis: { title: '频率' },
                  yaxis: { title: '相位' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default function Exp2() {
  const pages = ['IIR低通滤波器', 'FIR高通滤波器'];
  const [nowPage, setNowPage] = React.useState(1);
  const items: MenuProps['items'] = [LaptopOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `实验四 数字滤波器的设计`,
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
          {nowPage === 2 && <Page2 />}
        </Content>
      </Layout>
    </Layout>
  );
}
