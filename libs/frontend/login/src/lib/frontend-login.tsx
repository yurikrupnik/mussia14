import React, { useCallback, useMemo, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
// import { useAuth } from '../contexts/AuthContext';
import {
  FacebookLoginButton,
  GithubLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';
import { useForm } from 'react-hook-form';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import { useSnackbar } from 'material-ui-snackbar-provider';
import {
  auth,
  sihInWithGithub,
  uiConfig,
  useAuth,
} from '@mussia14/client/firebase';
// import { useAuth } from '../context/auth';

const Login = () => {
  // const snackbar = useSnackbar();
  console.log('Log component');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  console.log('errors', errors);
  function handleSomething() {
    // snackbar.showMessage('Something happened!', 'Undo', () =>
    //   this.handleUndo()
    // );
  }
  // console.log('authss', authss);
  // const a = useAuthState(auth);
  // console.log(a);
  // console.log("d", d?.getIdToken()); // eslint-disable-line
  // const [session] = [{}];
  // const [session] = useSession();
  // console.log("session", session); // eslint-disable-line
  // console.log("loading", loading);
  // const [u, loading, error] = useAuthUser(firebase.auth());

  const { user, register: authRegister, sihInWithGithub } = useAuth();
  // console.log('user', user);
  // const [user, setUser] = useState({}); // Local signed-in state.
  // const [localToken, setToken] = useState(""); // Local signed-in state.
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  const getToken = useCallback(() => {
    // if (user) {
    return auth.currentUser?.getIdToken().then((res: any) => {
      console.log('res', res);
      // snackbar.showMessage('Something happened!', 'Undo', () => handleUndo());
    });
    // }
    // return '';
  }, []);

  // console.log('token', token);

  const router = useRouter();

  // const handleSignOut = useCallback(logout, []);

  function handleUndo() {
    console.log('undo happened');
  }

  const handleReister = useCallback(() => {
    // snackbar.showMessage('Something happened!', 'Undo', () => handleUndo());
    // return authRegister('test@test.com', '123456');
  }, []);
  // console.log('errors.email', errors.email);
  return (
    <Grid
      container
      item
      xs={12}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      {/*<Grid xs={12} item>*/}
      {/*  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />*/}
      {/*</Grid>*/}

      <Button onClick={handleReister}>Stam</Button>
      <Grid
        container
        item
        sm={10}
        xs={12}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <Grid item>
            <TextField
              label={'Email'}
              // required
              error={!!errors.email}
              // required={true}
              // required={}
              // defaultValue="test"
              {...register('email', {
                required: true,
              })}
            />
          </Grid>
          {/* include validation with required or other standard HTML validation rules */}
          <TextField
            label={'Password'}
            error={!!errors.password}
            {...register('password', { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.email && <span>This field is required</span>}
          {errors.password && <span>This field is required</span>}

          <input type="submit" />
          <br />
          <GithubLoginButton onClick={sihInWithGithub} />
        </form>
      </Grid>
    </Grid>
  );
};

// const Login = () => {
//   return <div>heelo from login</div>
// }
// todo does not work with next export
// export async function getServerSideProps() {
//     console.log("process.env.VERCEL_URL", process.env.VERCEL_URL); // eslint-disable-line
//
//     return {
//         props: {}
//     };
// }

export default Login;
