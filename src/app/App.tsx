import React from 'react';
import styles from './App.module.css';
import { routes } from './consts';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CheckName from './components/CheckName';
import Try from './components/Try';
import Contacts from './components/Contacts';
import Signin from './components/Signin';
import About from './components/About';

function App(): JSX.Element {
  return (
    <Router>
      <div className={styles.App}>
        <div className={`${styles.header} row is-full-width is-fixed`}>
          <div className={`col is-left ${styles.logo}`}>
            <Link to="/">
              <img src="https://icongr.am/entypo/500px.svg?size=32&color=00b85f" />
              <span>ecse</span>
            </Link>
          </div>
          <div className={`col is-right ${styles.menu}`}>
            <Link to={routes.getStarted}>Get started</Link>
            <Link to={routes.about}>About</Link>
            <Link to={routes.contacts}>Contacts</Link>
            <Link to={routes.sigin}>Sign in</Link>
          </div>
        </div>
        <div className={styles['header-place']} />
        <Switch>
          <Route path={routes.getStarted}>
            <main className="is-center">
              <Try />
            </main>
          </Route>
          <Route path={routes.about} component={About} />
          <Route path={routes.contacts} component={Contacts} />
          <Route path={routes.sigin} component={Signin} />
          <Route path="/" component={CheckName} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
