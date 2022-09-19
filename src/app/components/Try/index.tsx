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
    <>
      <h3>Enter the name and create your shop</h3>
      <div className="row">
        <div className="col">
          <input
            className=""
            width={4}
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col">
          <button className="button primary" onClick={create}>
            Create
          </button>
        </div>
      </div>
      <code>ecse.io/{name}</code>
    </>
  );
}

export default Try;
