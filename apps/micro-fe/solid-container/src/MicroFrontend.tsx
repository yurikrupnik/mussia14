import { createEffect } from 'solid-js';

interface MicroFrontendProps {
  name: string;
  host: string;
}

const MicroFrontend = ({ name, host }: MicroFrontendProps) => {
  createEffect(() => {
    const scriptId = `micro-frontend-script-${name}`;

    const renderMicroFrontend = () => {
      // history?
      (window as any)[`render${name}`](`${name}-container`);
    };

    if (document.getElementById(scriptId)) {
      renderMicroFrontend();
      return;
    }

    const renderRemoteJS = async () => {
      const manifest = await fetch(`${host}/manifest.json`).then((res) =>
        res.json()
      );

      const script = document.createElement('script');
      script.id = scriptId;
      script.crossOrigin = '';
      script.src = `${host}${manifest.files['main.js']}`;
      script.onload = () => {
        renderMicroFrontend();
      };
      document.head.appendChild(script);
    };

    renderRemoteJS();

    return () => {
      (window as any)[`unmount${name}`] &&
        (window as any)[`unmount${name}`](`${name}-container`);
    };
  }, [name, host]);

  return <main id={`${name}-container`} />;
};

export default MicroFrontend;
