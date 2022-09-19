import React from 'react';
import styles from './App.module.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <Router>
      <div className={styles.App}>
        <div className={`${styles.header} row`}>
          <div className="col is-left">Logo</div>
          <div className="col is-right">Menu</div>
        </div>
        <Switch>
          <main>body</main>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
