import React from 'react';
import { useHistory } from 'react-router-dom';
import { routes } from '../../consts';
import classes from './CheckName.module.css';
import image from '../../image.svg';

function CheckName(): JSX.Element {
  const history = useHistory();
  return (
    <main className="is-center">
      <div className="row">
        <div className="col is-left">
          <div>
            <h1 className={`${classes.title} text-dark`}>
              Build <span className={classes.selected}>your own shop</span>
            </h1>
            <p className={classes.message}>
              We propose for you the best and safest solutions for free. You can
              just click the button.
            </p>
            <div>
              <button
                onClick={() => history.push(routes.getStarted)}
                className="button primary"
              >
                Try
              </button>
              <button
                onClick={() => history.push(routes.about)}
                className="button outline primary"
              >
                Learn more
              </button>
            </div>
          </div>
        </div>
        <div className="col is-right">
          <img src={image} alt="Illustration" className={classes.image} />
        </div>
      </div>
    </main>
  );
}

export default CheckName;
