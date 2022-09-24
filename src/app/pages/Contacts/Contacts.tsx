import React from 'react';

function Contacts(): JSX.Element {
  return (
    <main className="is-center">
      <div className="card page">
        <header>
          <h1>Support</h1>
        </header>
        <label>
          <span>Fullname</span>
          <input />
        </label>
        <label>
          <span>Email</span>
          <input />
        </label>
        <label>
          <span>Message</span>
          <textarea />
        </label>
        <footer className="is-right">
          <button className="button primary" disabled>
            Send
          </button>
        </footer>
      </div>
    </main>
  );
}

export default Contacts;
