import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import Web3 from 'web3';
import useFetch from 'use-http';
import { $active, setUserProfile } from '../../models/user';
import { useStore } from 'effector-react';
import { useEffect } from 'react';

const injected = new InjectedConnector({
  supportedChainIds: [1],
});
const web3 = new Web3(Web3.givenProvider);

function AuthWeb3() {
  const activeUser = useStore($active);
  const { active, activate, deactivate, account } = useWeb3React();
  const { get } = useFetch();

  useEffect(() => {
    (async function () {
      if (active && !activeUser) {
        const challenge = await get(`/api/auth/${account}`);
        const signedChallenge = await web3.eth.personal.sign(
          challenge[1].value,
          account as string,
          ''
        );

        const user = await get(
          `/api/auth/${challenge[1].value}/${signedChallenge}`
        );
        setUserProfile(user);
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
