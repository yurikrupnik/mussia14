import styles from './app.module.css';
import React from 'react';
import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';

import { Route, Link } from 'react-router-dom';
import Header from './header';

export function App() {
  return (
    <div>
      <h2>Nav sssss</h2>
      <Header />
    </div>
  );
}

export default App;
