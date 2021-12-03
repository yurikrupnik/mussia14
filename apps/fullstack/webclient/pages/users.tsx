import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import styles from './index.module.css';
import axios, { AxiosPromise } from 'axios';
import { User } from '@mussia14/backend/users-api'; // todo return!!
import { useQuery } from 'react-query';

const getUsers = () => {
  return axios
    .get<User[]>('/api/users', {
      params: {
        // limit: 1,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      // adding return type of void
      console.log(err);
    });
};

const getProjects = () => {
  return axios
    .get('/api/projects')
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      // adding return type of void
      console.log(err);
    });
};

export function Users() {
  const query = useQuery('users', getUsers);
  const projectsQuery = useQuery('projects', getProjects, { enabled: false });
  // console.log('query', query);
  // console.log('projectsQuery', projectsQuery);

  // const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    // getUsers().then((res) => {
    //   if (Array.isArray(res)) {
    //     setUsers(res);
    //   }
    // });
    // getProjects().then((projects) => {
    //   console.log('projects', projects);
    // });
  }, []);
  return (
    <div className={styles.page}>
      <h2>Users</h2>
      <Button
        onClick={() => {
          query.refetch();
        }}
      >
        Refetch
      </Button>
      {Array.isArray(query.data) &&
        query.data.map((user) => {
          return (
            <div key={user._id}>
              <div>role: {user.role}</div>
              <div>name: {user.name}</div>
              <div>email: {user.email}</div>
            </div>
          );
        })}
      <p>Thank you for using and showing some ♥ for Nx.</p>
    </div>
  );
}

export default Users;
