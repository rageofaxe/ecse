import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from 'effector-react';
import { routes } from '../../consts';
import styles from './Header.module.css';
import { $active, $userProfile } from '../../models/user';

function Header() {
  const active = useStore($active);
  const user = useStore($userProfile);

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
          {user?.subdomain ? (
            <Link to={routes.getStarted}>Manage</Link>
          ) : (
            <Link to={routes.getStarted}>Create</Link>
          )}

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
