import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import useFetch from 'use-http';
import { useHistory } from 'react-router-dom';
import { routes } from '../../consts';
import Popup from '../../components/Popup/Popup';

function Try(): JSX.Element {
  const { active, account } = useWeb3React();
  const history = useHistory();
  const [name, setName] = useState('');
  const { post, loading } = useFetch();
  const [message, setMessage] = useState(null);

  // eslint-disable-next-line
  const typeName = (e: any) => {
    setName(e.target.value);
    if (message) {
      setMessage(null);
    }
  };

  async function create() {
    if (!active) {
      history.push(routes.sigin);
      return;
    }
    const answer = await post('/api/create', { name, account });
    setMessage(answer.message);
  }

  async function checkName() {
    const answer = await post('/api/check-name', { name });
    setMessage(answer.message);
  }

  return (
    <div className="card page">
      {loading && <Popup />}
      <h1>Create shop</h1>
      <h4>1. Title</h4>

      <input
        className=""
        width={4}
        defaultValue={name}
        onChange={typeName}
        placeholder={'Enter the name and create your shop'}
      />

      <br />

      <h4>2. Choose theme</h4>

      <select>
        <option>Default theme</option>
      </select>
      <br />
      <h4>3. NFT.storage</h4>

      <input placeholder={'Enter your NFT.storage api key'} disabled />
      <br />
      <code>
        ecse.io/{name}
        {message && ` - ${message}`}
      </code>
      <div className="is-left">
        <button className="button primary outline" onClick={checkName}>
          Check
        </button>
        <button className="button primary" onClick={create}>
          {active ? 'Create' : 'Connect wallet and create'}
        </button>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default Try;
