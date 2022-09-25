import { useWeb3React } from '@web3-react/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../consts';
import styles from './Header.module.css';

function Header() {
  const { active } = useWeb3React();
  return (
    <>
      <div className={`${styles.header} row is-full-width is-fixed`}>
        <div className={`col is-left ${styles.logo}`}>
          <Link to="/">
            <img src="https://icongr.am/entypo/500px.svg?size=32&color=00b85f" />
            <span>ecse</span>
          </Link>
        </div>
        <div className={`col is-right ${styles.menu}`}>
          <Link to={routes.getStarted}>Create</Link>
          <Link to={routes.about}>About</Link>
          <Link to={routes.contacts}>Contacts</Link>
          <Link to={routes.sigin}>
            {active ? 'Disconnect' : 'Connect wallet'}
          </Link>
        </div>
      </div>
      <div className={styles['header-place']} />
    </>
  );
}

export default Header;
