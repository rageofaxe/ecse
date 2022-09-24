import React from 'react';
import { createPortal } from 'react-dom';

function Portal(): JSX.Element {
  const [container] = React.useState(document.createElement('div'));

  container.classList.add('popup');

  React.useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return createPortal(
    <img src="https://icongr.am/entypo/500px.svg?size=64&color=00b85f" />,
    container
  );
}

export default Portal;
