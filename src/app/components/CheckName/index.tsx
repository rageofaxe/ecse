import React from 'react';
import { useHistory } from 'react-router-dom';
import classes from './CheckName.module.css';

function CheckName(): JSX.Element {
  const history = useHistory();
  return (
    <div>
      <h1 className={classes.message}>Build your own shop</h1>
      <p>
        We propose for you the best and safest solutions for free.
        <br /> You can just click the button.
      </p>
      <div>
        <button
          onClick={() => history.push('/create')}
          className="button primary"
        >
          Try
        </button>
        <button onClick={() => history.push('/about')} className="button">
          Learn more
        </button>
      </div>
    </div>
  );
}

export default CheckName;
