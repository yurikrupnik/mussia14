import { Switch, Match } from 'solid-js';
import { Router, Link, Route, Routes } from 'solid-app-router';
import MicroFrontend from './MicroFrontend';

// todo check if needed
const process = {
  env: {
    DASHBOARD_HOST: undefined,
    SETTINGS_HOST: undefined,
    USERS_HOST: undefined,
  },
};

// process.env
const dashboardHost = process.env.DASHBOARD_HOST || 'http://localhost:3000';
const settingsHost = process.env.SETTINGS_HOST || 'http://localhost:3001';
const usersHost = process.env.USERS_HOST || 'http://localhost:3002';

const Nav = () => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <p className="navbar-item">Micronx</p>

      <a
        role="button"
        className="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-start">
        <Link className="navbar-item" href="/">
          Dashboard
        </Link>

        <Link className="navbar-item" href="/settings">
          Settings
        </Link>
        <Link className="navbar-item" href="/users">
          Users
        </Link>
      </div>
    </div>
  </nav>
);

const Dashboard = () => <MicroFrontend name="Dashboard" host={dashboardHost} />;
const Settings = () => <MicroFrontend name="Settings" host={settingsHost} />;
const Users = () => <MicroFrontend name="Users" host={usersHost} />;

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/users" element={<Users />} />
        {/*<Route path="/*all" element={<NotFound />} />*/}
      </Routes>
    </Router>
  );
}

export default App;
