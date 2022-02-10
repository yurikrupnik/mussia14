import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';

declare global {
  interface Window {
    renderUsers: (containerId: string) => void;
    unmountUsers: (containerId: string) => void;
  }
}

window.renderUsers = (containerId) => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById(containerId)
  );
};

window.unmountUsers = (containerId) => {
  const el = document.getElementById(containerId);
  if (!el) {
    return;
  }

  ReactDOM.unmountComponentAtNode(el);
};
