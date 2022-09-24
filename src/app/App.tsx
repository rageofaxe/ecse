import React from 'react';
import styles from './App.module.css';
import { routes } from './consts';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';

import CheckName from './pages/CheckName';
import Try from './pages/Try';
import Contacts from './pages/Contacts';
import AuthWeb3 from './pages/AuthWeb3';
import About from './pages/About';
import Header from './components/Header/Header';

// eslint-disable-next-line
function getLibrary(provider: any) {
  return new Web3(provider);
}

function App(): JSX.Element {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Router>
        <div className={styles.App}>
          <Header />
          <Switch>
            <Route path={routes.getStarted}>
              <main className="is-center">
                <Try />
              </main>
            </Route>
            <Route path={routes.about} component={About} />
            <Route path={routes.contacts} component={Contacts} />
            <Route path={routes.sigin} component={AuthWeb3} />
            <Route path="/" component={CheckName} />
          </Switch>
        </div>
      </Router>
    </Web3ReactProvider>
  );
}

export default App;
