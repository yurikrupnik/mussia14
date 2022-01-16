import styles from './app.module.css';

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';

import { Route, Link } from 'react-router-dom';

import FrontendLogin from '@mussia14/frontend/login';

export function App() {
  return (
    <div className={styles.app}>
      <header className="flex">
        <Logo width="75" height="75" />
        <h1>Welcome to clients-react-app!</h1>
      </header>

      <Route
        path="/"
        exact
        render={() => (
          <div>
            This is the generated root route.{' '}
            <Link to="/page-2">Click here for page 2.</Link>
            <Link to="/login">Login</Link>
          </div>
        )}
      />
      <Route path="/login" component={FrontendLogin} />
      {/* END: routes */}
    </div>
  );
}

export default App;
