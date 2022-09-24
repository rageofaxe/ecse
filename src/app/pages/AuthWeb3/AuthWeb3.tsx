import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';

const injected = new InjectedConnector({
  supportedChainIds: [1],
});

function AuthWeb3() {
  const { active, activate, deactivate } = useWeb3React();

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
          disabled={active}
          onClick={active ? disconnect : connect}
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
        {active && (
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
