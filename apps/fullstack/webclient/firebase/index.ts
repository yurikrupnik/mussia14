// import firebase from 'firebase/compat/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  EmailAuthProvider,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// import 'firebase/compat/auth';
// import { UserCredential } from 'firebase/auth';
// import 'firebase/compat/firestore';
import config from './config';

const firebaseApp = initializeApp(config);

// const analytics = getAnalytics(firebaseApp);

const auth = getAuth(firebaseApp);

export function logout() {
  return auth.signOut();
}

export function register(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function onAuthStateChanged(cb) {
  return auth.onAuthStateChanged(cb);
}

export function sihInWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export function sihInWithGithub() {
  const provider = new GithubAuthProvider();
  return signInWithPopup(auth, provider);
}

export async function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    GithubAuthProvider.PROVIDER_ID,
    EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: (a: any) => {
      console.log('-------------aAA', a); // eslint-disable-line
      return false;
    },
  },
};

export { uiConfig, firebaseApp, auth };
