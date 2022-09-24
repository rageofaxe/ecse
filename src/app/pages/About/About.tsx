import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../consts';

function About(): JSX.Element {
  return (
    <main>
      <div className="card is-transparent">
        <header>
          <h1>About</h1>
        </header>

        <div className="row">
          <div className="col-6">
            <p>Coming soon</p>
          </div>
          <div className="col-6"></div>
        </div>

        <div className="is-right">
          <Link to={routes.getStarted} className="button primary">
            You can try it
          </Link>
        </div>
      </div>
    </main>
  );
}

export default About;
