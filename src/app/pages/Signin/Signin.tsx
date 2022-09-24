import React from 'react';
import { Link } from 'react-router-dom';

function Signin(): JSX.Element {
  return (
    <main className="is-center">
      <div className="card page">
        <header>
          <h1>Sign in</h1>
        </header>

        <input placeholder="Email" type="email" />
        <br />
        <input placeholder="Password" type="password" />
        <footer>
          <Link to="/forgot">Remember password</Link>
          <button className="button primary outline">Sign up</button>
          <button className="button primary">Sign in</button>
        </footer>
      </div>
    </main>
  );
}

export default Signin;
