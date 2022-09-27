import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import useFetch from 'use-http';
import { $active, setUserProfile } from '../../models/user';
import { useStore } from 'effector-react';
import { useEffect } from 'react';

const injected = new InjectedConnector({
  supportedChainIds: [1],
});

function AuthWeb3() {
  const activeUser = useStore($active);
  const { active, activate, deactivate, account } = useWeb3React();
  const { post } = useFetch();

  useEffect(() => {
    (async function () {
      if (active && !activeUser) {
        const result = await post('/api/connect', { account });
        setUserProfile(result.data);
      }
    })();
  }, [active]);

  async function connect() {
    try {
      await activate(injected);
    } catch (error) {
      console.log(error);
    }
  }

  async function disconnect() {
    try {
      deactivate();
      setUserProfile(null);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="is-center">
      <div className="card page">
        <header>
          <h1>Connect with wallet</h1>
        </header>

        <button
          className="button primary outline is-full-width"
          disabled={activeUser}
          onClick={activeUser ? disconnect : connect}
        >
          Metamask
        </button>
        <br />
        <br />
        <button
          className="button primary outline is-full-width"
          disabled={true}
        >
          Trust wallet
        </button>
        <br />
        <br />
        <button
          className="button primary outline is-full-width"
          disabled={true}
        >
          Coinbase wallet
        </button>
        <br />
        <br />
        {activeUser && (
          <div>
            <button
              className="button primary outline is-full-width"
              onClick={disconnect}
            >
              Disconnect
            </button>
            <br />
            <br />
          </div>
        )}
      </div>
    </main>
  );
}

export default AuthWeb3;
