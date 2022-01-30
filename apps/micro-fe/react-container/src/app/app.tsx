import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MicroFrontend from './MicroFrontend';

// process.env
const dashboardHost = process.env.DASHBOARD_HOST || 'http://localhost:3000';
const settingsHost = process.env.SETTINGS_HOST || 'http://localhost:3001';
const profileHost = process.env.PROFILE_HOST || 'http://localhost:3002';

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
        <Link className="navbar-item" to="/">
          Dashboard
        </Link>

        <Link className="navbar-item" to="/settings">
          Settings
        </Link>
        <Link className="navbar-item" to="/profile">
          Profile
        </Link>
      </div>
    </div>
  </nav>
);

const Dashboard = () => <MicroFrontend name="Dashboard" host={dashboardHost} />;
const Settings = () => <MicroFrontend name="Settings" host={settingsHost} />;
const Profile = () => <MicroFrontend name="Profile" host={profileHost} />;

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>

        <Route exact path="/settings">
          <Settings />
        </Route>

        <Route exact path="/profile">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
