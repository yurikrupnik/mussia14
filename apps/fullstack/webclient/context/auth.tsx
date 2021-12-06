import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react';
import {
  register,
  logout,
  login,
  onAuthStateChanged,
  sihInWithGithub,
} from '../firebase';
import { UserCredential, User } from 'firebase/auth';

interface Context {
  user: null | undefined | UserCredential;
  register: any;
  logout: any;
  login: any;
  sihInWithGithub: any;
  // data: IUser[] | undefined;
  // error: Error | null;
  // remove: (id: string) => Promise<string>;
  // post: ({}: Partial<IUser>) => Promise<IUser>;
  // put: ({}: Partial<IUser>) => Promise<IUser>;
  // customQuery: Partial<IUser>;
  // setCustomQuery: (params: Partial<IUser>) => void;
  // ad: string;
  // setQuery: (query: Partial<IUser>) => Promise<any>;
}

const AuthContext = createContext<Context>({
  user: null,
  register: () => null,
  logout: () => null,
  login: () => null,
  sihInWithGithub: () => null,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
  user: UserCredential;
  setUser: Dispatch<SetStateAction<UserCredential>>;
}

export const AuthProvider = (props: AuthProviderProps) => {
  const { children, user, setUser } = props;
  // const reg = useCallback(register, []);
  // const [currentUser, setCurrentUser] = useState(null);

  // console.log('user', user);
  useEffect(() => onAuthStateChanged(setUser), []);

  const value = {
    user,
    register,
    logout,
    login,
    sihInWithGithub,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Auth.propTypes = {
//
// };

export default AuthProvider;
