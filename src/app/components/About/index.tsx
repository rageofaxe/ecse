import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../consts';

function About(): JSX.Element {
  return (
    <main>
      <div className="card is-transparent">
        <header>
          <h1>What is going on?</h1>
        </header>

        <h3>First of all</h3>
        <p>Bla bla bla</p>
        <h3>The second reason</h3>
        <p>Bla bla bla</p>
        <h3>and last one</h3>
        <p>Bla bla bla</p>

        <h3>First of all</h3>
        <p>Bla bla bla</p>
        <h3>The second reason</h3>
        <p>Bla bla bla</p>
        <h3>and last one</h3>
        <p>Bla bla bla</p>

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
