/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
import Plot from 'react-plotly.js';
import React from 'react';
import { LaptopOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Input, Col, Row, Button } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import api from './api';

const Page1 = () => {
  const [x, setX] = React.useState([]);
  const [y, setY] = React.useState([]);
  const [fx, setFx] = React.useState([]);
  const [fy, setFy] = React.useState([]);
  const [px, setPx] = React.useState([]);
  const [py, setPy] = React.useState([]);
  const [sx, setSx] = React.useState([]);
  const [sy, setSy] = React.useState([]);
  const [showFig, setShowFig] = React.useState(false);
  const [f, setF] = React.useState(30);
  const [a, setA] = React.useState(2);
  const [phi, setPhi] = React.useState(0);
  const [t, setT] = React.useState(2);
  const [fs, setFs] = React.useState(1000);
  const fChange = (event: any) => {
    setF(event.target.value);
  };
  const aChange = (event: any) => {
    setA(event.target.value);
  };
  const phiChange = (event: any) => {
    setPhi(event.target.value);
  };
  const tChange = (event: any) => {
    setT(event.target.value);
  };
  const fsChange = (event: any) => {
    setFs(event.target.value);
  };
  const handleGen = () => {
    fetch(`${api}exp3_1?f=${f}&a=${a}&phi=${phi}&l=${t}&fs=${fs}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setX(res.original.x);
          setY(res.original.y);
          setFx(res.frequency.x);
          setFy(res.frequency.y);
          setPx(res.phase.x);
          setPy(res.phase.y);
          setSx(res.periodgram.x);
          setSy(res.periodgram.y);
          setShowFig(true);
        }
      });
  };
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Input
            placeholder="频率"
            addonBefore={
              <>
                频率
                <InlineMath math="f" />
              </>
            }
            onChange={fChange}
            defaultValue={30}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="幅度"
            addonBefore={
              <>
                幅度
                <InlineMath math="A" />
              </>
            }
            onChange={aChange}
            defaultValue={2}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="相位"
            addonBefore={
              <>
                相位
                <InlineMath math="\varphi" />
              </>
            }
            onChange={phiChange}
            defaultValue={0}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="时长"
            addonBefore={
              <>
                时长
                <InlineMath math="L" />
              </>
            }
            onChange={tChange}
            defaultValue={2}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="采样率"
            addonBefore={
              <>
                采样率
                <InlineMath math="f_s" />
              </>
            }
            onChange={fsChange}
            defaultValue={1000}
          />
        </Col>
        <Col span={8}>
          <Button type="primary" onClick={handleGen}>
            Generate
          </Button>
        </Col>
      </Row>
      {showFig && <BlockMath math={`${a}sin(2\\pi*${f}+${phi})`} />}
      {showFig && (
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <Row gutter={[16, 4]} style={{ minHeight: '100%' }}>
            <Col span={12}>
              <Plot
                data={[
                  {
                    x,
                    y,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '正弦信号',
                  xaxis: { title: '时间' },
                  yaxis: { title: '幅度' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
            <Col span={12}>
              <Plot
                data={[
                  {
                    x: fx,
                    y: fy,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '正弦信号幅频响应',
                  xaxis: { title: '频率' },
                  yaxis: { title: '幅度' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
            <Col span={12}>
              <Plot
                data={[
                  {
                    x: px,
                    y: py,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '正弦信号相频响应',
                  xaxis: { title: '频率' },
                  yaxis: { title: '相位' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
            <Col span={12}>
              <Plot
                data={[
                  {
                    x: sx,
                    y: sy,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '正弦信号功率谱密度',
                  xaxis: { title: '频率' },
                  yaxis: { title: '功率谱密度' },
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
  const [x, setX] = React.useState([]);
  const [y, setY] = React.useState([]);
  const [fx, setFx] = React.useState([]);
  const [fy, setFy] = React.useState([]);
  const [px, setPx] = React.useState([]);
  const [py, setPy] = React.useState([]);
  const [sx, setSx] = React.useState([]);
  const [sy, setSy] = React.useState([]);
  const [showFig, setShowFig] = React.useState(false);
  const [duty, setDuty] = React.useState(0.5);
  const [a, setA] = React.useState(2);
  const [t, setT] = React.useState(8);
  const [fs, setFs] = React.useState(1000);
  const dutyChange = (event: any) => {
    setDuty(event.target.value);
  };
  const aChange = (event: any) => {
    setA(event.target.value);
  };
  const tChange = (event: any) => {
    setT(event.target.value);
  };
  const fsChange = (event: any) => {
    setFs(event.target.value);
  };
  const handleGen = () => {
    fetch(`${api}exp3_2?rate=${duty}&a=${a}&l=${t}&fs=${fs}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setX(res.original.x);
          setY(res.original.y);
          setFx(res.frequency.x);
          setFy(res.frequency.y);
          setPx(res.phase.x);
          setPy(res.phase.y);
          setSx(res.periodgram.x);
          setSy(res.periodgram.y);
          setShowFig(true);
        }
      });
  };
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Input
            placeholder="幅度"
            addonBefore={
              <>
                幅度
                <InlineMath math="A" />
              </>
            }
            onChange={aChange}
            defaultValue={2}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="占空比"
            addonBefore={
              <>
                占空比
                <InlineMath math="a" />
              </>
            }
            onChange={dutyChange}
            defaultValue={0.5}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="时长"
            addonBefore={
              <>
                时长
                <InlineMath math="L" />
              </>
            }
            onChange={tChange}
            defaultValue={8}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="采样率"
            addonBefore={
              <>
                采样率
                <InlineMath math="f_s" />
              </>
            }
            onChange={fsChange}
            defaultValue={1000}
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
          <Row gutter={[16, 4]} style={{ minHeight: '100%' }}>
            <Col span={12}>
              <Plot
                data={[
                  {
                    x,
                    y,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '方波信号',
                  xaxis: { title: '时间' },
                  yaxis: { title: '幅度' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
            <Col span={12}>
              <Plot
                data={[
                  {
                    x: fx,
                    y: fy,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '方波信号幅频响应',
                  xaxis: { title: '频率' },
                  yaxis: { title: '幅度' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
            <Col span={12}>
              <Plot
                data={[
                  {
                    x: px,
                    y: py,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '方波信号相频响应',
                  xaxis: { title: '频率' },
                  yaxis: { title: '相位' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
            <Col span={12}>
              <Plot
                data={[
                  {
                    x: sx,
                    y: sy,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '方波信号功率谱密度',
                  xaxis: { title: '频率' },
                  yaxis: { title: '功率谱密度/dB' },
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

const Page3 = () => {
  const [x, setX] = React.useState([]);
  const [y, setY] = React.useState([]);
  const [fx, setFx] = React.useState([]);
  const [fy, setFy] = React.useState([]);
  const [px, setPx] = React.useState([]);
  const [py, setPy] = React.useState([]);
  const [sx, setSx] = React.useState([]);
  const [sy, setSy] = React.useState([]);
  const [showFig, setShowFig] = React.useState(false);
  const [f1, setF1] = React.useState(30);
  const [f2, setF2] = React.useState(300);
  const [phi, setPhi] = React.useState(0);
  const [a, setA] = React.useState(1);
  const [t, setT] = React.useState(1);
  const [fs, setFs] = React.useState(1000);
  const f1Change = (event: any) => {
    setF1(event.target.value);
  };
  const f2Change = (event: any) => {
    setF2(event.target.value);
  };
  const phiChange = (event: any) => {
    setPhi(event.target.value);
  };
  const aChange = (event: any) => {
    setA(event.target.value);
  };
  const tChange = (event: any) => {
    setT(event.target.value);
  };
  const fsChange = (event: any) => {
    setFs(event.target.value);
  };
  const handleGen = () => {
    fetch(`${api}exp3_3?f1=${f1}&f2=${f2}&a=${a}&phi=${phi}&l=${t}&fs=${fs}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setX(res.original.x);
          setY(res.original.y);
          setFx(res.frequency.x);
          setFy(res.frequency.y);
          setPx(res.phase.x);
          setPy(res.phase.y);
          setSx(res.periodgram.x);
          setSy(res.periodgram.y);
          setShowFig(true);
        }
      });
  };
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Input
            placeholder="频率1"
            addonBefore={
              <>
                频率1
                <InlineMath math="f_1" />
              </>
            }
            onChange={f1Change}
            defaultValue={30}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="频率2"
            addonBefore={
              <>
                频率2
                <InlineMath math="f_2" />
              </>
            }
            onChange={f2Change}
            defaultValue={300}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="幅度"
            addonBefore={
              <>
                幅度
                <InlineMath math="A" />
              </>
            }
            onChange={aChange}
            defaultValue={1}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="相位"
            addonBefore={
              <>
                相位
                <InlineMath math="\varphi" />
              </>
            }
            onChange={phiChange}
            defaultValue={0}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="时长"
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
          <Input
            placeholder="采样率"
            addonBefore={
              <>
                采样率
                <InlineMath math="f_s" />
              </>
            }
            onChange={fsChange}
            defaultValue={1000}
          />
        </Col>
        <Col span={8}>
          <Button type="primary" onClick={handleGen}>
            Generate
          </Button>
        </Col>
      </Row>
      {showFig && (
        <BlockMath
          math={`${a}sin(2\\pi*${f1}+${phi}) + ${a}sin(2\\pi*${f2}+${phi})`}
        />
      )}
      {showFig && (
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <Row gutter={[16, 4]} style={{ minHeight: '100%' }}>
            <Col span={12}>
              <Plot
                data={[
                  {
                    x,
                    y,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '混合正弦信号',
                  xaxis: { title: '时间' },
                  yaxis: { title: '幅度' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
            <Col span={12}>
              <Plot
                data={[
                  {
                    x: fx,
                    y: fy,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '混合正弦信号幅频响应',
                  xaxis: { title: '频率' },
                  yaxis: { title: '幅度' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
            <Col span={12}>
              <Plot
                data={[
                  {
                    x: px,
                    y: py,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '混合正弦信号相频响应',
                  xaxis: { title: '频率' },
                  yaxis: { title: '相位' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
            <Col span={12}>
              <Plot
                data={[
                  {
                    x: sx,
                    y: sy,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '混合正弦信号功率谱密度',
                  xaxis: { title: '频率' },
                  yaxis: { title: '功率谱密度' },
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

const Page4 = () => {
  const [x, setX] = React.useState([]);
  const [y, setY] = React.useState([]);
  const [fx, setFx] = React.useState([]);
  const [fy, setFy] = React.useState([]);
  const [px, setPx] = React.useState([]);
  const [py, setPy] = React.useState([]);
  const [sx, setSx] = React.useState([]);
  const [sy, setSy] = React.useState([]);
  const [showFig, setShowFig] = React.useState(false);
  const [mu, setMu] = React.useState(2);
  const [sigma, setSigma] = React.useState(1);
  const [t, setT] = React.useState(1);
  const [fs, setFs] = React.useState(1000);
  const muChange = (event: any) => {
    setMu(event.target.value);
  };
  const sigmaChange = (event: any) => {
    setSigma(event.target.value);
  };
  const tChange = (event: any) => {
    setT(event.target.value);
  };
  const fsChange = (event: any) => {
    setFs(event.target.value);
  };
  const handleGen = () => {
    fetch(`${api}exp3_4?mu=${mu}&sigma=${sigma}&l=${t}&fs=${fs}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setX(res.original.x);
          setY(res.original.y);
          setFx(res.frequency.x);
          setFy(res.frequency.y);
          setPx(res.phase.x);
          setPy(res.phase.y);
          setSx(res.periodgram.x);
          setSy(res.periodgram.y);
          setShowFig(true);
        }
      });
  };
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Input
            placeholder="均值"
            addonBefore={
              <>
                均值
                <InlineMath math="\mu" />
              </>
            }
            onChange={muChange}
            defaultValue={2}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="方差"
            addonBefore={
              <>
                方差
                <InlineMath math="\sigma^2" />
              </>
            }
            onChange={sigmaChange}
            defaultValue={1}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="时长"
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
          <Input
            placeholder="采样率"
            addonBefore={
              <>
                采样率
                <InlineMath math="f_s" />
              </>
            }
            onChange={fsChange}
            defaultValue={1000}
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
          <Row gutter={[16, 4]} style={{ minHeight: '100%' }}>
            <Col span={12}>
              <Plot
                data={[
                  {
                    x,
                    y,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '高斯白噪声',
                  xaxis: { title: '时间' },
                  yaxis: { title: '幅度' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
            <Col span={12}>
              <Plot
                data={[
                  {
                    x: fx,
                    y: fy,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '高斯白噪声幅频响应',
                  xaxis: { title: '频率' },
                  yaxis: { title: '幅度' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
            <Col span={12}>
              <Plot
                data={[
                  {
                    x: px,
                    y: py,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '高斯白噪声相频响应',
                  xaxis: { title: '频率' },
                  yaxis: { title: '相位' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
            <Col span={12}>
              <Plot
                data={[
                  {
                    x: sx,
                    y: sy,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '高斯白噪声功率谱密度',
                  xaxis: { title: '频率' },
                  yaxis: { title: '功率谱密度' },
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

const Page5 = () => {
  const [x, setX] = React.useState([]);
  const [y, setY] = React.useState([]);
  const [fx, setFx] = React.useState([]);
  const [fy, setFy] = React.useState([]);
  const [px, setPx] = React.useState([]);
  const [py, setPy] = React.useState([]);
  const [sx, setSx] = React.useState([]);
  const [sy, setSy] = React.useState([]);
  const [showFig, setShowFig] = React.useState(false);
  const [mu, setMu] = React.useState(2);
  const [sigma, setSigma] = React.useState(1);
  const [t, setT] = React.useState(1);
  const [fs, setFs] = React.useState(1000);
  const muChange = (event: any) => {
    setMu(event.target.value);
  };
  const sigmaChange = (event: any) => {
    setSigma(event.target.value);
  };
  const tChange = (event: any) => {
    setT(event.target.value);
  };
  const fsChange = (event: any) => {
    setFs(event.target.value);
  };
  const handleGen = () => {
    fetch(`${api}exp3_5?mu=${mu}&sigma=${sigma}&l=${t}&fs=${fs}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setX(res.original.x);
          setY(res.original.y);
          setFx(res.frequency.x);
          setFy(res.frequency.y);
          setPx(res.phase.x);
          setPy(res.phase.y);
          setSx(res.periodgram.x);
          setSy(res.periodgram.y);
          setShowFig(true);
        }
      });
  };
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Input
            placeholder="均值"
            addonBefore={
              <>
                均值
                <InlineMath math="\mu" />
              </>
            }
            onChange={muChange}
            defaultValue={2}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="方差"
            addonBefore={
              <>
                方差
                <InlineMath math="\sigma^2" />
              </>
            }
            onChange={sigmaChange}
            defaultValue={1}
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="时长"
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
          <Input
            placeholder="采样率"
            addonBefore={
              <>
                采样率
                <InlineMath math="f_s" />
              </>
            }
            onChange={fsChange}
            defaultValue={1000}
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
          <Row gutter={[16, 4]} style={{ minHeight: '100%' }}>
            <Col span={12}>
              <Plot
                data={[
                  {
                    x,
                    y,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '均匀白噪声信号',
                  xaxis: { title: '时间' },
                  yaxis: { title: '幅度' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
            <Col span={12}>
              <Plot
                data={[
                  {
                    x: fx,
                    y: fy,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '均匀白噪声幅频响应',
                  xaxis: { title: '频率' },
                  yaxis: { title: '幅度' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
            <Col span={12}>
              <Plot
                data={[
                  {
                    x: px,
                    y: py,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '均匀白噪声相频响应',
                  xaxis: { title: '频率' },
                  yaxis: { title: '相位' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
            <Col span={12}>
              <Plot
                data={[
                  {
                    x: sx,
                    y: sy,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '均匀白噪声功率谱密度',
                  xaxis: { title: '频率' },
                  yaxis: { title: '功率谱密度' },
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

const Page6 = () => {
  const [x, setX] = React.useState([]);
  const [y, setY] = React.useState([]);
  const [fx, setFx] = React.useState([]);
  const [fy, setFy] = React.useState([]);
  const [px, setPx] = React.useState([]);
  const [py, setPy] = React.useState([]);
  const [sx, setSx] = React.useState([]);
  const [sy, setSy] = React.useState([]);
  const [showFig, setShowFig] = React.useState(false);
  const [fs, setFs] = React.useState(1000);
  const fsChange = (event: any) => {
    setFs(event.target.value);
  };
  const handleGen = () => {
    fetch(`${api}exp3_6?fs=${fs}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setX(res.original.x);
          setY(res.original.y);
          setFx(res.frequency.x);
          setFy(res.frequency.y);
          setPx(res.phase.x);
          setPy(res.phase.y);
          setSx(res.periodgram.x);
          setSy(res.periodgram.y);
          setShowFig(true);
        }
      });
  };
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Input
            placeholder="采样率"
            addonBefore={<InlineMath math="f_s" />}
            onChange={fsChange}
            defaultValue={1000}
          />
        </Col>
        <Col span={8}>
          <Button type="primary" onClick={handleGen}>
            Load
          </Button>
        </Col>
      </Row>
      {showFig && (
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <Row gutter={[16, 4]} style={{ minHeight: '100%' }}>
            <Col span={12}>
              <Plot
                data={[
                  {
                    x,
                    y,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '已知信号',
                  xaxis: { title: '时间' },
                  yaxis: { title: '幅度' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
            <Col span={12}>
              <Plot
                data={[
                  {
                    x: fx,
                    y: fy,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '幅频响应',
                  xaxis: { title: '频率' },
                  yaxis: { title: '幅度（dB）' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
            <Col span={12}>
              <Plot
                data={[
                  {
                    x: px,
                    y: py,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '相频响应',
                  xaxis: { title: '频率' },
                  yaxis: { title: '相位' },
                }}
                config={{ responsive: true }}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                useResizeHandler
              />
            </Col>
            <Col span={12}>
              <Plot
                data={[
                  {
                    x: sx,
                    y: sy,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'orange' },
                  },
                ]}
                layout={{
                  autosize: true,
                  title: '功率谱密度',
                  xaxis: { title: '频率' },
                  yaxis: { title: '功率谱密度' },
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
  const pages = [
    '正弦波信号',
    '方波信号',
    '混合正弦信号',
    '高斯分布白噪声',
    '均匀分布白噪声',
    '加载已有信号',
  ];
  const [nowPage, setNowPage] = React.useState(1);
  const items: MenuProps['items'] = [LaptopOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `实验三 信号频谱分析`,
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
          {nowPage === 3 && <Page3 />}
          {nowPage === 4 && <Page4 />}
          {nowPage === 5 && <Page5 />}
          {nowPage === 6 && <Page6 />}
        </Content>
      </Layout>
    </Layout>
  );
}
