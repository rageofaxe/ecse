import React, { useCallback, useState } from 'react';

function Try(): JSX.Element {
  const [name, setName] = useState('');
  const create = useCallback(() => {
    fetch('/api/create', {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(({ message }) => {
        alert(message);
      });
  }, [name]);
  return (
    <div className="card ">
      <h3>Enter the name and create your shop</h3>
      <div>
        <input
          className=""
          width={4}
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <code>ecse.io/{name}</code>
        <br />
        <br />
        <div>
          <button
            className="button primary outline"
            onClick={() => alert('yep')}
          >
            Check
          </button>
          <button className="button primary" onClick={create}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default Try;
