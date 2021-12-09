// import withSession from '../lib/session';
// import Layout from '../components/Layout';
import React from 'react';
// import ReactJson from 'react-json-view';
import { useAuth } from '../context/auth';

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      userTypes: ['admin'],
    },
  };
}

const Profile = (props, a) => {
  console.log(props, a);
  const { user } = useAuth();

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      {/*<ReactJson src={currentUser} />*/}
      <p>Welcome to admin dashboard</p>
    </div>
  );
};

export default Profile;
