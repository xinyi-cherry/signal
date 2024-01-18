import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React from 'react';

import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import Exp1 from './Exp1';
import './App.css';
import Exp2 from './Exp2';
import Exp3 from './Exp3';
import Exp4 from './Exp4';
import Exp5 from './Exp5';
import Exp6 from './Exp6';
import Exp7 from './Exp7';
import Exp8 from './Exp8';
import Exp9 from './Exp9';
import Exp10 from './Exp10';

const { Header } = Layout;

const items1: MenuProps['items'] = [
  '一',
  '二',
  '三',
  '四',
  '五',
  '六',
  '七',
  '八',
  '九',
  '十',
].map((item, key) => ({
  key: key + 1,
  label: <Link to={`/ex${key + 1}`}>实验{item}</Link>,
}));

export default function App() {
  return (
    <Router>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 1,
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Routes>
        <Route path="/ex1" element={<Exp1 />} />
        <Route path="/ex2" element={<Exp2 />} />
        <Route path="/ex3" element={<Exp3 />} />
        <Route path="/ex4" element={<Exp4 />} />
        <Route path="/ex5" element={<Exp5 />} />
        <Route path="/ex6" element={<Exp6 />} />
        <Route path="/ex7" element={<Exp7 />} />
        <Route path="/ex8" element={<Exp8 />} />
        <Route path="/ex9" element={<Exp9 />} />
        <Route path="/ex10" element={<Exp10 />} />
      </Routes>
    </Router>
  );
}
